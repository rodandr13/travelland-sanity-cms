import {defineField, defineType} from 'sanity'
import {CloseIcon} from '@sanity/icons'

export const surchargeType = defineType({
  name: 'surcharge',
  type: 'document',
  title: 'Surcharge',
  icon: CloseIcon,
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
