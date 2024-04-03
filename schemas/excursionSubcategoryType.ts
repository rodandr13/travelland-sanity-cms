import {defineField, defineType} from 'sanity'

export const excursionSubcategoryType = defineType({
  name: 'excursionSubcategory',
  title: 'Excursion subcategory',
  type: 'document',
  __experimental_formPreviewTitle: false,
  preview: {
    select: {
      title: 'title.0.value',
    },
    prepare: (selection) => {
      const {title} = selection
      return {
        title: title,
      }
    },
  },
  fields: [
    defineField({
      name: 'title',
      type: 'internationalizedArrayString',
      title: 'Title',
    }),
    defineField({
      name: 'icon',
      type: 'image',
      title: 'Icon',
      options: {
        hotspot: true,
      },
    }),
  ],
})
