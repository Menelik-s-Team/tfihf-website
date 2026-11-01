/**
 * TFIHF Payload CMS Seed Script
 *
 * Seeds globals (Homepage, AboutPage, SiteSettings) and collections
 * (Posts, Events, BoardMembers, StaffMembers) from the current static site data.
 *
 * Does NOT seed Projects or Gallery — those are managed through the admin UI.
 *
 * Run: npm run seed
 */

import path from 'path'
import { fileURLToPath } from 'url'
import { config as dotenvConfig } from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load .env.local before payload init — must happen before dynamic imports
dotenvConfig({ path: path.resolve(__dirname, '../.env.local'), override: false })
dotenvConfig({ path: path.resolve(__dirname, '../.env'), override: false })

async function seed() {
  // Dynamic imports ensure env vars are loaded before payload initializes
  const { default: config } = await import('../payload.config.js')
  const { getPayload } = await import('payload')
  const payload = await getPayload({ config })

  console.log('\n--- Seeding TFIHF Payload CMS ---\n')

  // =========================================================
  // HOMEPAGE GLOBAL
  // =========================================================
  console.log('Seeding Homepage global...')
  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      hero: {
        headline: "Building Tomorrow's Leaders Today",
        subtext:
          'The Future Is Here Foundation empowers youth through sports, mentorship, and community development — across the U.S. and internationally.',
        ctaPrimaryLabel: 'Donate Now',
        ctaPrimaryLink: '/donate',
        ctaSecondaryLabel: 'Learn More',
        ctaSecondaryLink: '#mission',
        stats: [
          { value: '10+', label: 'Years of Impact' },
          { value: '500+', label: 'Youth Served' },
          { value: '3', label: 'Countries' },
          { value: '20+', label: 'Events Hosted' },
        ],
      },
      mission: {
        heading: 'Our Mission',
        body: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    text: 'TFIHF is a Non-Profit organization formed to render help to humanity. We serve the community through sports and culture, youth development and empowerment, event organization, and camps and clinics.',
                    version: 1,
                  },
                ],
              },
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    text: 'We help youth grow into their full potential through Mentorship and Leadership training — using sports as a platform to unify our community, engage our youth, and create opportunities through skills and leadership.',
                    version: 1,
                  },
                ],
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
      },
      programs: [
        {
          title: 'Sports & Culture',
          description:
            'Basketball courts, tournaments, and equipment donations — using the game to open doors and build discipline in youth across communities.',
          icon: 'Trophy',
        },
        {
          title: 'Youth Development',
          description:
            'Structured mentorship programs, leadership training, and life skills workshops designed to equip the next generation for success.',
          icon: 'Users',
        },
        {
          title: 'Camps & Clinics',
          description:
            'Camps are coming soon. More information TBA — stay connected to be the first to know when registration opens.',
          icon: 'MapPin',
        },
      ],
      impact: [
        { value: '10+', label: 'Years of Service' },
        { value: '500+', label: 'Youth Impacted' },
        { value: '3', label: 'Countries Reached' },
        { value: '20+', label: 'Tournaments Organized' },
        { value: '100+', label: 'Equipment Donations' },
        { value: '2013', label: 'First Community Event' },
      ],
      countdownEvent: {
        eventName: 'Train the Trainer Program',
        eventDate: '2026-10-16T08:00:00.000Z',
        ctaLabel: "Register Before It's Full",
        ctaLink: '/camp-registration?event=train-the-trainer',
        showBanner: false, // Event is past (Oct 16 2026)
      },
    },
  })
  console.log('  Homepage global seeded.')

  // =========================================================
  // ABOUT PAGE GLOBAL
  // =========================================================
  console.log('Seeding AboutPage global...')
  await payload.updateGlobal({
    slug: 'about-page',
    data: {
      founderStory: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: "Mactabene Amachree's life changed at age eight — when a simple invitation to a team practice opened a door she never knew existed. That moment planted a seed that would grow into a 17-year professional basketball career, Olympic participation, and a WNBA career that made her the first Nigerian-born woman to play in the league.",
                  version: 1,
                },
              ],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: "She went on to serve as General Manager of D'Tigress, Nigeria's national women's basketball team, helping build the infrastructure for the next generation of Nigerian athletes on the world stage.",
                  version: 1,
                },
              ],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: "TFIHF was born from that same belief: that one invitation, one opportunity, one mentor can change the entire trajectory of a young person's life. Mac built this foundation to be that invitation — at scale.",
                  version: 1,
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      missionStatement:
        'We serve the community through sports and culture, youth development and empowerment, event organization, and camps and clinics.',
      visionStatement:
        "TFIHF's vision is rooted in a simple, ancient truth: it takes a village to raise a child. We exist to rebuild that village — using sports as the gathering place and mentorship as the foundation.",
      pillars: [
        {
          title: 'Mentorship & Leadership',
          description:
            'Guiding youth toward their full leadership potential through structured mentorship programs that connect them with coaches, professionals, and community leaders.',
        },
        {
          title: 'Education & Opportunity',
          description:
            'Creating pathways through education, sports, and cultural engagement — equipping young people with the skills to become self-sufficient and future-ready.',
        },
        {
          title: 'Community Safety & Family',
          description:
            'Strengthening the community support systems that surround youth — because it takes parents, educators, mentors, clergy, and neighbors working together.',
        },
        {
          title: 'Sports as a Platform',
          description:
            'Using basketball and athletics as a universal language to unify communities, break down barriers, and open doors that might otherwise stay closed.',
        },
      ],
      reach: [
        {
          title: 'U.S. Programming',
          value: 'Atlanta, GA',
          description:
            'Operating out of Atlanta, Georgia, TFIHF runs camps, coaching clinics, and mentorship programs in Idaho, Georgia, and beyond — bringing Olympian-level coaching to underserved communities nationwide.',
        },
        {
          title: 'Nigeria Operations',
          value: 'Rivers State, NG',
          description:
            'Deep roots in Rivers State, Nigeria — including Buguma, Port Harcourt, PHALGA, and Degema. TFIHF has built courts, run tournaments, and donated equipment in these communities since 2013.',
        },
        {
          title: 'International Partnerships',
          value: 'Multi-Country',
          description:
            "Partnered with the Atlanta Hawks, NBA Players Association (NBPA), and '21 Reasons to Give' to expand equipment access and programming for youth in multiple countries.",
        },
      ],
    },
  })
  console.log('  AboutPage global seeded.')

  // =========================================================
  // SITE SETTINGS GLOBAL
  // =========================================================
  console.log('Seeding SiteSettings global...')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      contact: {
        address: '1445 Woodmont LN STE 1905',
        city: 'Atlanta, GA 30318',
        phone: '+1 770-946-2629',
        email: 'admin@tfihf.com',
      },
      social: {
        twitter: 'TFIHFoundation',
        instagram: 'tfihf2003',
      },
      footer: {
        ein: '83-1486115',
        footerTagline:
          'The Future Is Here Foundation, Inc. — a nonprofit serving communities through sports, culture, and youth development since 2003.',
        copyrightText: 'The Future Is Here Foundation, Inc. All rights reserved.',
      },
      donation: {
        heading: 'Support The Future Is Here Foundation',
        subtext:
          'Your donation goes directly to youth programs, court builds, camps, and equipment donations across the U.S. and Nigeria.',
        presetAmounts: [
          { amount: 10 },
          { amount: 25 },
          { amount: 50 },
          { amount: 100 },
          { amount: 250 },
          { amount: 500 },
        ],
      },
    },
  })
  console.log('  SiteSettings global seeded.')

  // =========================================================
  // POSTS COLLECTION
  // =========================================================
  console.log('Seeding Posts collection...')

  const posts = [
    {
      title: 'Bring Back the Village: Skills & Mentorship Camp Returns',
      slug: 'bring-back-the-village',
      summary:
        'The Future Is Here Foundation brought its signature "Bring Back the Village" Skills and Mentorship Camp back to the United States in May 2026 — three days of elite basketball training, character development, and mentorship hosted at the Jerome Recreation Center in Jerome, Idaho.',
      publishedDate: '2026-05-28T00:00:00.000Z',
      status: 'published' as const,
      body: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'The Future Is Here Foundation brought its signature "Bring Back the Village" Skills and Mentorship Camp back to the United States in May 2026 — three days of elite basketball training, character development, and mentorship hosted at the Jerome Recreation Center in Jerome, Idaho.',
                  version: 1,
                },
              ],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'Running May 28–30, 2026, the camp was designed for youth ages 8–18, split into two groups: ages 8–13 and ages 14–18. Each day began at 7:30 AM and combined on-court skill development with off-court mentorship sessions centered on leadership, discipline, and community responsibility.',
                  version: 1,
                },
              ],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'The name "Bring Back the Village" reflects TFIHF\'s core belief: it takes a community — a village — to raise a child. The camp reconnects that idea, bringing coaches, mentors, parents, and youth together in one space with a shared purpose.',
                  version: 1,
                },
              ],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'The camp featured an accomplished coaching lineup: Mac Amachree (WNBA Legend, Olympian, TFIHF Founder), Peter Ahmedu (FIBA World Cup, National Team Head Coach), Pallas Kuinayi (Olympian, Professional Player), and Nuru Adepoju (Former Professional Player, Twin Falls HS Head Coach).',
                  version: 1,
                },
              ],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: "TFIHF has run camps in Nigeria and across the U.S. for over a decade, but this iteration was particularly significant — bringing world-class coaches who have competed at the Olympic and FIBA World Cup levels directly to youth in rural Idaho. For many of those players, it was the highest level of instruction they had ever received. The foundation's philosophy goes beyond basketball: every session integrates mentorship, peer leadership, and community accountability.",
                  version: 1,
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
    {
      title: 'We Built a Court in Buguma City — Here\'s What That Means',
      slug: 'buguma-court',
      summary:
        'In April and June of 2023, The Future Is Here Foundation completed one of its most significant infrastructure projects to date: the construction and commissioning of a full basketball court at Kalabari National College in Buguma City, Rivers State, Nigeria.',
      publishedDate: '2023-06-01T00:00:00.000Z',
      status: 'published' as const,
      body: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'In April and June of 2023, The Future Is Here Foundation completed one of its most significant infrastructure projects to date: the construction and commissioning of a full basketball court at Kalabari National College in Buguma City, Rivers State, Nigeria. For the students and youth of that community, it wasn\'t just a court — it was a statement.',
                  version: 1,
                },
              ],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'Buguma is the administrative headquarters of Asari-Toru Local Government Area in Rivers State, Nigeria — a city with deep cultural heritage and a large youth population that has historically had limited access to organized sports infrastructure. Kalabari National College is one of the region\'s oldest and most respected secondary schools, carrying generations of academic tradition. Despite its history, the school lacked a proper outdoor court where students could develop their athletic skills.',
                  version: 1,
                },
              ],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'The project delivered a full outdoor basketball court — hardwood-standard playing surface markings, regulation backboards and rims, and a properly laid foundation designed to withstand the regional climate. The court immediately became a hub for student activity, after-school programs, and community pickup games.',
                  version: 1,
                },
              ],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: "The Buguma court represents the evolution of TFIHF's work — from equipment donations to permanent infrastructure. It is the kind of investment that lasts beyond a single camp or event. TFIHF's model is built on the belief that sports infrastructure is community infrastructure. A court gives youth somewhere to go, something to work toward, and a space where mentorship can happen organically — every single day.",
                  version: 1,
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
    {
      title: 'Developing Leaders On and Off the Court: The TFIHF Idaho Camp',
      slug: 'us-camp-idaho',
      summary:
        'When The Future Is Here Foundation brought its youth basketball camp to Jerome, Idaho, it marked a new milestone for the organization — expanding its U.S. programming beyond the Southeast and into a community where world-class athletic instruction isn\'t always easy to come by.',
      publishedDate: '2023-07-01T00:00:00.000Z',
      status: 'published' as const,
      body: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: "When The Future Is Here Foundation brought its youth basketball camp to Jerome, Idaho, it marked a new milestone for the organization — expanding its U.S. programming beyond the Southeast and into a community where world-class athletic instruction isn't always easy to come by. The result was a camp that changed how participants saw themselves, both as athletes and as young leaders.",
                  version: 1,
                },
              ],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'TFIHF founder Mactabene Amachree — a WNBA player, Olympian, and World Cup veteran — built this camp around a simple idea: elite coaching shouldn\'t only be available in major cities or to youth with resources. The Idaho camp was designed to bring the same level of instruction and mentorship that top programs offer anywhere, directly to youth who might otherwise never experience it.',
                  version: 1,
                },
              ],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'The Idaho camp program coincided with a major equipment donation from the Atlanta Hawks — through VP of Corporate Social Responsibility Jon Babul and Quentin Stephens — who donated 55 basketballs, 57 pairs of shoes, 2 ball racks, 2 coolers, a Gatorade rack, and a whistle. The NBA Players Association (NBPA) also recognized TFIHF\'s work, with Top 100 players donating jerseys to the foundation.',
                  version: 1,
                },
              ],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: "Beyond the basketball instruction, the Idaho camp gave participants access to mentors who had competed at the highest levels of the sport — internationally and professionally. TFIHF's Idaho program continues to be a model for how the foundation brings its international standard of youth development to underserved communities in the United States.",
                  version: 1,
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
  ]

  let postCount = 0
  for (const post of posts) {
    await payload.create({ collection: 'posts', data: post })
    postCount++
    console.log(`  Created post: ${post.title}`)
  }

  // =========================================================
  // EVENTS COLLECTION
  // =========================================================
  console.log('Seeding Events collection...')

  const events = [
    {
      name: 'Bring Back the Village — Buguma (Girls Camp & Boys AI)',
      startDate: '2026-10-19T00:00:00.000Z',
      endDate: '2026-10-20T00:00:00.000Z',
      location: 'Buguma, Rivers State, Nigeria',
      registrationLink: '/camp-registration',
      status: 'published' as const,
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'Bring Back the Village — Grassroot Basketball. Elite Camp for ages 9–11 and 12–20. Girls Camp & Boys AI sessions. Buguma City, Rivers State.',
                  version: 1,
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
    {
      name: 'Bring Back the Village — Degema (Formal Dinner)',
      startDate: '2026-10-23T00:00:00.000Z',
      location: 'Degema, Rivers State, Nigeria',
      registrationLink: '/camp-registration',
      status: 'published' as const,
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'Bring Back the Village — Formal Dinner Degema. Grassroot Basketball initiative in Degema, Rivers State.',
                  version: 1,
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
    {
      name: 'Bring Back the Village — Port Harcourt (Invitation Tournament)',
      startDate: '2026-10-24T00:00:00.000Z',
      endDate: '2026-10-25T00:00:00.000Z',
      location: 'Port Harcourt, Rivers State, Nigeria',
      registrationLink: '/camp-registration',
      status: 'published' as const,
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'Bring Back the Village — Invitation Tournament. Port Harcourt, Rivers State. Part of the BBTV Grassroot Basketball series.',
                  version: 1,
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
    {
      name: 'Train the Trainer Program',
      startDate: '2026-10-16T08:00:00.000Z',
      endDate: '2026-10-18T20:00:00.000Z',
      location: 'In Person & Zoom',
      registrationLink: '/camp-registration?event=train-the-trainer',
      status: 'published' as const,
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'A 3-Day Masterclass for Coaches — In Person & Zoom. Topics: Professional Development, Mental Health, Offense, Defense, Game Management. Hosted by The Future Is Here Foundation.',
                  version: 1,
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
  ]

  let eventCount = 0
  for (const event of events) {
    await payload.create({ collection: 'events', data: event })
    eventCount++
    console.log(`  Created event: ${event.name}`)
  }

  // =========================================================
  // BOARD MEMBERS COLLECTION
  // =========================================================
  console.log('Seeding BoardMembers collection...')

  const boardMembers = [
    {
      name: 'Mactabene Amachree',
      title: 'Founder & CEO',
      bio: 'First Nigerian-born woman in the WNBA. Former GM of D\'Tigress. 17-year professional career including Olympic participation. Founded TFIHF to give youth the same life-changing opportunity she received at age 8.',
      order: 1,
    },
    {
      name: 'Julius Isaac Nwosu',
      title: 'Executive Director',
      bio: "NBA Academy Head Coach — Georgia. Brings elite-level coaching expertise to TFIHF's youth development programs across the U.S. and Nigeria.",
      order: 2,
    },
    {
      name: 'David A. Lawyer',
      title: 'Director',
      bio: "Business leader with extensive experience in operations and organizational strategy supporting TFIHF's U.S. programming.",
      order: 3,
    },
    {
      name: 'Faruk Oyalade',
      title: 'Director',
      bio: "Business owner with deep roots in community development and entrepreneurship, guiding TFIHF's expansion strategy.",
      order: 4,
    },
    {
      name: 'Asiki Briggs',
      title: 'Board of Directors',
      bio: 'Community advocate dedicated to empowering youth through structured programming and mentorship in Rivers State and beyond.',
      order: 5,
    },
    {
      name: 'Olawunmi Mary Adebayo',
      title: 'Treasurer',
      bio: "Ensures TFIHF's financial integrity and transparency as a registered 501(c)(3) nonprofit organization.",
      order: 6,
    },
    {
      name: 'Dax Addy',
      title: 'Global Partnership Manager',
      bio: "Manages TFIHF's international relationships and partnerships across Africa and the United States.",
      order: 7,
    },
  ]

  let boardCount = 0
  for (const member of boardMembers) {
    await payload.create({ collection: 'board-members', data: member })
    boardCount++
    console.log(`  Created board member: ${member.name}`)
  }

  // =========================================================
  // STAFF MEMBERS COLLECTION
  // =========================================================
  console.log('Seeding StaffMembers collection...')

  const staffMembers = [
    {
      name: 'Menelik Garrick',
      title: 'Lead of IT',
      bio: "Led the development of TFIHF's digital presence. Background in AI, software engineering, and building tech-driven solutions for nonprofits and businesses.",
      order: 1,
    },
    {
      name: 'Esther Hart',
      title: 'Executive Assistant',
      bio: "Supports TFIHF's leadership operations and day-to-day executive functions, ensuring the foundation runs efficiently in service of its mission.",
      order: 2,
    },
    {
      name: 'Tamunosaki Amieyeofori',
      title: 'Media / IT Specialist',
      bio: "Leads TFIHF's media production and digital communications, capturing the foundation's impact through storytelling, photography, and technology.",
      order: 3,
    },
  ]

  let staffCount = 0
  for (const member of staffMembers) {
    await payload.create({ collection: 'staff-members', data: member })
    staffCount++
    console.log(`  Created staff member: ${member.name}`)
  }

  // =========================================================
  // SUMMARY
  // =========================================================
  console.log('\n--- Seed Complete ---')
  console.log('Homepage global:   seeded')
  console.log('AboutPage global:  seeded')
  console.log('SiteSettings:      seeded')
  console.log(`Posts:             ${postCount} documents`)
  console.log(`Events:            ${eventCount} documents`)
  console.log(`BoardMembers:      ${boardCount} documents`)
  console.log(`StaffMembers:      ${staffCount} documents`)
  console.log('\nNOTE: Projects and Gallery collections were NOT seeded.')
  console.log('      Upload those through the Payload admin UI at /admin.\n')

  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
