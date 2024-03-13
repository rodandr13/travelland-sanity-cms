import {defineField, defineType} from 'sanity'

export const startTimeType = defineType({
  name: 'startTime',
  title: 'Start time',
  type: 'document',
  description: 'Excursion start time',
  fields: [
    defineField({
      name: 'Time',
      type: 'timeValue',
    }),
  ],
})
