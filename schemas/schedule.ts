import {defineType} from 'sanity'

export default defineType({
  name: 'schedule',
  title: 'Schedule',
  type: 'document',
  fields: [
    {
      name: 'validityDates',
      title: 'Validity Dates',
      type: 'object',
      fields: [
        {name: 'start', type: 'date', title: 'Start Date'},
        {name: 'end', type: 'date', title: 'End Date'},
      ],
    },
    {
      name: 'standardSchedule',
      title: 'Standard Schedule',
      type: 'array',
      of: [
        {
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
        },
      ],
    },
  ],
})
