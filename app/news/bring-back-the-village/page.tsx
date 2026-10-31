import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BringBackTheVillagePage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[#F5F0EB]">
        {/* Hero */}
        <div className="relative h-80 overflow-hidden">
          <img
            src="/images/news-bbtv.webp"
            alt="Bring Back the Village Camp"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 max-w-4xl mx-auto">
            <span className="bg-[#C8102E] text-white text-xs font-bold px-3 py-1 rounded-full">Events</span>
            <h1 className="text-3xl md:text-4xl font-black text-white mt-3 leading-tight">
              Bring Back the Village: Skills & Mentorship Camp Returns
            </h1>
            <p className="text-white/60 text-sm mt-2">May 2026 · Jerome Recreation Center, Idaho</p>
          </div>
        </div>

        {/* Article */}
        <div className="max-w-3xl mx-auto px-6 py-16">
          <div className="bg-white rounded-2xl p-8 md:p-12 border border-gray-100 shadow-sm prose-custom">

            <p className="text-lg text-[#0D0D0D]/80 leading-relaxed mb-6">
              The Future Is Here Foundation brought its signature <strong>"Bring Back the Village"</strong> Skills and Mentorship Camp back to the United States in May 2026 — three days of elite basketball training, character development, and mentorship hosted at the Jerome Recreation Center in Jerome, Idaho.
            </p>

            <h2 className="text-2xl font-black text-[#0D0D0D] mt-10 mb-4">What the Camp Was About</h2>
            <p className="text-[#0D0D0D]/70 leading-relaxed mb-4">
              Running May 28–30, 2026, the camp was designed for youth ages 8–18, split into two groups: ages 8–13 and ages 14–18. Each day began at 7:30 AM and combined on-court skill development with off-court mentorship sessions centered on leadership, discipline, and community responsibility.
            </p>
            <p className="text-[#0D0D0D]/70 leading-relaxed mb-6">
              The name "Bring Back the Village" reflects TFIHF's core belief: it takes a community — a village — to raise a child. The camp reconnects that idea, bringing coaches, mentors, parents, and youth together in one space with a shared purpose.
            </p>

            <h2 className="text-2xl font-black text-[#0D0D0D] mt-10 mb-4">Elite Coaching Staff</h2>
            <p className="text-[#0D0D0D]/70 leading-relaxed mb-4">
              The camp featured an accomplished coaching lineup with international pedigree:
            </p>
            <ul className="space-y-3 mb-6">
              {[
                { name: "Mac Amachree", cred: "WNBA Legend · Olympian · World Cup Veteran · TFIHF Founder" },
                { name: "Peter Ahmedu", cred: "FIBA World Cup · National Team Head Coach" },
                { name: "Pallas Kuinayi", cred: "Olympian · Professional Player" },
                { name: "Nuru Adepoju", cred: "Former Professional Player · Twin Falls HS Head Coach" },
              ].map((coach) => (
                <li key={coach.name} className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full bg-[#C8102E] mt-2 shrink-0" />
                  <div>
                    <span className="font-bold text-[#0D0D0D]">{coach.name}</span>
                    <span className="text-[#0D0D0D]/60 text-sm"> — {coach.cred}</span>
                  </div>
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-black text-[#0D0D0D] mt-10 mb-4">Camp Format & Options</h2>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {[
                { type: "Day Camper", price: "$250", detail: "Daily sessions, lunch included" },
                { type: "Live-In (4/room)", price: "$355", detail: "3 meals daily, shared room" },
                { type: "Live-In (2/room)", price: "$410", detail: "3 meals daily, semi-private room" },
              ].map((opt) => (
                <div key={opt.type} className="bg-[#F5F0EB] rounded-xl p-5">
                  <div className="text-[#C8102E] text-xl font-black">{opt.price}</div>
                  <div className="font-bold text-[#0D0D0D] mt-1">{opt.type}</div>
                  <div className="text-[#0D0D0D]/60 text-sm mt-1">{opt.detail}</div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-black text-[#0D0D0D] mt-10 mb-4">Why It Matters</h2>
            <p className="text-[#0D0D0D]/70 leading-relaxed mb-4">
              TFIHF has run camps in Nigeria and across the U.S. for over a decade, but this iteration was particularly significant — bringing world-class coaches who have competed at the Olympic and FIBA World Cup levels directly to youth in rural Idaho. For many of those players, it was the highest level of instruction they had ever received.
            </p>
            <p className="text-[#0D0D0D]/70 leading-relaxed">
              The foundation's philosophy goes beyond basketball. Every session integrates mentorship, peer leadership, and community accountability — ensuring that the lessons from the court transfer to life at home, in school, and in the broader community.
            </p>

            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
              <a
                href="/volunteer"
                className="bg-[#C8102E] text-white px-6 py-3 rounded-full font-bold text-sm text-center hover:bg-[#FDB927] hover:text-[#0D0D0D] transition-all"
              >
                Volunteer With Us
              </a>
              <a
                href="/donate"
                className="bg-[#0D0D0D] text-white px-6 py-3 rounded-full font-bold text-sm text-center hover:bg-[#1A0000] transition-all"
              >
                Support the Mission
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
