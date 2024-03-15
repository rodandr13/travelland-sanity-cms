import {defineField, defineType} from 'sanity'
import {CheckmarkIcon} from '@sanity/icons'

export const includedType = defineType({
  name: 'included',
  type: 'document',
  title: 'Whats included',
  icon: CheckmarkIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
  ],
})
