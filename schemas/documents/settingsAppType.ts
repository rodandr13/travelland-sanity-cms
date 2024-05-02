import {defineField, defineType} from 'sanity'

export const settingsAppType = defineType({
  name: 'settingsApp',
  title: 'Settings',
  type: 'document',
  __experimental_formPreviewTitle: false,
  preview: {
    prepare: () => {
      return {
        title: 'Settings',
      }
    },
  },
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
