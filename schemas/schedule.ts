import {defineField, defineType} from 'sanity'

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
  ],
})
