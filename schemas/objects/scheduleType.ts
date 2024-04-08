import {defineField, defineType, defineArrayMember} from 'sanity'
import {ThListIcon, UserIcon} from '@sanity/icons'

export const scheduleType = defineType({
  name: 'schedule',
  title: 'Schedule',
  type: 'object',
  icon: ThListIcon,
  fields: [
    defineField({
      name: 'title',
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
      name: 'prices',
      type: 'array',
      title: 'Prices',
      of: [
        defineArrayMember({
          type: 'price',
        }),
      ],
    }),
  ],
})
