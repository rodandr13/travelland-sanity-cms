import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'country',
  type: 'document',
  title: 'Country',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
    defineField({
      name: 'cities',
      type: 'array',
      title: 'Cities',
      of: [{type: 'reference', to: [{type: 'city'}]}],
    }),
  ],
})
