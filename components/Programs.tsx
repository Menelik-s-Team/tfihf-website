import { Trophy, Users, MapPin } from "lucide-react";

const programs = [
  {
    icon: Trophy,
    title: "Sports & Culture",
    description:
      "Basketball courts, tournaments, and equipment donations — using the game to open doors and build discipline in youth across communities.",
    color: "#C8102E",
  },
  {
    icon: Users,
    title: "Youth Development",
    description:
      "Structured mentorship programs, leadership training, and life skills workshops designed to equip the next generation for success.",
    color: "#C8102E",
  },
  {
    icon: MapPin,
    title: "Camps & Clinics",
    description:
      "Camps are coming soon. More information TBA — stay connected to be the first to know when registration opens.",
    color: "#C8102E",
  },
];

export default function Programs() {
  return (
    <section id="programs" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#C8102E] text-sm font-bold uppercase tracking-widest">
            What We Do
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#0D0D0D] mt-3">
            Our Programs
          </h2>
          <p className="text-[#0D0D0D]/60 mt-4 max-w-xl mx-auto text-lg">
            Three pillars that drive our mission and create lasting impact in every
            community we serve.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((p) => (
            <div
              key={p.title}
              className="bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-[#C8102E] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#C8102E] flex items-center justify-center mb-6 group-hover:bg-[#FDB927] transition-colors shadow-lg shadow-[#C8102E]/20">
                <p.icon size={28} color="white" />
              </div>
              <h3 className="text-xl font-black text-[#0D0D0D] mb-3">{p.title}</h3>
              <p className="text-[#0D0D0D]/60 leading-relaxed">{p.description}</p>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <a
                  href="#contact"
                  className="text-[#C8102E] text-sm font-bold hover:text-[#FDB927] transition-colors"
                >
                  Get Involved →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
