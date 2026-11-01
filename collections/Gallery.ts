import type { CollectionConfig } from 'payload'
export const Gallery: CollectionConfig = {
  slug: 'gallery',
  upload: true,
  admin: { useAsTitle: 'caption', defaultColumns: ['filename', 'caption', 'year'] },
  fields: [
    { name: 'caption', type: 'text', label: 'Caption' },
    { name: 'alt', type: 'text', required: true, label: 'Alt text' },
    { name: 'year', type: 'number', label: 'Year' },
  ],
}
