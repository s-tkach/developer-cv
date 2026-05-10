import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['role', 'company', 'startDate', 'endDate'],
    group: 'CV',
    useAsTitle: 'role',
  },
  defaultSort: '-startDate',
  fields: [
    {
      name: 'company',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      localized: true,
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
    },
    {
      name: 'endDate',
      type: 'date',
    },
    {
      name: 'isCurrent',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'summary',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'highlights',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'technologies',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'type',
      type: 'select',
      defaultValue: 'engineering',
      admin: { position: 'sidebar' },
      options: ['engineering', 'leadership', 'education', 'certification', 'other'].map((v) => ({
        label: v[0].toUpperCase() + v.slice(1),
        value: v,
      })),
    },
  ],
}
