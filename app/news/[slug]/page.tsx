import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import FooterCMS from '@/components/FooterCMS'

function renderRichText(content: unknown): string {
  if (!content || typeof content !== 'object') return ''
  const root = (content as { root?: { children?: unknown[] } }).root
  if (!root?.children) return ''
  return root.children
    .map((node: unknown) => {
      const n = node as { type?: string; children?: { text?: string; format?: number }[] }
      if (n.type === 'paragraph') {
        const text = n.children
          ?.map((c) => {
            const t = c.text || ''
            if (c.format && c.format & 1) return `<strong>${t}</strong>`
            if (c.format && c.format & 2) return `<em>${t}</em>`
            return t
          })
          .join('') || ''
        return `<p>${text}</p>`
      }
      return ''
    })
    .join('')
}

export default async function NewsPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    limit: 1,
  })
  if (!docs[0]) notFound()
  const post = docs[0]

  const coverUrl =
    post.coverImage && typeof post.coverImage === 'object' && 'url' in post.coverImage
      ? (post.coverImage.url as string)
      : null

  const bodyHtml = post.body ? renderRichText(post.body) : ''

  const publishedDate = post.publishedDate
    ? new Date(post.publishedDate).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : ''

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[#F5F0EB]">
        <article className="max-w-3xl mx-auto px-6 py-16">
          {coverUrl && (
            <div className="rounded-2xl overflow-hidden mb-8 h-64 md:h-96">
              <img src={coverUrl} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}
          {publishedDate && (
            <p className="text-[#0D0D0D]/40 text-sm mb-3">{publishedDate}</p>
          )}
          <h1 className="text-3xl md:text-5xl font-black text-[#0D0D0D] mb-6 leading-tight">
            {post.title}
          </h1>
          {post.summary && (
            <p className="text-[#0D0D0D]/70 text-lg leading-relaxed mb-8 border-l-4 border-[#C8102E] pl-5">
              {post.summary}
            </p>
          )}
          {bodyHtml && (
            <div
              className="prose prose-lg max-w-none text-[#0D0D0D]/80 leading-relaxed [&_p]:mb-5"
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />
          )}
          <div className="mt-12 pt-8 border-t border-[#0D0D0D]/10">
            <a href="/news" className="text-[#C8102E] font-bold hover:underline">
              ← Back to News
            </a>
          </div>
        </article>
      </main>
      <FooterCMS />
    </>
  )
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'posts',
      where: { status: { equals: 'published' } },
      limit: 100,
    })
    return docs.map((p) => ({ slug: p.slug }))
  } catch {
    return []
  }
}
