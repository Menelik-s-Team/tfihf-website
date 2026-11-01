import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
export const Events: CollectionConfig = {
  slug: 'events',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'startDate', 'location', 'status'] },
  versions: { drafts: true },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Event name' },
    { name: 'startDate', type: 'date', required: true, label: 'Start date' },
    { name: 'endDate', type: 'date', label: 'End date (optional)' },
    { name: 'location', type: 'text', label: 'Location' },
    { name: 'description', type: 'richText', editor: lexicalEditor({}), label: 'Description' },
    { name: 'flyerImage', type: 'upload', relationTo: 'media', label: 'Flyer image' },
    { name: 'registrationLink', type: 'text', label: 'Registration link or route (e.g. /camp-registration)' },
    { name: 'status', type: 'select', options: [{ label: 'Draft', value: 'draft' }, { label: 'Published', value: 'published' }], defaultValue: 'draft', required: true },
  ],
}
