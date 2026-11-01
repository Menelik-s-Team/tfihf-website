import type { CollectionConfig } from 'payload'
export const BoardMembers: CollectionConfig = {
  slug: 'board-members',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'title', 'order'] },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Full name' },
    { name: 'title', type: 'text', required: true, label: 'Role / title' },
    { name: 'bio', type: 'textarea', label: 'Biography' },
    { name: 'photo', type: 'upload', relationTo: 'media', label: 'Photo' },
    { name: 'order', type: 'number', label: 'Display order', defaultValue: 99 },
  ],
}
