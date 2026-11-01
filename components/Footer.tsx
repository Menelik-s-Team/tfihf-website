import { Mail } from "lucide-react";

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const IGIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

export type FooterProps = {
  ein?: string
  footerTagline?: string
  copyrightText?: string
  address?: string
  city?: string
  phone?: string
  email?: string
  twitter?: string
  instagram?: string
}

const FOOTER_DEFAULTS: Required<FooterProps> = {
  ein: "83-1486115",
  footerTagline:
    "The Future Is Here Foundation, Inc. — a nonprofit serving communities through sports, culture, and youth development since 2003.",
  copyrightText: "",
  address: "1445 Woodmont LN STE 1905",
  city: "Atlanta, GA 30318",
  phone: "+1 770-946-2629",
  email: "admin@tfihf.com",
  twitter: "TFIHFoundation",
  instagram: "tfihf2003",
}

export default function Footer({
  ein = FOOTER_DEFAULTS.ein,
  footerTagline = FOOTER_DEFAULTS.footerTagline,
  copyrightText,
  address = FOOTER_DEFAULTS.address,
  city = FOOTER_DEFAULTS.city,
  phone = FOOTER_DEFAULTS.phone,
  email = FOOTER_DEFAULTS.email,
  twitter = FOOTER_DEFAULTS.twitter,
  instagram = FOOTER_DEFAULTS.instagram,
}: FooterProps) {
  const year = new Date().getFullYear()
  const copyright = copyrightText || `© ${year} The Future Is Here Foundation, Inc. All rights reserved.`

  return (
    <footer className="bg-[#080808] border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#C8102E] font-black text-2xl">TFIHF</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              {footerTagline}
            </p>
            <p className="text-white/30 text-xs mt-3">EIN: {ein}</p>
          </div>

          <div>
            <p className="text-white font-bold text-sm mb-4">Quick Links</p>
            <div className="flex flex-col gap-2">
              {["#home", "#mission", "#programs", "#projects", "#news", "#contact"].map(
                (href) => (
                  <a
                    key={href}
                    href={href}
                    className="text-white/50 text-sm hover:text-[#C8102E] transition-colors capitalize"
                  >
                    {href.replace("#", "")}
                  </a>
                )
              )}
            </div>
          </div>

          <div>
            <p className="text-white font-bold text-sm mb-4">Contact</p>
            <div className="flex flex-col gap-2 text-white/50 text-sm">
              <span>{email}</span>
              <span>{phone}</span>
              <span>{address}</span>
              <span>{city}</span>
            </div>
            <div className="flex gap-3 mt-5">
              <a
                href={`https://twitter.com/${twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-[#C8102E] transition-colors"
              >
                <XIcon />
              </a>
              <a
                href={`https://instagram.com/${instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-[#C8102E] transition-colors"
              >
                <IGIcon />
              </a>
              <a
                href={`mailto:${email}`}
                className="text-white/40 hover:text-[#C8102E] transition-colors"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">{copyright}</p>
          <p className="text-white/20 text-xs">
            Website by{" "}
            <span className="text-[#C8102E]/50 font-semibold">Apex Digital</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
