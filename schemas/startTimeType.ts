import {defineField, defineType} from 'sanity'
import {CircleIcon} from '@sanity/icons'

export const startTimeType = defineType({
  name: 'startTime',
  title: 'Start time',
  type: 'document',
  description: 'Excursion start time',
  icon: CircleIcon,
  __experimental_formPreviewTitle: false,
  preview: {
    select: {
      time: 'time',
    },
    prepare: (selection) => {
      console.log('selection', selection)
      const {time} = selection
      return {
        title: time,
      }
    },
  },
  fields: [
    defineField({
      name: 'time',
      title: 'Time',
      type: 'timeValue',
    }),
  ],
})
