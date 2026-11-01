import { getPayload } from 'payload'
import config from '@payload-config'

const FALLBACK_STATS = [
  { value: "10+", label: "Years of Service" },
  { value: "500+", label: "Youth Impacted" },
  { value: "3", label: "Countries Reached" },
  { value: "20+", label: "Tournaments Organized" },
  { value: "100+", label: "Equipment Donations" },
  { value: "2013", label: "First Community Event" },
]

async function getImpactData() {
  const payload = await getPayload({ config })
  return payload.findGlobal({ slug: 'homepage' })
}

export default async function Impact() {
  const cms = await getImpactData().catch(() => null)
  const stats =
    cms?.impact && cms.impact.length > 0 ? cms.impact : FALLBACK_STATS

  return (
    <section id="impact" className="py-24 bg-[#0D0D0D] border-y-2 border-[#C8102E]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#C8102E] text-sm font-bold uppercase tracking-widest">Impact</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-3">
            The Numbers Don&apos;t Lie
          </h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto text-lg">
            Real impact. Real communities. Real results.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label} className="border border-white/10 rounded-xl py-6 px-4 hover:border-[#C8102E]/50 transition-colors">
              <div className="text-[#FDB927] text-4xl font-black mb-2">{s.value}</div>
              <div className="text-white/60 text-xs font-semibold uppercase tracking-wide">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
