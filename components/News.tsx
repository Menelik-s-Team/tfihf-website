import { getPayload } from 'payload'
import config from '@payload-config'

const FALLBACK_POSTS = [
  {
    date: "May 2026",
    category: "Events",
    title: "Bring Back the Village: Skills & Mentorship Camp Returns",
    excerpt:
      "Three days of elite basketball training and mentorship at the Jerome Recreation Center in Idaho — Olympians, FIBA coaches, and youth from across the region.",
    image: "/images/news-bbtv.webp",
    href: "/news/bring-back-the-village",
  },
  {
    date: "June 2023",
    category: "Infrastructure",
    title: "We Built a Court in Buguma City — Here's What That Means",
    excerpt:
      "The commissioning of the first basketball court at Kalabari National College marks a new chapter for youth sports infrastructure in Rivers State.",
    image: "/images/project-court-buguma.jpg",
    href: "/news/buguma-court",
  },
  {
    date: "2023",
    category: "Programs",
    title: "Developing Leaders On and Off the Court: The TFIHF Idaho Camp",
    excerpt:
      "TFIHF brought elite coaching to Jerome, Idaho alongside a major Atlanta Hawks equipment partnership and NBPA jersey donations.",
    image: "/images/news-camp-us.jpg",
    href: "/news/us-camp-idaho",
  },
]

async function getNewsPosts() {
  const payload = await getPayload({ config })
  return payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    limit: 3,
    sort: '-publishedDate',
  })
}

export default async function News() {
  const result = await getNewsPosts().catch(() => null)
  const cmsPosts = result?.docs

  const posts =
    cmsPosts && cmsPosts.length > 0
      ? cmsPosts.map((p) => ({
          date: p.publishedDate
            ? new Date(p.publishedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
            : '',
          category: 'News',
          title: p.title,
          excerpt: p.summary ?? '',
          image:
            p.coverImage && typeof p.coverImage === 'object' && 'url' in p.coverImage
              ? (p.coverImage.url as string)
              : '/images/news-bbtv.webp',
          href: `/news/${p.slug}`,
        }))
      : FALLBACK_POSTS

  return (
    <section id="news" className="py-24 bg-[#FFF8F0]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#C8102E] text-sm font-bold uppercase tracking-widest">
            Latest Updates
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#0D0D0D] mt-3">
            TFIHF News
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((p) => (
            <article
              key={p.title}
              className="bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-[#C8102E] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="relative overflow-hidden h-52">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#C8102E] text-white text-xs font-bold px-3 py-1 rounded-full">
                  {p.category}
                </span>
              </div>
              <div className="p-6">
                <p className="text-[#0D0D0D]/40 text-xs font-medium mb-2">{p.date}</p>
                <h3 className="text-[#0D0D0D] font-bold text-lg mb-3 leading-snug">
                  {p.title}
                </h3>
                <p className="text-[#0D0D0D]/60 text-sm leading-relaxed">{p.excerpt}</p>
                <a
                  href={p.href}
                  className="inline-block mt-5 text-[#C8102E] text-sm font-bold hover:underline"
                >
                  Read More →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
