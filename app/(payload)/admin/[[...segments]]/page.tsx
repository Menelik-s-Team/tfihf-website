import type { Metadata } from 'next'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap.js'

// Resolve config as a Promise so generatePageMetadata and RootPage can await it.
// On Vercel (Node 24), webpack may wrap ESM packages in async module containers.
// Passing a static `import config from '@payload-config'` reference when the
// module hasn't resolved yet causes a TypeError on cold starts:
//   "Cannot destructure property 'config' of '$(...)' as it is undefined"
// Both generatePageMetadata and RootPage accept config as Promise<SanitizedConfig>.
const config = import('@payload-config').then((m) => m.default)

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export const generateMetadata = async ({ params, searchParams }: Args): Promise<Metadata> => {
  try {
    return await generatePageMetadata({ config, params, searchParams })
  } catch {
    return {}
  }
}

export default function Page({ params, searchParams }: Args) {
  return RootPage({ config, importMap, params, searchParams })
}
