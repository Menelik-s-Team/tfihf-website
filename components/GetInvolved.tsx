import { Heart, HandHelping, ClipboardList } from "lucide-react";

const actions = [
  {
    icon: Heart,
    title: "Donate",
    description:
      "Your contribution funds courts, equipment, camps, and mentorship programs that directly impact youth lives.",
    cta: "Make a Donation",
    href: "/donate",
    primary: true,
  },
  {
    icon: HandHelping,
    title: "Volunteer",
    description:
      "Bring your skills to the court or the classroom. We need coaches, mentors, event staff, and community builders.",
    cta: "Volunteer With Us",
    href: "/volunteer",
    primary: false,
  },
  {
    icon: ClipboardList,
    title: "Register for Camp",
    description:
      "Sign up for one of our U.S. or international basketball camps and clinics. Open to youth of all skill levels.",
    cta: "Register Now",
    href: "/camp-registration",
    primary: false,
  },
];

export default function GetInvolved() {
  return (
    <section id="donate" className="py-24 bg-[#FFF8F0]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#C8102E] text-sm font-bold uppercase tracking-widest">
            Join the Movement
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#0D0D0D] mt-3">
            Get Involved
          </h2>
          <p className="text-[#0D0D0D]/60 mt-4 max-w-xl mx-auto text-lg">
            There are three ways you can help build tomorrow&apos;s leaders today.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {actions.map((a) => (
            <div
              key={a.title}
              className={`rounded-2xl p-8 text-center border-2 transition-all duration-300 hover:-translate-y-1 ${
                a.primary
                  ? "bg-[#0D0D0D] border-[#0D0D0D]"
                  : "bg-white border-gray-200 hover:border-[#C8102E] hover:shadow-xl hover:-translate-y-1"
              }`}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
                  a.primary ? "bg-[#C8102E]/20" : "bg-[#C8102E]/10"
                }`}
              >
                <a.icon size={30} color="#C8102E" />
              </div>
              <h3
                className={`text-xl font-bold mb-3 ${
                  a.primary ? "text-white" : "text-[#0D0D0D]"
                }`}
              >
                {a.title}
              </h3>
              <p
                className={`leading-relaxed mb-8 ${
                  a.primary ? "text-white/60" : "text-[#0D0D0D]/60"
                }`}
              >
                {a.description}
              </p>
              <a
                href={a.href}
                className={`inline-block px-7 py-3 rounded-full font-bold text-sm transition-all hover:scale-105 ${
                  a.primary
                    ? "bg-[#C8102E] text-white hover:bg-[#FDB927] hover:text-[#0D0D0D]"
                    : "bg-[#0D0D0D] text-white hover:bg-[#1A0000]"
                }`}
              >
                {a.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
