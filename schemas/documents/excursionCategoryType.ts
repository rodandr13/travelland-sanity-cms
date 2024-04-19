import {defineField, defineType} from 'sanity'

export const excursionCategoryType = defineType({
  name: 'excursionCategory',
  title: 'Excursion category',
  type: 'document',
  __experimental_formPreviewTitle: false,
  preview: {
    select: {
      title: 'title.0.value',
      icon: 'icon',
    },
    prepare: (selection) => {
      const {title, icon} = selection
      return {
        title: title,
        media: icon,
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
    }),
  ],
})
