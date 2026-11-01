import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

// One-shot endpoint — protected by REVALIDATION_SECRET — creates/resets Mac's user
// REMOVE THIS FILE after proof checklist is complete
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (!secret || secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config })

  const macEmail = 'tfihf2003@gmail.com'
  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: macEmail } },
    limit: 1,
    overrideAccess: true,
  })

  if (existing.totalDocs > 0) {
    const user = existing.docs[0]
    await payload.update({
      collection: 'users',
      id: user.id,
      data: { password: '3Q!nHmf3b@Wk', name: 'Mac Amachree', role: 'admin' } as any,
      overrideAccess: true,
    })
    return NextResponse.json({ ok: true, action: 'updated', email: macEmail, id: user.id })
  } else {
    const user = await payload.create({
      collection: 'users',
      data: { email: macEmail, password: '3Q!nHmf3b@Wk', name: 'Mac Amachree', role: 'admin' } as any,
      overrideAccess: true,
    })
    return NextResponse.json({ ok: true, action: 'created', email: macEmail, id: user.id })
  }
}
