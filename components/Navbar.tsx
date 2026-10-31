"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/#programs" },
  { label: "Projects", href: "/#projects" },
  { label: "Events", href: "/#events" },
  { label: "Volunteer", href: "/volunteer" },
  { label: "Register", href: "/camp-registration" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="#home" className="flex items-center gap-2">
          <span className="text-[#C8102E] font-black text-xl tracking-tight">TFIHF</span>
          <span className="hidden sm:block text-white/60 text-xs font-medium uppercase tracking-widest">
            The Future Is Here Foundation
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-white/80 hover:text-[#C8102E] text-sm font-medium transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/donate"
            className="bg-[#C8102E] text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-[#FDB927] hover:text-[#0D0D0D] transition-colors"
          >
            Donate Now
          </a>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#0D0D0D] border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-[#C8102E] text-sm font-medium"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/donate"
            onClick={() => setOpen(false)}
            className="bg-[#C8102E] text-white px-5 py-2 rounded-full text-sm font-bold text-center"
          >
            Donate Now
          </a>
        </div>
      )}
    </nav>
  );
}
