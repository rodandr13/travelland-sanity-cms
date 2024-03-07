import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'whatsIncluded',
  type: 'document',
  title: 'Whats included',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
  ],
})
