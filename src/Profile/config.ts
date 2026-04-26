import type { GlobalConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'

export const Profile: GlobalConfig = {
  slug: 'profile',
  access: {
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'CV',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      defaultValue: 'Your Name',
      required: true,
    },
    {
      name: 'headline',
      type: 'text',
      localized: true,
      defaultValue: 'Full-stack developer',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      localized: true,
    },
    {
      name: 'summary',
      type: 'textarea',
      localized: true,
      required: true,
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'links',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
