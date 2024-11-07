import {defineField, defineType} from 'sanity'

export const seoType = defineType({
  name: 'seo',
  title: 'СЕО',
  type: 'object',
  fields: [
    defineField({name: 'title', type: 'string', title: 'Заголовок'}),
    defineField({name: 'description', type: 'text', title: 'Описание'}),
  ],
})
