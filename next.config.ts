import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  // Externalize the postgres adapter stack so pg is never bundled via ESM import().
  // drizzle-orm's pg driver uses dynamic import("pg") which creates an async
  // webpack module chain that fails on Vercel lambda cold starts when Payload initializes.
  serverExternalPackages: [
    'pg',
    'drizzle-orm',
    '@payloadcms/db-postgres',
  ],
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
