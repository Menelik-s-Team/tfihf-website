import { getPayload } from 'payload'
import config from '@payload-config'
import Contact from './Contact'

async function getSiteSettings() {
  const payload = await getPayload({ config })
  return payload.findGlobal({ slug: 'site-settings' })
}

export default async function ContactWrapper() {
  const cms = await getSiteSettings().catch(() => null)

  return (
    <Contact
      address={cms?.contact?.address ?? undefined}
      city={cms?.contact?.city ?? undefined}
      phone={cms?.contact?.phone ?? undefined}
      email={cms?.contact?.email ?? undefined}
      twitter={cms?.social?.twitter ?? undefined}
      instagram={cms?.social?.instagram ?? undefined}
    />
  )
}
