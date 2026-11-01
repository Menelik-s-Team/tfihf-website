import { getPayload } from 'payload'
import config from '@payload-config'

const FALLBACKS = {
  heading: "Our Mission",
  body: `<p>TFIHF is a Non-Profit organization formed to render help to humanity. We serve the community through sports and culture, youth development and empowerment, event organization, and camps and clinics.</p><p>We help youth grow into their full potential through Mentorship and Leadership training — using sports as a platform to unify our community, engage our youth, and create opportunities through skills and leadership.</p>`,
  imageUrl: "/images/mission-community.jpg",
}

function renderRichText(content: unknown): string {
  if (!content || typeof content !== 'object') return ''
  const root = (content as { root?: { children?: unknown[] } }).root
  if (!root?.children) return ''
  return root.children
    .map((node: unknown) => {
      const n = node as { type?: string; children?: { text?: string }[] }
      if (n.type === 'paragraph') {
        const text = n.children?.map((c) => c.text || '').join('') || ''
        return `<p>${text}</p>`
      }
      return ''
    })
    .join('')
}

async function getMissionData() {
  const payload = await getPayload({ config })
  return payload.findGlobal({ slug: 'homepage' })
}

export default async function Mission() {
  const cms = await getMissionData().catch(() => null)

  const heading = cms?.mission?.heading ?? FALLBACKS.heading
  const bodyHtml =
    cms?.mission?.body ? renderRichText(cms.mission.body) || FALLBACKS.body : FALLBACKS.body

  const mediaDoc = cms?.mission?.image
  const imageUrl =
    mediaDoc && typeof mediaDoc === 'object' && 'url' in mediaDoc && mediaDoc.url
      ? (mediaDoc.url as string)
      : FALLBACKS.imageUrl

  return (
    <section id="mission" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-[#C8102E] text-sm font-bold uppercase tracking-widest">
            Who We Are
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#0D0D0D] mt-3 mb-6 leading-tight">
            {heading}
          </h2>
          <div
            className="text-[#0D0D0D]/70 text-lg leading-relaxed mb-8 prose prose-p:mb-5"
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />
          <div className="flex flex-col gap-3">
            {[
              "Youth Mentorship & Leadership Training",
              "Sports as a Community Development Tool",
              "U.S. & International Program Reach",
              "Nonprofit Transparency & Accountability",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#C8102E] flex-shrink-0" />
                <span className="text-[#0D0D0D]/80 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#C8102E] rounded-2xl" />
          <img
            src={imageUrl}
            alt="TFIHF community event"
            className="relative z-10 w-full h-[420px] object-cover rounded-2xl"
          />
          <div className="absolute bottom-6 left-6 right-6 z-20 bg-[#0D0D0D]/90 backdrop-blur-sm rounded-xl px-5 py-4">
            <p className="text-[#C8102E] font-bold text-sm">Founded with Purpose</p>
            <p className="text-white/80 text-xs mt-1">
              Serving communities since 2003 through sports, culture, and youth empowerment
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
