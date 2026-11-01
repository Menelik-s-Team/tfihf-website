import Navbar from "@/components/Navbar";
import FooterCMS from "@/components/FooterCMS";
import { getPayload } from 'payload'
import config from '@payload-config'

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

const FALLBACK_BOARD = [
  {
    name: "Mactabene Amachree",
    title: "Founder & CEO",
    bio: "First Nigerian-born woman in the WNBA. Former GM of D'Tigress. 17-year professional career including Olympic participation. Founded TFIHF to give youth the same life-changing opportunity she received at age 8.",
    image: "/images/board-mactabene.webp",
  },
  {
    name: "Julius Isaac Nwosu",
    title: "Executive Director",
    bio: "NBA Academy Head Coach — Georgia. Brings elite-level coaching expertise to TFIHF's youth development programs across the U.S. and Nigeria.",
    image: "/images/board-julius.jpg",
  },
  {
    name: "David A. Lawyer",
    title: "Director",
    bio: "Business leader with extensive experience in operations and organizational strategy supporting TFIHF's U.S. programming.",
    image: "/images/board-david.jpg",
  },
  {
    name: "Faruk Oyalade",
    title: "Director",
    bio: "Business owner with deep roots in community development and entrepreneurship, guiding TFIHF's expansion strategy.",
    image: "/images/board-faruk.jpg",
  },
  {
    name: "Asiki Briggs",
    title: "Board of Directors",
    bio: "Community advocate dedicated to empowering youth through structured programming and mentorship in Rivers State and beyond.",
    image: "/images/board-asiki.jpg",
  },
  {
    name: "Olawunmi Mary Adebayo",
    title: "Treasurer",
    bio: "Ensures TFIHF's financial integrity and transparency as a registered 501(c)(3) nonprofit organization.",
    image: "/images/board-olawunmi.jpg",
  },
  {
    name: "Dax Addy",
    title: "Global Partnership Manager",
    bio: "Manages TFIHF's international relationships and partnerships across Africa and the United States.",
    image: "/images/board-dax.jpg",
  },
]

const FALLBACK_STAFF = [
  {
    name: "Menelik Garrick",
    title: "Lead of IT",
    bio: "Led the development of TFIHF's digital presence. Background in AI, software engineering, and building tech-driven solutions for nonprofits and businesses.",
    image: "/images/menelik-garrick.jpg",
  },
  {
    name: "Esther Hart",
    title: "Executive Assistant",
    bio: "Supports TFIHF's leadership operations and day-to-day executive functions, ensuring the foundation runs efficiently in service of its mission.",
    image: "/images/board-esther-hart.jpg",
  },
  {
    name: "Tamunosaki Amieyeofori",
    title: "Media / IT Specialist",
    bio: "Leads TFIHF's media production and digital communications, capturing the foundation's impact through storytelling, photography, and technology.",
    image: "/images/board-tamunosaki.jpg",
  },
]

const FALLBACK_PILLARS = [
  {
    number: "01",
    title: "Mentorship & Leadership",
    body: "Guiding youth toward their full leadership potential through structured mentorship programs that connect them with coaches, professionals, and community leaders.",
  },
  {
    number: "02",
    title: "Education & Opportunity",
    body: "Creating pathways through education, sports, and cultural engagement — equipping young people with the skills to become self-sufficient and future-ready.",
  },
  {
    number: "03",
    title: "Community Safety & Family",
    body: "Strengthening the community support systems that surround youth — because it takes parents, educators, mentors, clergy, and neighbors working together.",
  },
  {
    number: "04",
    title: "Sports as a Platform",
    body: "Using basketball and athletics as a universal language to unify communities, break down barriers, and open doors that might otherwise stay closed.",
  },
]

export default async function AboutPage() {
  const payload = await getPayload({ config })

  const [aboutCms, boardResult, staffResult] = await Promise.all([
    payload.findGlobal({ slug: 'about-page' }).catch(() => null),
    payload.find({ collection: 'board-members', sort: 'order', limit: 50 }).catch(() => null),
    payload.find({ collection: 'staff-members', sort: 'order', limit: 50 }).catch(() => null),
  ])

  const board =
    boardResult?.docs && boardResult.docs.length > 0
      ? boardResult.docs.map((m) => ({
          name: m.name,
          title: m.title,
          bio: m.bio ?? '',
          image:
            m.photo && typeof m.photo === 'object' && 'url' in m.photo
              ? (m.photo.url as string)
              : '/images/board-mactabene.webp',
        }))
      : FALLBACK_BOARD

  const staff =
    staffResult?.docs && staffResult.docs.length > 0
      ? staffResult.docs.map((m) => ({
          name: m.name,
          title: m.title,
          bio: m.bio ?? '',
          image:
            m.photo && typeof m.photo === 'object' && 'url' in m.photo
              ? (m.photo.url as string)
              : '/images/menelik-garrick.jpg',
        }))
      : FALLBACK_STAFF

  const pillars =
    aboutCms?.pillars && aboutCms.pillars.length > 0
      ? aboutCms.pillars.map((p, i) => ({
          number: String(i + 1).padStart(2, '0'),
          title: p.title,
          body: p.description ?? '',
        }))
      : FALLBACK_PILLARS

  const founderStoryHtml =
    aboutCms?.founderStory
      ? renderRichText(aboutCms.founderStory) || ''
      : ''

  return (
    <>
      <Navbar />
      <main className="pt-16">

        {/* Hero */}
        <div className="bg-[#0D0D0D] py-24 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #C8102E 0%, transparent 70%)" }} />
          <div className="relative z-10">
            <span className="text-[#FDB927] text-sm font-bold uppercase tracking-widest">Who We Are</span>
            <h1 className="text-4xl md:text-6xl font-black text-white mt-3 leading-tight">
              About <span className="text-[#C8102E]">TFIHF</span>
            </h1>
            <p className="text-white/60 mt-5 max-w-2xl mx-auto text-lg leading-relaxed">
              {aboutCms?.missionStatement ??
                "The Future Is Here Foundation, Inc. is a nonprofit organization dedicated to rendering help to humanity through sports, culture, and youth development — across the U.S. and internationally."}
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-10">
              {[
                { value: "501(c)(3)", label: "Nonprofit Status" },
                { value: "83-1486115", label: "EIN" },
                { value: "Est. 2003", label: "Founded" },
                { value: "Atlanta, GA", label: "Headquarters" },
              ].map((s) => (
                <div key={s.label} className="text-center px-6 py-3 border border-white/10 rounded-xl">
                  <div className="text-[#FDB927] font-black text-lg">{s.value}</div>
                  <div className="text-white/40 text-xs mt-1 uppercase tracking-widest">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Founder's Story */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative order-2 md:order-1">
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#C8102E] rounded-2xl" />
                <img
                  src="/images/board-mactabene.webp"
                  alt="Mactabene Amachree — Founder"
                  className="relative z-10 w-full h-[480px] object-cover object-top rounded-2xl"
                />
                <div className="absolute bottom-6 left-6 right-6 z-20 bg-[#0D0D0D]/95 backdrop-blur-sm rounded-xl px-5 py-4">
                  <p className="text-[#FDB927] font-black text-sm italic">&ldquo;Only the dreamer can see the dream.&rdquo;</p>
                  <p className="text-white/60 text-xs mt-1">— Mactabene Amachree, Founder</p>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <span className="text-[#C8102E] text-sm font-bold uppercase tracking-widest">The Founder&apos;s Story</span>
                <h2 className="text-3xl md:text-4xl font-black text-[#0D0D0D] mt-3 mb-6 leading-tight">
                  A Dream Born on the Court
                </h2>
                {founderStoryHtml ? (
                  <div
                    className="text-[#0D0D0D]/70 leading-relaxed mb-8 prose prose-p:mb-5"
                    dangerouslySetInnerHTML={{ __html: founderStoryHtml }}
                  />
                ) : (
                  <>
                    <p className="text-[#0D0D0D]/70 leading-relaxed mb-5 text-lg">
                      Mactabene Amachree&apos;s life changed at age eight — when a simple invitation to a team practice opened a door she never knew existed. That moment planted a seed that would grow into a 17-year professional basketball career, Olympic participation, and a WNBA career that made her the <strong>first Nigerian-born woman to play in the league</strong>.
                    </p>
                    <p className="text-[#0D0D0D]/70 leading-relaxed mb-5">
                      She went on to serve as General Manager of <strong>D&apos;Tigress</strong>, Nigeria&apos;s national women&apos;s basketball team, helping build the infrastructure for the next generation of Nigerian athletes on the world stage.
                    </p>
                    <p className="text-[#0D0D0D]/70 leading-relaxed mb-8">
                      TFIHF was born from that same belief: that one invitation, one opportunity, one mentor can change the entire trajectory of a young person&apos;s life. Mac built this foundation to be that invitation — at scale.
                    </p>
                  </>
                )}
                <div className="flex flex-wrap gap-3">
                  {["WNBA Pioneer", "Olympian", "World Cup Veteran", "FIBA Coach", "Community Builder"].map((tag) => (
                    <span key={tag} className="bg-[#C8102E]/10 text-[#C8102E] text-xs font-bold px-4 py-2 rounded-full border border-[#C8102E]/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission + Vision */}
        <section className="py-24 bg-[#0D0D0D]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-[#FDB927] text-sm font-bold uppercase tracking-widest">Mission & Vision</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mt-3">
                Bring Back the Village
              </h2>
              <p className="text-white/50 mt-5 max-w-3xl mx-auto text-lg leading-relaxed">
                {aboutCms?.visionStatement ??
                  "TFIHF's vision is rooted in a simple, ancient truth: it takes a village to raise a child. We exist to rebuild that village — using sports as the gathering place and mentorship as the foundation."}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {pillars.map((p) => (
                <div key={p.number} className="bg-[#161616] border border-white/10 hover:border-[#C8102E]/40 rounded-2xl p-8 transition-all group">
                  <div className="text-[#C8102E] text-4xl font-black mb-4 group-hover:text-[#FDB927] transition-colors">{p.number}</div>
                  <h3 className="text-white text-xl font-black mb-3">{p.title}</h3>
                  <p className="text-white/50 leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-[#C8102E] rounded-2xl p-8 md:p-12 text-center">
              <p className="text-white text-xl md:text-2xl font-black leading-relaxed max-w-3xl mx-auto">
                &ldquo;We serve the community through sports and culture, youth development and empowerment, event organization, and camps and clinics.&rdquo;
              </p>
              <p className="text-white/60 mt-4 text-sm font-medium">— TFIHF Mission Statement</p>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-[#C8102E] text-sm font-bold uppercase tracking-widest">Our Reach</span>
              <h2 className="text-4xl font-black text-[#0D0D0D] mt-3">
                Community. Courts. Change.
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "U.S. Programming",
                  body: "Operating out of Atlanta, Georgia, TFIHF runs camps, coaching clinics, and mentorship programs in Idaho, Georgia, and beyond — bringing Olympian-level coaching to underserved communities nationwide.",
                  accent: "#C8102E",
                },
                {
                  title: "Nigeria Operations",
                  body: "Deep roots in Rivers State, Nigeria — including Buguma, Port Harcourt, PHALGA, and Degema. TFIHF has built courts, run tournaments, and donated equipment in these communities since 2013.",
                  accent: "#FDB927",
                },
                {
                  title: "International Partnerships",
                  body: "Partnered with the Atlanta Hawks, NBA Players Association (NBPA), and '21 Reasons to Give' to expand equipment access and programming for youth in multiple countries.",
                  accent: "#1a6b2e",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border-2 border-gray-100 hover:border-[#C8102E] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-8 group">
                  <div className="w-3 h-12 rounded-full mb-5" style={{ backgroundColor: item.accent }} />
                  <h3 className="text-[#0D0D0D] text-xl font-black mb-3">{item.title}</h3>
                  <p className="text-[#0D0D0D]/60 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Board of Directors */}
        <section className="py-24 bg-[#0D0D0D]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-[#FDB927] text-sm font-bold uppercase tracking-widest">Leadership</span>
              <h2 className="text-4xl font-black text-white mt-3">Board of Directors</h2>
              <p className="text-white/50 mt-4 max-w-xl mx-auto">
                The people behind the mission — coaches, business leaders, and community builders committed to TFIHF&apos;s long-term impact.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {board.map((member) => (
                <div
                  key={member.name}
                  className="bg-[#161616] rounded-2xl overflow-hidden border border-white/10 hover:border-[#C8102E]/60 hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="h-72 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-[#C8102E] text-xs font-bold uppercase tracking-widest mb-1">
                      {member.title}
                    </p>
                    <h3 className="text-white font-black text-lg mb-2">{member.name}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Staff */}
        <section className="py-24 bg-[#111111]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-[#FDB927] text-sm font-bold uppercase tracking-widest">Team</span>
              <h2 className="text-4xl font-black text-white mt-3">Staff</h2>
              <p className="text-white/50 mt-4 max-w-xl mx-auto">
                The dedicated individuals who keep TFIHF running day to day.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {staff.map((member) => (
                <div
                  key={member.name}
                  className="bg-[#161616] rounded-2xl overflow-hidden border border-white/10 hover:border-[#FDB927]/40 hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="h-72 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-[#FDB927] text-xs font-bold uppercase tracking-widest mb-1">
                      {member.title}
                    </p>
                    <h3 className="text-white font-black text-lg mb-2">{member.name}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <FooterCMS />
    </>
  )
}
