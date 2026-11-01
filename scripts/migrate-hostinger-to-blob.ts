import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'
import { put } from '@vercel/blob'

// Load env vars from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const HOSTINGER_ORIGIN = 'https://lavender-otter-737426.hostingersite.com'
const URLS_FILE = path.resolve(process.cwd(), 'scripts/hostinger-urls.json')
const MANIFEST_FILE = path.resolve(process.cwd(), 'scripts/hostinger-blob-manifest.json')

type ManifestEntry = { original: string; blob: string; bytes: number }

function deriveBlobKey(originalUrl: string): string {
  // Strip the Hostinger origin and leading /wp-content/uploads/
  // e.g. https://lavender-otter-737426.hostingersite.com/wp-content/uploads/2023/02/photo.jpg
  //   -> projects/2023/02/photo.jpg
  const withoutOrigin = originalUrl.replace(HOSTINGER_ORIGIN, '')
  const withoutWpContent = withoutOrigin.replace('/wp-content/uploads/', '')
  return `projects/${withoutWpContent}`
}

async function downloadToBuffer(url: string): Promise<Buffer> {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText}`)
  }
  const arrayBuffer = await res.arrayBuffer()
  return Buffer.from(arrayBuffer)
}

function getMimeType(url: string): string {
  const lower = url.toLowerCase()
  if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return 'image/jpeg'
  if (lower.endsWith('.webp')) return 'image/webp'
  if (lower.endsWith('.png')) return 'image/png'
  if (lower.endsWith('.gif')) return 'image/gif'
  if (lower.endsWith('.mp4')) return 'video/mp4'
  if (lower.endsWith('.mov')) return 'video/quicktime'
  if (lower.endsWith('.webm')) return 'video/webm'
  return 'application/octet-stream'
}

async function main() {
  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (!token) {
    console.error('ERROR: BLOB_READ_WRITE_TOKEN is not set in .env.local')
    process.exit(1)
  }

  const urls: string[] = JSON.parse(fs.readFileSync(URLS_FILE, 'utf-8'))
  console.log(`Found ${urls.length} Hostinger URLs to migrate.\n`)

  const manifest: ManifestEntry[] = []
  const failures: string[] = []
  let totalBytes = 0

  for (let i = 0; i < urls.length; i++) {
    const originalUrl = urls[i]
    const blobKey = deriveBlobKey(originalUrl)
    const mimeType = getMimeType(originalUrl)
    const filename = path.basename(originalUrl)

    process.stdout.write(`[${i + 1}/${urls.length}] ${filename} ... `)

    try {
      const buffer = await downloadToBuffer(originalUrl)
      const bytes = buffer.byteLength

      const result = await put(blobKey, buffer, {
        access: 'public',
        contentType: mimeType,
        token,
      })

      manifest.push({ original: originalUrl, blob: result.url, bytes })
      totalBytes += bytes
      console.log(`OK (${(bytes / 1024).toFixed(1)} KB) -> ${result.url}`)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      console.log(`FAILED: ${message}`)
      failures.push(originalUrl)
    }

    // Small delay to avoid rate-limiting
    await new Promise((r) => setTimeout(r, 100))
  }

  fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2))

  console.log('\n--- MIGRATION SUMMARY ---')
  console.log(`Total URLs found:       ${urls.length}`)
  console.log(`Successfully uploaded:  ${manifest.length}`)
  console.log(`Failed:                 ${failures.length}`)
  console.log(`Total bytes uploaded:   ${(totalBytes / 1024 / 1024).toFixed(2)} MB`)
  console.log(`Manifest written to:    ${MANIFEST_FILE}`)

  if (failures.length > 0) {
    console.log('\nFailed URLs:')
    failures.forEach((u) => console.log('  -', u))
  }
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
