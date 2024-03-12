import {defineArrayMember, defineField, defineType} from 'sanity'
import {WeekdaysInput} from '../components/WeekdayPicker'

export default defineType({
  name: 'schedule',
  title: 'Schedule',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
    defineField({
      name: 'daysOfWeek',
      type: 'array',
      title: 'Days',
      description: 'Days of the week for excursions',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'day',
          fields: [
            {
              name: 'name',
              type: 'string',
              title: 'Day',
            },
          ],
        }),
      ],
      components: {
        input: WeekdaysInput,
      },
    }),
    defineField({
      name: 'validityDates',
      title: 'Validity Dates',
      type: 'object',
      fields: [
        {name: 'start', type: 'date', title: 'Start Date'},
        {name: 'end', type: 'date', title: 'End Date'},
      ],
    }),
    defineField({
      name: 'standardSchedule',
      title: 'Standard Schedule',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            {name: 'duration', type: 'string', title: 'Duration'},
            {name: 'startTime', type: 'string', title: 'Start Time'},
            {
              name: 'daysOfWeek',
              title: 'Days of Week',
              type: 'array',
              of: [{type: 'string'}],
            },
            {
              name: 'prices',
              title: 'Prices',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'category', type: 'string', title: 'Category'},
                    {name: 'price', type: 'number', title: 'Price'},
                  ],
                },
              ],
            },
          ],
        }),
      ],
    }),
  ],
})
