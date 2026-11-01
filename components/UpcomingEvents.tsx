import { getPayload } from 'payload'
import config from '@payload-config'

// Fallback event data (the two current events)
const FALLBACK_EVENTS = [
  {
    id: 'bbtv',
    name: "Bring Back the Village",
    subtitle: "Grassroot Basketball · Elite Camp Ages 9–11 & 12–20",
    tag: "Camp & Tournament",
    tagColor: "#00B4A6",
    borderColor: "rgba(0,180,166,0.13)",
    glowColor: "rgba(0,180,166,0.09)",
    flyerImage: "/images/flyer-bbtv.png",
    registrationLink: "/camp-registration",
    dates: [
      { date: "19th–20th", location: "Buguma", desc: "Girls Camp & Boys AI" },
      { date: "23rd", location: "Degema", desc: "Formal Dinner Degema" },
      { date: "24th–25th", location: "PHC", desc: "Invitation Tournament" },
    ],
  },
  {
    id: 'ttt',
    name: "Train the Trainer Program",
    subtitle: "A 3-Day Masterclass for Coaches · In Person & Zoom",
    tag: "Coaching Clinic",
    tagColor: "#7C3AED",
    borderColor: "rgba(124,58,237,0.13)",
    glowColor: "rgba(124,58,237,0.09)",
    flyerImage: "/images/flyer-train-the-trainer.png",
    registrationLink: "/camp-registration?event=train-the-trainer",
    dates: [
      { date: "Oct 16–18", location: "In Person & Zoom", desc: "P.D. · Mental Health · Offense · Defense · Game Mgmt" },
    ],
  },
]

async function getEventsData() {
  const payload = await getPayload({ config })
  return payload.find({
    collection: 'events',
    where: { status: { equals: 'published' } },
    sort: 'startDate',
  })
}

export default async function UpcomingEvents() {
  const result = await getEventsData().catch(() => null)
  const cmsEvents = result?.docs

  // If CMS has events, render generic CMS-driven layout
  if (cmsEvents && cmsEvents.length > 0) {
    return (
      <section id="events" className="py-24" style={{ background: "linear-gradient(135deg, #0a1628 0%, #0f2744 50%, #0a1628 100%)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#00B4A6] text-sm font-bold uppercase tracking-widest">
              Don&apos;t Miss Out
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-3">
              Upcoming Events
            </h2>
            <p className="text-white/50 mt-4 max-w-xl mx-auto text-lg">
              Register, donate, or spread the word — these events need your support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {cmsEvents.map((event) => {
              const flyerUrl =
                event.flyerImage && typeof event.flyerImage === 'object' && 'url' in event.flyerImage
                  ? (event.flyerImage.url as string)
                  : null
              const startDate = event.startDate
                ? new Date(event.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                : ''
              const endDate = event.endDate
                ? new Date(event.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                : ''

              return (
                <div
                  key={event.id}
                  className="rounded-2xl overflow-hidden group hover:-translate-y-1 transition-all duration-300"
                  style={{ background: "#111d2e", border: "2px solid rgba(0,180,166,0.13)", boxShadow: "0 0 40px rgba(0,180,166,0.09)" }}
                >
                  {flyerUrl && (
                    <div className="relative overflow-hidden bg-[#080f1c]">
                      <img
                        src={flyerUrl}
                        alt={event.name}
                        className="w-full object-contain max-h-[420px] group-hover:scale-[1.02] transition-transform duration-500"
                      />
                      <span className="absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 rounded-full" style={{ background: "#00B4A6" }}>
                        Event
                      </span>
                    </div>
                  )}
                  <div className="p-7">
                    <h3 className="text-white text-2xl font-black mb-1">{event.name}</h3>
                    <p className="text-white/40 text-sm mb-5">
                      {startDate}{endDate && endDate !== startDate ? ` – ${endDate}` : ''}{event.location ? ` · ${event.location}` : ''}
                    </p>
                    <div className="flex gap-3">
                      {event.registrationLink && (
                        <a href={event.registrationLink} className="flex-1 text-center py-3 rounded-full font-bold text-sm text-white hover:opacity-80 transition-all" style={{ background: "#00B4A6" }}>
                          Register Now
                        </a>
                      )}
                      <a href="/donate" className="flex-1 text-center py-3 rounded-full font-bold text-sm text-white hover:opacity-80 transition-all" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
                        Donate to Support
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Donation strip */}
          <div className="mt-14 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6" style={{ background: "#111d2e", border: "1px solid rgba(0,180,166,0.15)" }}>
            <div>
              <h3 className="text-white text-xl font-black mb-1">Support These Events</h3>
              <p className="text-white/50 text-sm">Every dollar funds courts, camps, and futures.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="/donate" className="text-white px-6 py-2.5 rounded-full font-bold text-sm hover:opacity-80 transition-all" style={{ background: "#00B4A6" }}>
                Donate Online
              </a>
              <span className="text-white/60 px-6 py-2.5 rounded-full text-sm font-medium" style={{ background: "rgba(255,255,255,0.07)" }}>
                Zelle: admin@tfihf.com
              </span>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Fallback: render the fully-designed hardcoded layout
  const bbtvDates = FALLBACK_EVENTS[0].dates
  const tttEvent = FALLBACK_EVENTS[1]

  return (
    <section id="events" className="py-24" style={{ background: "linear-gradient(135deg, #0a1628 0%, #0f2744 50%, #0a1628 100%)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#00B4A6] text-sm font-bold uppercase tracking-widest">
            Don&apos;t Miss Out
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-3">
            Upcoming Events
          </h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto text-lg">
            Register, donate, or spread the word — these events need your support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Bring Back the Village */}
          <div
            className="rounded-2xl overflow-hidden group hover:-translate-y-1 transition-all duration-300"
            style={{ background: "#111d2e", border: "2px solid rgba(0,180,166,0.13)", boxShadow: "0 0 40px rgba(0,180,166,0.09)" }}
          >
            <div className="relative overflow-hidden bg-[#080f1c]">
              <img
                src="/images/flyer-bbtv.png"
                alt="Bring Back the Village"
                className="w-full object-contain max-h-[420px] group-hover:scale-[1.02] transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 rounded-full" style={{ background: "#00B4A6" }}>
                Camp & Tournament
              </span>
            </div>
            <div className="p-7">
              <h3 className="text-white text-2xl font-black mb-1">Bring Back the Village</h3>
              <p className="text-white/40 text-sm mb-5">Grassroot Basketball · Elite Camp Ages 9–11 & 12–20</p>
              <div className="space-y-3 mb-7">
                {bbtvDates.map((d) => (
                  <div key={d.date} className="flex gap-4 items-start">
                    <div className="text-xs font-black px-3 py-1.5 rounded-lg shrink-0 min-w-[80px] text-center" style={{ background: "rgba(0,180,166,0.15)", border: "1px solid rgba(0,180,166,0.35)", color: "#00B4A6" }}>
                      {d.date}
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">{d.location}</p>
                      <p className="text-white/40 text-xs mt-0.5">{d.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <a href="/camp-registration" className="flex-1 text-center py-3 rounded-full font-bold text-sm text-white hover:opacity-80 transition-all" style={{ background: "#00B4A6" }}>
                  Register Now
                </a>
                <a href="/donate" className="flex-1 text-center py-3 rounded-full font-bold text-sm text-white hover:opacity-80 transition-all" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
                  Donate to Support
                </a>
              </div>
            </div>
          </div>

          {/* Train the Trainer */}
          <div
            className="rounded-2xl overflow-hidden group hover:-translate-y-1 transition-all duration-300"
            style={{ background: "#111d2e", border: "2px solid rgba(124,58,237,0.13)", boxShadow: "0 0 40px rgba(124,58,237,0.09)" }}
          >
            <div className="relative overflow-hidden bg-[#080f1c]">
              <img
                src="/images/flyer-train-the-trainer.png"
                alt="Train the Trainer Program"
                className="w-full object-contain max-h-[420px] group-hover:scale-[1.02] transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 rounded-full" style={{ background: "#7C3AED" }}>
                Coaching Clinic
              </span>
            </div>
            <div className="p-7">
              <h3 className="text-white text-2xl font-black mb-1">{tttEvent.name}</h3>
              <p className="text-white/40 text-sm mb-5">{tttEvent.subtitle}</p>

              <div className="flex gap-4 items-start mb-5">
                <div className="text-xs font-black px-3 py-1.5 rounded-lg shrink-0 min-w-[80px] text-center" style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.35)", color: "#7C3AED" }}>
                  Oct 16–18
                </div>
                <div>
                  <p className="text-white font-bold text-sm">In Person & Zoom</p>
                  <p className="text-white/40 text-xs mt-0.5">P.D. · Mental Health · Offense · Defense · Game Mgmt</p>
                </div>
              </div>

              <div className="rounded-xl p-4 mb-6" style={{ background: "rgba(0,180,166,0.07)", border: "1px solid rgba(0,180,166,0.2)" }}>
                <p className="text-[#00B4A6] text-xs font-bold uppercase tracking-widest mb-3">Also Coming Up — Bring Back the Village</p>
                <div className="space-y-2">
                  {bbtvDates.map((d) => (
                    <div key={d.date} className="flex gap-3 items-center">
                      <span className="text-[#00B4A6] text-xs font-black shrink-0 w-16">{d.date}</span>
                      <span className="text-white/60 text-xs">{d.location} — {d.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-5 items-center mb-6 rounded-xl p-4" style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)" }}>
                <img src="/images/flyer-qr.png" alt="Scan to Register" className="w-20 h-20 rounded-lg shrink-0" />
                <div>
                  <p className="text-white font-bold text-sm mb-1">Scan to Register</p>
                  <p className="text-white/50 text-xs leading-relaxed">Scan the QR code to register for the Train the Trainer Program directly.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <a href={tttEvent.registrationLink} className="flex-1 text-center py-3 rounded-full font-bold text-sm text-white hover:opacity-80 transition-all" style={{ background: "#7C3AED" }}>
                  Register Now
                </a>
                <a href="/donate" className="flex-1 text-center py-3 rounded-full font-bold text-sm text-white hover:opacity-80 transition-all" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
                  Donate to Support
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Donation strip */}
        <div className="mt-14 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6" style={{ background: "#111d2e", border: "1px solid rgba(0,180,166,0.15)" }}>
          <div>
            <h3 className="text-white text-xl font-black mb-1">Support These Events</h3>
            <p className="text-white/50 text-sm">Every dollar funds courts, camps, and futures.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/donate" className="text-white px-6 py-2.5 rounded-full font-bold text-sm hover:opacity-80 transition-all" style={{ background: "#00B4A6" }}>
              Donate Online
            </a>
            <span className="text-white/60 px-6 py-2.5 rounded-full text-sm font-medium" style={{ background: "rgba(255,255,255,0.07)" }}>
              Zelle: admin@tfihf.com
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
