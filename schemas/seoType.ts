import {defineField, defineType} from 'sanity'

export const seoType = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({name: 'title', type: 'internationalizedArrayString'}),
    defineField({name: 'description', type: 'internationalizedArrayText'}),
  ],
})
