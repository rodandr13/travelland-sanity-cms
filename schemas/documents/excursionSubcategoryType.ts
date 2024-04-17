import {defineField, defineType} from 'sanity'

export const excursionSubcategoryType = defineType({
  name: 'excursionSubcategory',
  title: 'Excursion subcategory',
  type: 'document',
  __experimental_formPreviewTitle: false,
  preview: {
    select: {
      title: 'title.0.value',
      icon: 'icon',
    },
    prepare: (selection) => {
      const {title, icon} = selection
      console.log(icon)
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
