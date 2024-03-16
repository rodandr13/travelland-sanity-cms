import {defineField, defineType} from 'sanity'
import {CheckmarkIcon} from '@sanity/icons'

export const includedType = defineType({
  name: 'included',
  type: 'document',
  title: 'Whats included',
  icon: CheckmarkIcon,
  __experimental_formPreviewTitle: false,
  preview: {
    select: {
      title: 'title.0.value',
    },
    prepare: (selection) => {
      const {title} = selection
      return {
        title: title,
      }
    },
  },
  fields: [
    defineField({
      name: 'title',
      type: 'internationalizedArrayString',
      title: 'Title',
    }),
  ],
})
