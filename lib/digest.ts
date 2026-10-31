import { put, head, del } from "@vercel/blob";

const BLOB_KEY = "tfihf-form-digest.json";

export type DigestCounts = {
  campRegistrations: number;
  volunteerApplications: number;
  contactMessages: number;
  lastReset: string;
};

async function readCounts(): Promise<DigestCounts> {
  try {
    const existing = await head(BLOB_KEY).catch(() => null);
    if (!existing) return fresh();
    const res = await fetch(existing.url);
    return await res.json();
  } catch {
    return fresh();
  }
}

function fresh(): DigestCounts {
  return { campRegistrations: 0, volunteerApplications: 0, contactMessages: 0, lastReset: new Date().toISOString() };
}

async function writeCounts(counts: DigestCounts) {
  await put(BLOB_KEY, JSON.stringify(counts), { access: "public", addRandomSuffix: false });
}

export async function incrementCount(type: keyof Omit<DigestCounts, "lastReset">) {
  const counts = await readCounts();
  counts[type] = (counts[type] as number) + 1;
  await writeCounts(counts);
}

export async function getAndResetCounts(): Promise<DigestCounts> {
  const counts = await readCounts();
  await writeCounts(fresh());
  return counts;
}
