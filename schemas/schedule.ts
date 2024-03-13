import {defineField, defineType, defineArrayMember} from 'sanity'
import {Rule} from 'postcss'

export default defineType({
  name: 'schedule',
  title: 'Schedule',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'dates',
      title: 'Dates',
      type: 'object',
      fields: [
        defineField({
          name: 'dateFrom',
          type: 'date',
          title: 'From',
          options: {
            dateFormat: 'DD/MM/YYYY',
          },
        }),
        defineField({
          name: 'dateTo',
          type: 'date',
          title: 'To',
          options: {
            dateFormat: 'DD/MM/YYYY',
          },
        }),
      ],
      options: {
        columns: 2,
      },
    }),
    defineField({
      name: 'weekdays',
      type: 'weekdaysSelector',
      title: 'Days of the week',
    }),
    defineField({
      name: 'startTime',
      type: 'reference',
      title: 'Time start',
      to: [{type: 'startTime'}],
    }),
    defineField({
      name: 'duration',
      type: 'reference',
      title: 'Duration',
      to: [{type: 'duration'}],
    }),
    defineField({
      name: 'prices',
      type: 'array',
      title: 'Prices',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'price',
          title: 'Price',
          fields: [
            defineField({
              type: 'reference',
              name: 'category',
              title: 'Category',
              to: [{type: 'category'}],
            }),
            defineField({
              type: 'number',
              name: 'price',
            }),
          ],
        }),
      ],
    }),
  ],
})
