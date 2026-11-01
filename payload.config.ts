import { buildConfig } from 'payload'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import nodemailer from 'nodemailer'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { Users } from './collections/Users'
import { Posts } from './collections/Posts'
import { Events } from './collections/Events'
import { Gallery } from './collections/Gallery'
import { Projects } from './collections/Projects'
import { BoardMembers } from './collections/BoardMembers'
import { StaffMembers } from './collections/StaffMembers'
import { Media } from './collections/Media'
import { Homepage } from './globals/Homepage'
import { AboutPage } from './globals/AboutPage'
import { SiteSettings } from './globals/SiteSettings'

async function revalidate(paths: string[]) {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
  const secret = process.env.REVALIDATION_SECRET
  if (!serverUrl || !secret) return
  await Promise.all(
    paths.map((path) =>
      fetch(`${serverUrl}/api/revalidate?secret=${secret}&path=${path}`, { method: 'POST' }).catch(
        () => null
      )
    )
  )
}

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- TFIHF Admin',
    },
  },
  collections: [
    Users,
    {
      ...Posts,
      hooks: {
        afterChange: [
          async ({ doc }) => {
            await revalidate(['/', '/news', `/news/${doc.slug}`])
          },
        ],
      },
    },
    {
      ...Events,
      hooks: {
        afterChange: [
          async () => {
            await revalidate(['/'])
          },
        ],
      },
    },
    {
      ...Projects,
      hooks: {
        afterChange: [
          async () => {
            await revalidate(['/'])
          },
        ],
      },
    },
    {
      ...BoardMembers,
      hooks: {
        afterChange: [
          async () => {
            await revalidate(['/about'])
          },
        ],
      },
    },
    {
      ...StaffMembers,
      hooks: {
        afterChange: [
          async () => {
            await revalidate(['/about'])
          },
        ],
      },
    },
    Gallery,
    Media,
  ],
  globals: [
    {
      ...Homepage,
      hooks: {
        afterChange: [
          async () => {
            await revalidate(['/'])
          },
        ],
      },
    },
    {
      ...AboutPage,
      hooks: {
        afterChange: [
          async () => {
            await revalidate(['/about'])
          },
        ],
      },
    },
    {
      ...SiteSettings,
      hooks: {
        afterChange: [
          async () => {
            await revalidate(['/', '/about', '/donate'])
          },
        ],
      },
    },
  ],
  editor: lexicalEditor({}),
  email: nodemailerAdapter({
    defaultFromAddress: process.env.TITAN_EMAIL || 'admin@tfihf.com',
    defaultFromName: 'TFIHF',
    transport: nodemailer.createTransport({
      host: 'smtp.titan.email',
      port: 587,
      secure: false,
      auth: {
        user: process.env.TITAN_EMAIL,
        pass: process.env.TITAN_PASSWORD,
      },
    }),
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: './payload-types.ts',
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
        gallery: true,
      },
      // Use the Vercel-managed integration token (public store) for preview/production.
      // BLOB_READ_WRITE_TOKEN_READ_WRITE_TOKEN is the marketplace connection token;
      // fall back to BLOB_READ_WRITE_TOKEN for local dev.
      token: process.env.BLOB_READ_WRITE_TOKEN_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
})
