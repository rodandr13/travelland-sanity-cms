import {defineArrayMember, defineType} from 'sanity'

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const weekdaysSelectorType = defineType({
  name: 'weekdaysSelector',
  title: 'Дни недели',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'string',
    }),
  ],
  options: {
    layout: 'grid',
    list: daysOfWeek,
  },
})
