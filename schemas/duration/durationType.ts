import {defineField, defineType} from 'sanity'
import {ClockIcon} from '@sanity/icons'

export const durationType = defineType({
  name: 'duration',
  title: 'Duration',
  type: 'document',
  icon: ClockIcon,
  description: 'Duration of the excursion in hours',
  __experimental_formPreviewTitle: false,
  fields: [
    defineField({
      name: 'hours',
      title: 'Hours',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      hours: 'hours',
    },
    prepare: (selection) => {
      console.log('selection', selection)
      const {hours} = selection
      return {
        title: `${hours} hours`,
      }
    },
  },
})
