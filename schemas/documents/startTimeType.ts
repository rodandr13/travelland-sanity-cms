import {defineField, defineType} from 'sanity'

export const startTimeType = defineType({
  name: 'startTime',
  title: 'Время начала',
  type: 'document',
  description: 'Excursion start time',
  __experimental_formPreviewTitle: false,
  preview: {
    select: {
      time: 'time',
    },
    prepare: (selection) => {
      const {time} = selection
      return {
        title: time,
      }
    },
  },
  fields: [
    defineField({
      name: 'time',
      title: 'Время',
      type: 'timeValue',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
