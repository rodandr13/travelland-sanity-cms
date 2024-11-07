import {defineField, defineType} from 'sanity'

export const settingsAppType = defineType({
  name: 'settingsApp',
  title: 'Настройки',
  type: 'document',
  __experimental_formPreviewTitle: false,
  preview: {
    prepare: () => {
      return {
        title: 'Настройки',
      }
    },
  },
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Заголовок на главной',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'heroImage',
      title: 'Фото для главной',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'languageIcon',
      title: 'Иконка для языка',
      type: 'image',
    }),
  ],
})
