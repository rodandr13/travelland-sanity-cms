import {defineField, defineType} from 'sanity'
import {CheckmarkIcon} from '@sanity/icons'

export const includedType = defineType({
  name: 'included',
  type: 'document',
  title: 'Whats included',
  icon: CheckmarkIcon,
  __experimental_formPreviewTitle: false,
  fields: [
    defineField({
      name: 'title',
      type: 'internationalizedArrayString',
      title: 'Title',
    }),
  ],
})
