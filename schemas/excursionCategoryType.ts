import {defineField, defineType} from 'sanity'

export const excursionCategoryType = defineType({
  name: 'excursionCategory',
  title: 'Excursion category',
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
