import { getPayload } from 'payload'
import config from '@payload-config'

const FALLBACKS = {
  headline: "Building Tomorrow's Leaders Today",
  subtext:
    "The Future Is Here Foundation empowers youth through sports, mentorship, and community development — across the U.S. and internationally.",
  ctaPrimaryLabel: "Donate Now",
  ctaPrimaryLink: "/donate",
  ctaSecondaryLabel: "Learn More",
  ctaSecondaryLink: "#mission",
  stats: [
    { value: "10+", label: "Years of Impact" },
    { value: "500+", label: "Youth Served" },
    { value: "3", label: "Countries" },
    { value: "20+", label: "Events Hosted" },
  ],
}

async function getHeroData() {
  const payload = await getPayload({ config })
  return payload.findGlobal({ slug: 'homepage' })
}

export default async function Hero() {
  const cms = await getHeroData().catch(() => null)

  const headline = cms?.hero?.headline ?? FALLBACKS.headline
  const subtext = cms?.hero?.subtext ?? FALLBACKS.subtext
  const ctaPrimaryLabel = cms?.hero?.ctaPrimaryLabel ?? FALLBACKS.ctaPrimaryLabel
  const ctaPrimaryLink = cms?.hero?.ctaPrimaryLink ?? FALLBACKS.ctaPrimaryLink
  const ctaSecondaryLabel = cms?.hero?.ctaSecondaryLabel ?? FALLBACKS.ctaSecondaryLabel
  const ctaSecondaryLink = cms?.hero?.ctaSecondaryLink ?? FALLBACKS.ctaSecondaryLink
  const stats =
    cms?.hero?.stats && cms.hero.stats.length > 0 ? cms.hero.stats : FALLBACKS.stats

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center"
      style={{
        backgroundImage: "url(/images/hero-bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
      }}
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,0,0,0.30) 0%, rgba(10,0,0,0.45) 55%, rgba(13,13,13,0.80) 100%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 text-center">
        <span className="inline-block bg-[#FDB927]/15 text-[#FDB927] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 border border-[#FDB927]/30">
          Nonprofit Organization · EIN 83-1486115
        </span>

        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
          {headline}
        </h1>

        <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          {subtext}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={ctaPrimaryLink}
            className="bg-[#C8102E] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#FDB927] hover:text-[#0D0D0D] transition-all hover:scale-105 shadow-lg shadow-[#C8102E]/30"
          >
            {ctaPrimaryLabel}
          </a>
          <a
            href={ctaSecondaryLink}
            className="border-2 border-white/40 text-white px-8 py-4 rounded-full font-bold text-lg hover:border-[#C8102E] hover:text-[#C8102E] transition-all"
          >
            {ctaSecondaryLabel}
          </a>
        </div>
      </div>

      {/* Stat bar */}
      <div className="relative z-10 w-full border-t border-white/10 bg-[#0D0D0D]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-[#FDB927] text-3xl font-black">{stat.value}</div>
              <div className="text-white/60 text-sm font-medium mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
