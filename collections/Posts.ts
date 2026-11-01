import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'status', 'publishedDate'] },
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Title' },
    { name: 'slug', type: 'text', required: true, unique: true, label: 'URL slug (e.g. bring-back-the-village)' },
    { name: 'summary', type: 'textarea', label: 'Short summary (shown in news list)' },
    { name: 'coverImage', type: 'upload', relationTo: 'media', label: 'Cover image' },
    { name: 'body', type: 'richText', editor: lexicalEditor({}), label: 'Article body' },
    { name: 'publishedDate', type: 'date', label: 'Published date', admin: { date: { pickerAppearance: 'dayOnly' } } },
    { name: 'status', type: 'select', options: [{ label: 'Draft', value: 'draft' }, { label: 'Published', value: 'published' }], defaultValue: 'draft', required: true },
  ],
}
