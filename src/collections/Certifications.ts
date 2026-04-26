import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'

export const Certifications: CollectionConfig = {
  slug: 'certifications',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'issuer', 'issuedAt'],
    group: 'CV',
    useAsTitle: 'title',
  },
  defaultSort: '-issuedAt',
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'issuer',
      type: 'text',
      required: true,
    },
    {
      name: 'issuedAt',
      type: 'date',
    },
    {
      name: 'url',
      type: 'text',
    },
  ],
}
