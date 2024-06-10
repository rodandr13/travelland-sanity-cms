import {defineField, defineType} from 'sanity'
import {ClockIcon} from '@sanity/icons'

export const durationType = defineType({
  name: 'duration',
  title: 'Duration',
  type: 'document',
  icon: ClockIcon,
  description: 'Duration of the excursion in hours',
  __experimental_formPreviewTitle: false,
  preview: {
    select: {
      hours: 'hours',
    },
    prepare: (selection) => {
      const {hours} = selection
      return {
        title: `${hours} hours`,
      }
    },
  },
  fields: [
    defineField({
      name: 'hours',
      title: 'Hours',
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
