import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  // serverExternalPackages prevents pg from appearing in the browser bundle,
  // but webpack still bundles pg for server lambdas as an async ESM module
  // (module 64939: `a.exports=import("pg")`). That async chain causes a
  // TypeError on cold starts when the admin page RSC tries to access the
  // Payload config before the async module resolves.
  //
  // The webpack externals function below is the real fix: it intercepts ANY
  // require/import of 'pg' (or subpaths like 'pg/lib/...') during the server
  // bundle compilation and emits a synchronous `require('pg')` call instead,
  // breaking the async module chain entirely.
  serverExternalPackages: [
    'pg',
    'drizzle-orm',
    '@payloadcms/db-postgres',
    '@payloadcms/drizzle',
    'nodemailer',
    '@payloadcms/email-nodemailer',
    '@payloadcms/storage-vercel-blob',
  ],
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Force db/email/storage packages (and pg) to be synchronous CJS externals
      // instead of async ESM dynamic imports. Even though these are in
      // serverExternalPackages, Next.js can still emit them as async ESM modules
      // when they are transitively imported by a bundled module (payload.config.ts).
      // That async module wrapping (c.a / __webpack_require__.a) creates a
      // $() accessor race in the admin RSC, causing:
      //
      //   TypeError: Cannot destructure property 'config' of '$(...)'
      //   as it is undefined.
      //
      // The webpack externals function below intercepts at bundle time and emits
      // synchronous require() calls, breaking the entire async module chain.
      const CJS_EXTERNALS = [
        'pg',
        '@payloadcms/db-postgres',
        'drizzle-orm',
        '@payloadcms/drizzle',
        'nodemailer',
        '@payloadcms/email-nodemailer',
        '@payloadcms/storage-vercel-blob',
      ]
      const existingExternals = Array.isArray(config.externals) ? config.externals : []
      config.externals = [
        ...existingExternals,
        ({ request }: { request?: string }, callback: (err?: Error | null, result?: string) => void) => {
          if (request) {
            for (const pkg of CJS_EXTERNALS) {
              if (request === pkg || request.startsWith(`${pkg}/`)) {
                return callback(null, `commonjs ${request}`)
              }
            }
          }
          callback()
        },
      ]
    }
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: '*.private.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: '*.neon.tech',
      },
    ],
  },
}

export default withPayload(nextConfig)
