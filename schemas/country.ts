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
  ],
})
