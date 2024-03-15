import {defineField, defineType} from 'sanity'
import {CloseIcon} from '@sanity/icons'

export const surchargeType = defineType({
  name: 'surcharge',
  type: 'document',
  title: 'Surcharge',
  icon: CloseIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
  ],
})
