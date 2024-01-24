import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'excursion',
  type: 'document',
  title: 'Excursion',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
    defineField({
      name: 'slug',
      type: 'string',
      title: 'Slug',
    }),
  ],
})
