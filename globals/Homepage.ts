import type { GlobalConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Hero section',
      fields: [
        { name: 'headline', type: 'text', required: true, label: 'Main headline' },
        { name: 'subtext', type: 'textarea', label: 'Subtext below headline' },
        { name: 'ctaPrimaryLabel', type: 'text', label: 'Primary button label' },
        { name: 'ctaPrimaryLink', type: 'text', label: 'Primary button link' },
        { name: 'ctaSecondaryLabel', type: 'text', label: 'Secondary button label' },
        { name: 'ctaSecondaryLink', type: 'text', label: 'Secondary button link' },
        { name: 'backgroundImage', type: 'upload', relationTo: 'media', label: 'Background image' },
        {
          name: 'stats',
          type: 'array',
          label: 'Stat boxes (e.g. 10+ Years)',
          maxRows: 4,
          fields: [
            { name: 'value', type: 'text', required: true, label: 'Value (e.g. 500+)' },
            { name: 'label', type: 'text', required: true, label: 'Label (e.g. Youth)' },
          ],
        },
      ],
    },
    {
      name: 'mission',
      type: 'group',
      label: 'Mission section',
      fields: [
        { name: 'heading', type: 'text', label: 'Section heading' },
        { name: 'body', type: 'richText', editor: lexicalEditor({}), label: 'Body text' },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Side image' },
      ],
    },
    {
      name: 'programs',
      type: 'array',
      label: 'Programs section cards',
      maxRows: 6,
      fields: [
        { name: 'title', type: 'text', required: true, label: 'Program title' },
        { name: 'description', type: 'textarea', label: 'Description' },
        { name: 'icon', type: 'text', label: 'Icon name or emoji' },
      ],
    },
    {
      name: 'impact',
      type: 'array',
      label: 'Impact numbers',
      maxRows: 8,
      fields: [
        { name: 'value', type: 'text', required: true, label: 'Number or value' },
        { name: 'label', type: 'text', required: true, label: 'Label' },
      ],
    },
    {
      name: 'countdownEvent',
      type: 'group',
      label: 'Countdown timer (upcoming event banner)',
      fields: [
        { name: 'eventName', type: 'text', label: 'Event name' },
        { name: 'eventDate', type: 'date', label: 'Event date' },
        { name: 'ctaLabel', type: 'text', label: 'CTA button label' },
        { name: 'ctaLink', type: 'text', label: 'CTA button link' },
        { name: 'showBanner', type: 'checkbox', label: 'Show countdown banner', defaultValue: false },
      ],
    },
  ],
}
