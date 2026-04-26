import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'

export const Skills: CollectionConfig = {
  slug: 'skills',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['category', 'sortOrder'],
    group: 'CV',
    useAsTitle: 'category',
  },
  defaultSort: 'sortOrder',
  fields: [
    {
      name: 'category',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'level',
          type: 'select',
          options: [
            {
              label: 'Core',
              value: 'core',
            },
            {
              label: 'Advanced',
              value: 'advanced',
            },
            {
              label: 'Familiar',
              value: 'familiar',
            },
          ],
        },
      ],
    },
  ],
}
