import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'city',
  type: 'document',
  title: 'City',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
    defineField({
      name: 'country',
      type: 'reference',
      title: 'Country',
      to: [{type: 'country'}],
    }),
  ],
})
