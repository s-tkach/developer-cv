import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'

export const Education: CollectionConfig = {
  slug: 'education',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['institution', 'degree', 'startDate', 'endDate'],
    group: 'CV',
    useAsTitle: 'institution',
  },
  defaultSort: '-startDate',
  fields: [
    {
      name: 'institution',
      type: 'text',
      required: true,
    },
    {
      name: 'degree',
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
    },
    {
      name: 'endDate',
      type: 'date',
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
  ],
}
