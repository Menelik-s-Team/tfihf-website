import type { GlobalConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'About page',
  fields: [
    { name: 'founderStory', type: 'richText', editor: lexicalEditor({}), label: 'Founder story' },
    { name: 'missionStatement', type: 'textarea', label: 'Mission statement' },
    { name: 'visionStatement', type: 'textarea', label: 'Vision statement' },
    {
      name: 'pillars',
      type: 'array',
      label: 'Foundation pillars',
      maxRows: 6,
      fields: [
        { name: 'title', type: 'text', required: true, label: 'Pillar title' },
        { name: 'description', type: 'textarea', label: 'Description' },
      ],
    },
    {
      name: 'reach',
      type: 'array',
      label: '"Our Reach" cards',
      maxRows: 6,
      fields: [
        { name: 'title', type: 'text', required: true, label: 'Title' },
        { name: 'value', type: 'text', required: true, label: 'Value/stat' },
        { name: 'description', type: 'textarea', label: 'Description' },
      ],
    },
  ],
}
