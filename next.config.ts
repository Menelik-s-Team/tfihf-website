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
    '@payloadcms/storage-vercel-blob',
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
      const existingExternals = Array.isArray(config.externals) ? config.externals : []
      config.externals = [
        ...existingExternals,

        ({ request, context }: { request?: string; context?: string }, callback: (err?: Error | null, result?: string) => void) => {
          if (request) {
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
