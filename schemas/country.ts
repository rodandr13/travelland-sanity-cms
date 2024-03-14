import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'country',
  type: 'document',
  title: 'Country',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
  ],
})
