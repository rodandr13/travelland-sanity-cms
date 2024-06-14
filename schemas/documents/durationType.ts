import {defineField, defineType} from 'sanity'
import {ClockIcon} from '@sanity/icons'

export const durationType = defineType({
  name: 'duration',
  title: 'Duration',
  type: 'document',
  icon: ClockIcon,
  __experimental_formPreviewTitle: false,
  preview: {
    select: {
      duration: 'duration',
    },
    prepare: (selection) => {
      const {duration} = selection
      const hours = Math.floor(duration / 60)
      const minutes = duration % 60
      return {
        title: `${hours} hours ${minutes} minutes`,
      }
    },
  },
  fields: [
    defineField({
      name: 'duration',
      title: 'Duration',
      description: 'Указывается в минутах',
      type: 'number',
      validation: (Rule) =>
        Rule.custom(async (value, {document, getClient}) => {
          if (typeof value === 'undefined') return true
          const client = getClient({apiVersion: '2023-01-01'})
          const id = document?._id
          const existingDocuments = await client.fetch(
            `*[_type == "duration" && hours == $value && _id != $id]`,
            {value, id},
          )
          if (existingDocuments.length > 0) {
            return 'Значение должно быть уникальным'
          }

          return true
        }).required(),
    }),
  ],
})
