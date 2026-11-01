import { buildConfig } from 'payload'
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

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- TFIHF Admin',
    },
  },
  collections: [Users, Posts, Events, Gallery, Projects, BoardMembers, StaffMembers, Media],
  globals: [Homepage, AboutPage, SiteSettings],
  editor: lexicalEditor({}),
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
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
})
