import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'city',
  type: 'document',
  title: 'City',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'country',
      type: 'reference',
      title: 'Country',
      to: [{type: 'country'}],
    }),
  ],
})
