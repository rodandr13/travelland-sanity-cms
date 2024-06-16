import {defineField, defineType} from 'sanity'

export const duration = defineType({
  name: 'duration',
  title: 'Duration',
  type: 'object',
  initialValue: {
    days: 0,
    hours: 0,
    minutes: 0,
  },
  fields: [
    defineField({
      name: 'days',
      title: 'Days',
      type: 'number',
      options: {
        list: Array.from({length: 11}, (_, i) => i),
      },
    }),
    defineField({
      name: 'hours',
      title: 'Hours',
      type: 'number',
      options: {
        list: Array.from({length: 25}, (_, i) => i),
      },
    }),
    defineField({
      name: 'minutes',
      title: 'Minutes',
      type: 'number',
      options: {
        list: [0, 30, 60],
      },
    }),
  ],
})
