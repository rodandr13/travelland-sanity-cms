import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: UserIcon,
  __experimental_formPreviewTitle: false,
  preview: {
    select: {
      title: 'title.0.value',
      description: 'description.0.value',
    },
    prepare: (selection) => {
      const {title, description} = selection
      return {
        title: title,
        subtitle: description,
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
      name: 'description',
      type: 'internationalizedArrayString',
      title: 'Description',
    }),
  ],
})
