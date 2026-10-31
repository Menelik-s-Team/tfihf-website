import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BugumaCourtPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[#F5F0EB]">
        {/* Hero */}
        <div className="relative h-80 overflow-hidden">
          <img
            src="/images/project-court-buguma.jpg"
            alt="Basketball court at Kalabari National College, Buguma"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 max-w-4xl mx-auto">
            <span className="bg-[#C8102E] text-white text-xs font-bold px-3 py-1 rounded-full">Infrastructure</span>
            <h1 className="text-3xl md:text-4xl font-black text-white mt-3 leading-tight">
              We Built a Court in Buguma City — Here's What That Means
            </h1>
            <p className="text-white/60 text-sm mt-2">June 2023 · Kalabari National College, Rivers State, Nigeria</p>
          </div>
        </div>

        {/* Article */}
        <div className="max-w-3xl mx-auto px-6 py-16">
          <div className="bg-white rounded-2xl p-8 md:p-12 border border-gray-100 shadow-sm">

            <p className="text-lg text-[#0D0D0D]/80 leading-relaxed mb-6">
              In April and June of 2023, The Future Is Here Foundation completed one of its most significant infrastructure projects to date: the construction and commissioning of a full basketball court at <strong>Kalabari National College</strong> in Buguma City, Rivers State, Nigeria. For the students and youth of that community, it wasn't just a court — it was a statement.
            </p>

            <h2 className="text-2xl font-black text-[#0D0D0D] mt-10 mb-4">Buguma City and Kalabari National College</h2>
            <p className="text-[#0D0D0D]/70 leading-relaxed mb-4">
              Buguma is the administrative headquarters of Asari-Toru Local Government Area in Rivers State, Nigeria — a city with deep cultural heritage and a large youth population that has historically had limited access to organized sports infrastructure. Kalabari National College is one of the region's oldest and most respected secondary schools, carrying generations of academic tradition.
            </p>
            <p className="text-[#0D0D0D]/70 leading-relaxed mb-6">
              Despite its history, the school lacked a proper outdoor court where students could develop their athletic skills. TFIHF identified this gap and made the Buguma court build a priority for 2023.
            </p>

            <h2 className="text-2xl font-black text-[#0D0D0D] mt-10 mb-4">What Was Built</h2>
            <p className="text-[#0D0D0D]/70 leading-relaxed mb-4">
              The project delivered a full outdoor basketball court — hardwood-standard playing surface markings, regulation backboards and rims, and a properly laid foundation designed to withstand the regional climate. Construction and commissioning were documented across multiple site visits in April and June 2023.
            </p>
            <p className="text-[#0D0D0D]/70 leading-relaxed mb-6">
              The court immediately became a hub for student activity, after-school programs, and community pickup games — exactly the kind of ripple effect TFIHF designs its projects to create.
            </p>

            <div className="bg-[#0D0D0D] rounded-2xl p-8 my-8">
              <p className="text-white/80 text-lg leading-relaxed italic">
                "This is the first facility of its kind at this school. What TFIHF built here isn't just a court — it's infrastructure for the next generation."
              </p>
              <p className="text-[#FDB927] text-sm font-bold mt-4">— TFIHF Project Documentation, 2023</p>
            </div>

            <h2 className="text-2xl font-black text-[#0D0D0D] mt-10 mb-4">Part of a Larger Pattern</h2>
            <p className="text-[#0D0D0D]/70 leading-relaxed mb-4">
              The Buguma court wasn't TFIHF's first infrastructure investment in Nigeria. Going back to 2013, founder Mactabene Amachree — a WNBA legend and Olympian — was distributing WNBA-level equipment to youth in Rivers State at the Governor Alfred Diete Spiff Gym. In 2015, TFIHF donated basketballs, footwear, and gear to the PHALGA community. In 2016, the foundation organized a full boys and girls basketball tournament with cash prizes and equipment for participants.
            </p>
            <p className="text-[#0D0D0D]/70 leading-relaxed mb-4">
              The Buguma court represents the evolution of that work — from equipment donations to permanent infrastructure. It is the kind of investment that lasts beyond a single camp or event.
            </p>
            <p className="text-[#0D0D0D]/70 leading-relaxed">
              TFIHF's model is built on the belief that sports infrastructure is community infrastructure. A court gives youth somewhere to go, something to work toward, and a space where mentorship can happen organically — every single day.
            </p>

            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
              <a
                href="/donate"
                className="bg-[#C8102E] text-white px-6 py-3 rounded-full font-bold text-sm text-center hover:bg-[#FDB927] hover:text-[#0D0D0D] transition-all"
              >
                Fund the Next Project
              </a>
              <a
                href="/#projects"
                className="bg-[#0D0D0D] text-white px-6 py-3 rounded-full font-bold text-sm text-center hover:bg-[#1A0000] transition-all"
              >
                See All Projects
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
