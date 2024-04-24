import {defineField, defineType} from 'sanity'

export const settingsAppType = defineType({
  name: 'settingsApp',
  title: 'Settings',
  type: 'document',
  __experimental_formPreviewTitle: false,
  fields: [
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
