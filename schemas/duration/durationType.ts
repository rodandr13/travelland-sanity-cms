import {defineField, defineType} from 'sanity'

export const durationType = defineType({
  name: 'duration',
  title: 'Duration',
  type: 'document',
  description: 'Duration of the excursion in hours',
  fields: [
    defineField({
      name: 'hours',
      title: 'Hours',
      type: 'number',
    }),
  ],
})
