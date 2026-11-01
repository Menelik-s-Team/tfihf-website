import { getPayload } from 'payload'
import config from '@payload-config'
import Footer from './Footer'

async function getSiteSettings() {
  const payload = await getPayload({ config })
  return payload.findGlobal({ slug: 'site-settings' })
}

/**
 * Server component version of Footer — fetches CMS data and passes it as props.
 * Use this in server-only page files. For pages with "use client", use <Footer /> directly.
 */
export default async function FooterCMS() {
  const cms = await getSiteSettings().catch(() => null)

  return (
    <Footer
      ein={cms?.footer?.ein ?? undefined}
      footerTagline={cms?.footer?.footerTagline ?? undefined}
      copyrightText={cms?.footer?.copyrightText ?? undefined}
      address={cms?.contact?.address ?? undefined}
      city={cms?.contact?.city ?? undefined}
      phone={cms?.contact?.phone ?? undefined}
      email={cms?.contact?.email ?? undefined}
      twitter={cms?.social?.twitter ?? undefined}
      instagram={cms?.social?.instagram ?? undefined}
    />
  )
}
