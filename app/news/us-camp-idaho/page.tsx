import Navbar from "@/components/Navbar";
import FooterCMS from "@/components/FooterCMS";

export default function USCampIdahoPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[#F5F0EB]">
        {/* Hero */}
        <div className="relative h-80 overflow-hidden">
          <img
            src="/images/news-camp-us.jpg"
            alt="TFIHF U.S. Camp - Idaho"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 max-w-4xl mx-auto">
            <span className="bg-[#C8102E] text-white text-xs font-bold px-3 py-1 rounded-full">Programs</span>
            <h1 className="text-3xl md:text-4xl font-black text-white mt-3 leading-tight">
              Developing Leaders On and Off the Court: The TFIHF Idaho Camp
            </h1>
            <p className="text-white/60 text-sm mt-2">2023 · Jerome Recreation Center, Jerome, Idaho</p>
          </div>
        </div>

        {/* Article */}
        <div className="max-w-3xl mx-auto px-6 py-16">
          <div className="bg-white rounded-2xl p-8 md:p-12 border border-gray-100 shadow-sm">

            <p className="text-lg text-[#0D0D0D]/80 leading-relaxed mb-6">
              When The Future Is Here Foundation brought its youth basketball camp to Jerome, Idaho, it marked a new milestone for the organization — expanding its U.S. programming beyond the Southeast and into a community where world-class athletic instruction isn't always easy to come by. The result was a camp that changed how participants saw themselves, both as athletes and as young leaders.
            </p>

            <h2 className="text-2xl font-black text-[#0D0D0D] mt-10 mb-4">The Vision Behind the Camp</h2>
            <p className="text-[#0D0D0D]/70 leading-relaxed mb-4">
              TFIHF founder Mactabene Amachree — a WNBA player, Olympian, and World Cup veteran — built this camp around a simple idea: elite coaching shouldn't only be available in major cities or to youth with resources. The Idaho camp was designed to bring the same level of instruction and mentorship that top programs offer anywhere, directly to youth who might otherwise never experience it.
            </p>
            <p className="text-[#0D0D0D]/70 leading-relaxed mb-6">
              Every session at the Jerome Recreation Center balanced on-court skill development with off-court conversation — about discipline, character, community, and what it means to be a leader.
            </p>

            <h2 className="text-2xl font-black text-[#0D0D0D] mt-10 mb-4">Atlanta Hawks Partnership</h2>
            <p className="text-[#0D0D0D]/70 leading-relaxed mb-4">
              The Idaho camp program coincided with a major equipment donation that elevated TFIHF's U.S. programming significantly. The <strong>Atlanta Hawks</strong>, through Vice President of Corporate Social Responsibility & Basketball Programs <strong>Jon Babul</strong> and <strong>Quentin Stephens</strong>, partnered with TFIHF to donate a full load of professional-grade gear:
            </p>
            <div className="bg-[#F5F0EB] rounded-xl p-6 mb-6">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { qty: "55", item: "Basketballs" },
                  { qty: "57", item: "Pairs of Shoes" },
                  { qty: "2", item: "Ball Racks" },
                  { qty: "2", item: "Coolers" },
                  { qty: "1", item: "Gatorade Rack" },
                  { qty: "1", item: "Whistle" },
                ].map((d) => (
                  <div key={d.item} className="flex items-center gap-3">
                    <span className="text-[#C8102E] font-black text-lg">{d.qty}</span>
                    <span className="text-[#0D0D0D]/70 text-sm">{d.item}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[#0D0D0D]/70 leading-relaxed mb-6">
              TFIHF expressed deep gratitude for the Hawks' investment, noting: <em>"We are very grateful and hope this partnership continues to blossom."</em> The donated equipment went directly into camps and community programs, putting professional-grade gear in the hands of youth who needed it most.
            </p>

            <div className="bg-[#0D0D0D] rounded-2xl p-8 my-8">
              <p className="text-white/80 text-lg leading-relaxed italic">
                "Elite coaching shouldn't only be available to those with resources. Every young person deserves access to the highest level of development — on and off the court."
              </p>
              <p className="text-[#FDB927] text-sm font-bold mt-4">— Mactabene Amachree, Founder, TFIHF</p>
            </div>

            <h2 className="text-2xl font-black text-[#0D0D0D] mt-10 mb-4">NBPA Support</h2>
            <p className="text-[#0D0D0D]/70 leading-relaxed mb-4">
              The <strong>NBA Players Association (NBPA)</strong> also recognized TFIHF's work, with Top 100 players donating jerseys to the foundation — further validating the organization's impact and connecting the youth in its programs to the professional level they aspire to reach.
            </p>

            <h2 className="text-2xl font-black text-[#0D0D0D] mt-10 mb-4">What Participants Took Away</h2>
            <p className="text-[#0D0D0D]/70 leading-relaxed mb-4">
              Beyond the basketball instruction, the Idaho camp gave participants access to mentors who had competed at the highest levels of the sport — internationally and professionally. That kind of exposure shifts something in a young athlete. It makes the goal feel real and reachable.
            </p>
            <p className="text-[#0D0D0D]/70 leading-relaxed">
              TFIHF's Idaho program continues to be a model for how the foundation brings its international standard of youth development to underserved communities in the United States. Future camps are in development — stay connected for updates.
            </p>

            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
              <a
                href="/camp-registration"
                className="bg-[#C8102E] text-white px-6 py-3 rounded-full font-bold text-sm text-center hover:bg-[#FDB927] hover:text-[#0D0D0D] transition-all"
              >
                Future Camp Info
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
      <FooterCMS />
    </>
  );
}
