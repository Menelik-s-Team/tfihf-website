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
  ],
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Force pg and all its subpaths to be treated as synchronous CJS
      // externals instead of async ESM dynamic imports. This prevents webpack
      // from emitting the async module wrapper (c.a / __webpack_require__.a)
      // around pg, which was causing a race condition in the admin RSC.
      const existingExternals = Array.isArray(config.externals) ? config.externals : []
      config.externals = [
        ...existingExternals,
        ({ request }: { request?: string }, callback: (err?: Error | null, result?: string) => void) => {
          if (request && (request === 'pg' || request.startsWith('pg/'))) {
            return callback(null, `commonjs ${request}`)
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
