import {defineField, defineType} from 'sanity'
import {CloseIcon} from '@sanity/icons'

export const surchargeType = defineType({
  name: 'surcharges',
  type: 'document',
  title: 'Surcharges',
  icon: CloseIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
  ],
})
