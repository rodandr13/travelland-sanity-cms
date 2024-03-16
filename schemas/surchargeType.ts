import {defineField, defineType} from 'sanity'
import {CloseIcon} from '@sanity/icons'

export const surchargeType = defineType({
  name: 'surcharge',
  type: 'document',
  title: 'Surcharge',
  icon: CloseIcon,
  __experimental_formPreviewTitle: false,
  fields: [
    defineField({
      name: 'title',
      type: 'internationalizedArrayString',
      title: 'Title',
    }),
  ],
})
