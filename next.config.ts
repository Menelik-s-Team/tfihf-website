import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,

  serverExternalPackages: [
    'pg',
    'drizzle-orm',
    '@payloadcms/db-postgres',
    '@payloadcms/drizzle',
    'nodemailer',
    '@payloadcms/email-nodemailer',
    // NOTE: @payloadcms/storage-vercel-blob is intentionally NOT in serverExternalPackages.
    // When listed here, Next.js emits `module.exports = import(...)` for storage-vercel-blob
    // and its /client subpath. That native ESM import chain reaches @payloadcms/ui →
    // react-image-crop/dist/ReactCrop.css and crashes the Node.js runtime with
    // ERR_UNKNOWN_FILE_EXTENSION. We let webpack bundle it instead, and intercept
    // the CSS import via the externals function below.
  ],

  webpack: (config, { isServer }) => {
    if (isServer) {
      const CJS_EXTERNALS = [
        'pg',
        '@payloadcms/db-postgres',
        'drizzle-orm',
        '@payloadcms/drizzle',
        'nodemailer',
        '@payloadcms/email-nodemailer',
        '@payloadcms/storage-vercel-blob',
      ]

      // Client-only subpaths that must never be evaluated on the server.
      // They transitively import @payloadcms/ui → react-image-crop/dist/ReactCrop.css,
      // which crashes Node.js ESM with ERR_UNKNOWN_FILE_EXTENSION.
      // Returning var ({}) makes webpack emit `module.exports = ({})` — a safe empty object.
      const CLIENT_ONLY_STUBS = [
        '@payloadcms/storage-vercel-blob/client',
        '@payloadcms/plugin-cloud-storage/client',
      ]

      const existingExternals = Array.isArray(config.externals) ? config.externals : []
      config.externals = [
        ...existingExternals,

        ({ request, context }: { request?: string; context?: string }, callback: (err?: Error | null, result?: string) => void) => {
          if (request) {
            // Stub out client-only subpaths that pull in CSS-importing code.
            if (CLIENT_ONLY_STUBS.includes(request)) {
              return callback(null, 'var ({})')
            }

            // Suppress CSS/SCSS/SASS from node_modules — @payloadcms/ui imports
            // react-image-crop/dist/ReactCrop.css and SCSS files that Node.js ESM
            // cannot evaluate. We map them to an empty CJS stub.
            // Using externals (not module.rules) avoids triggering Next.js's
            // "Built-in CSS support is being disabled" detection.
            if (request.match(/\.(css|scss|sass)$/) && context?.includes('node_modules')) {
              // webpack externals type 'var' emits the value as a JS expression directly.
              // 'var ({})' → webpack emits `module.exports = ({})` — an empty object.
              // No file path dependency; works identically at build time and runtime.
              return callback(null, 'var ({})')
            }

            // Force db/email/storage packages (and pg) to be synchronous CJS externals
            // instead of async ESM dynamic imports.
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
