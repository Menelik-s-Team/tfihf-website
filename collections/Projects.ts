import type { CollectionConfig } from 'payload'
export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'year', 'location'] },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Project title' },
    { name: 'year', type: 'number', required: true, label: 'Year' },
    { name: 'location', type: 'text', label: 'Location' },
    { name: 'description', type: 'textarea', label: 'Short description' },
    { name: 'coverImage', type: 'upload', relationTo: 'media', label: 'Cover image' },
    {
      name: 'mediaItems',
      type: 'array',
      label: 'Gallery media (photos and videos)',
      fields: [
        { name: 'file', type: 'upload', relationTo: 'media', required: true, label: 'File' },
        { name: 'caption', type: 'text', label: 'Caption' },
        { name: 'type', type: 'select', options: [{ label: 'Photo', value: 'photo' }, { label: 'Video', value: 'video' }], required: true },
      ],
    },
  ],
}
