import type { GlobalConfig } from 'payload'
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site settings',
  fields: [
    {
      name: 'contact',
      type: 'group',
      label: 'Contact information',
      fields: [
        { name: 'address', type: 'text', label: 'Street address' },
        { name: 'city', type: 'text', label: 'City, state, zip' },
        { name: 'phone', type: 'text', label: 'Phone number' },
        { name: 'email', type: 'email', label: 'Email address' },
      ],
    },
    {
      name: 'social',
      type: 'group',
      label: 'Social media handles',
      fields: [
        { name: 'twitter', type: 'text', label: 'Twitter/X handle (without @)' },
        { name: 'instagram', type: 'text', label: 'Instagram handle (without @)' },
        { name: 'facebook', type: 'text', label: 'Facebook URL or handle' },
        { name: 'youtube', type: 'text', label: 'YouTube URL or handle' },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      label: 'Footer',
      fields: [
        { name: 'ein', type: 'text', label: 'EIN number' },
        { name: 'footerTagline', type: 'text', label: 'Footer tagline' },
        { name: 'copyrightText', type: 'text', label: 'Copyright text' },
      ],
    },
    {
      name: 'donation',
      type: 'group',
      label: 'Donation page',
      fields: [
        { name: 'heading', type: 'text', label: 'Page heading' },
        { name: 'subtext', type: 'textarea', label: 'Introductory text' },
        {
          name: 'presetAmounts',
          type: 'array',
          label: 'Preset donation amounts (USD)',
          maxRows: 8,
          fields: [{ name: 'amount', type: 'number', required: true, label: 'Amount' }],
        },
      ],
    },
  ],
}
