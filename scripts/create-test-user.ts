import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import { getPayload } from 'payload'
import config from '@payload-config'

async function main() {
  const payload = await getPayload({ config })

  const existing = await payload.find({ collection: 'users', limit: 1 })
  console.log('Existing users:', existing.totalDocs)

  if (existing.totalDocs === 0) {
    const user = await payload.create({
      collection: 'users',
      data: {
        email: 'placeholder@test.com',
        password: 'TestPass123!',
        name: 'Test Admin',
        role: 'admin',
      },
      overrideAccess: true,
    })
    console.log('Created user ID:', user.id, 'email:', user.email)
  } else {
    const u = existing.docs[0]
    console.log('Existing user — ID:', u.id, 'email:', u.email)
  }

  process.exit(0)
}

main().catch(e => { console.error(e); process.exit(1) })
