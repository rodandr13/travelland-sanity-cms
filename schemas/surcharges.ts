import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'surcharges',
  type: 'document',
  title: 'Surcharges',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
  ],
})
