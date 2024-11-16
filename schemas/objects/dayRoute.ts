import {defineField, defineType} from 'sanity'

export const dayRoute = defineType({
  name: 'dayRoute',
  title: 'День маршрута',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Название',
      type: 'internationalizedArrayString',
    }),
  ],
})
