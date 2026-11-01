import { NotFoundPage } from '@payloadcms/next/views'
import { importMap } from '../importMap.js'

// Use dynamic import for the same reason as page.tsx:
// On Vercel (Node 24), webpack wraps ESM packages in async module containers.
// A static `import config` at module level can be undefined when Next.js
// invokes this component synchronously (e.g. after a notFound() call).
const config = import('@payload-config').then((m) => m.default)

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export default function NotFound({ params, searchParams }: Args) {
  return NotFoundPage({ config, importMap, params, searchParams })
}
