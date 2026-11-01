import Navbar from "@/components/Navbar";
import FooterCMS from "@/components/FooterCMS";
import DonateForm from "./DonateForm";
import { getPayload } from 'payload'
import config from '@payload-config'

async function getDonationSettings() {
  const payload = await getPayload({ config })
  return payload.findGlobal({ slug: 'site-settings' })
}

export default async function DonatePage() {
  const cms = await getDonationSettings().catch(() => null)

  const heading = cms?.donation?.heading ?? "Make a Donation"
  const subtext =
    cms?.donation?.subtext ??
    "Your contribution funds courts, equipment, camps, and mentorship programs that directly change young lives."
  const presetAmounts =
    cms?.donation?.presetAmounts && cms.donation.presetAmounts.length > 0
      ? cms.donation.presetAmounts.map((a) => a.amount)
      : undefined

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[#F5F0EB]">
        <div className="bg-[#0D0D0D] py-20 text-center">
          <span className="text-[#C8102E] text-sm font-bold uppercase tracking-widest">
            Support the Mission
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mt-3">
            {heading}
          </h1>
          <p className="text-white/60 mt-4 max-w-xl mx-auto">
            {subtext}
          </p>
        </div>

        <div className="max-w-2xl mx-auto px-6 py-16">
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <DonateForm presetAmounts={presetAmounts} />
          </div>
          <p className="text-center text-[#0D0D0D]/40 text-xs mt-4">
            Payments secured by Stripe. TFIHF is a registered 501(c)(3) nonprofit — EIN 83-1486115.
          </p>
        </div>
      </main>
      <FooterCMS />
    </>
  )
}
