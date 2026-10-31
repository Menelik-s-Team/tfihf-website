export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";

const BLOB_BASE = "https://ln5wwuuddrhxq6vd.private.blob.vercel-storage.com/testimonials/";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return NextResponse.json({ error: "No token" }, { status: 500 });

  const { filename } = await params;
  const blobUrl = BLOB_BASE + encodeURIComponent(filename);
  const range = req.headers.get("range");

  const upstream = await fetch(blobUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      ...(range ? { Range: range } : {}),
    },
  });

  const resHeaders: Record<string, string> = {
    "Content-Type": "video/mp4",
    "Accept-Ranges": "bytes",
    "Cache-Control": "public, max-age=86400",
  };
  for (const h of ["content-length", "content-range"]) {
    const v = upstream.headers.get(h);
    if (v) resHeaders[h] = v;
  }

  return new Response(upstream.body, { status: upstream.status, headers: resHeaders });
}
