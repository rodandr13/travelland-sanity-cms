import {defineField, defineType} from 'sanity'

export const additionalTermsType = defineType({
  name: 'additionalTerms',
  type: 'document',
  title: 'Additional terms',
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
  ],
})
