import { getPayload } from 'payload'
import config from '@payload-config'
import Projects from './Projects'

type MediaItem = { type: "image" | "video"; url: string }

async function getProjects() {
  const payload = await getPayload({ config })
  return payload.find({ collection: 'projects', limit: 100, sort: '-year' })
}

export default async function ProjectsWrapper() {
  const result = await getProjects().catch(() => null)
  const cmsDocs = result?.docs

  if (!cmsDocs || cmsDocs.length === 0) {
    // Pass no projects — Projects component will use HARDCODED_PROJECTS as fallback
    return <Projects />
  }

  const cmsProjects = cmsDocs.map((p) => {
    const cover =
      p.coverImage && typeof p.coverImage === 'object' && 'url' in p.coverImage
        ? (p.coverImage.url as string)
        : '/images/project-bbtv-2025.webp'

    const media: MediaItem[] = (p.mediaItems ?? []).map((item) => {
      const file = item.file
      const url =
        file && typeof file === 'object' && 'url' in file ? (file.url as string) : ''
      const type: "image" | "video" = item.type === 'video' ? 'video' : 'image'
      return { type, url }
    }).filter((m) => m.url)

    return {
      year: String(p.year),
      tag: 'Project',
      title: p.title,
      location: p.location ?? '',
      description: p.description ?? '',
      cover,
      media,
    }
  })

  return <Projects projects={cmsProjects} />
}
