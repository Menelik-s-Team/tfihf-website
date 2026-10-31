export default function Mission() {
  return (
    <section id="mission" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-[#C8102E] text-sm font-bold uppercase tracking-widest">
            Who We Are
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#0D0D0D] mt-3 mb-6 leading-tight">
            Our Mission
          </h2>
          <p className="text-[#0D0D0D]/70 text-lg leading-relaxed mb-6">
            TFIHF is a Non-Profit organization formed to render help to humanity.
            We serve the community through sports and culture, youth development
            and empowerment, event organization, and camps and clinics.
          </p>
          <p className="text-[#0D0D0D]/70 text-lg leading-relaxed mb-8">
            We help youth grow into their full potential through Mentorship and
            Leadership training — using sports as a platform to unify our
            community, engage our youth, and create opportunities through skills
            and leadership.
          </p>
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
            src="/images/mission-community.jpg"
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
  );
}
