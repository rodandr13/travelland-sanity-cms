import {defineArrayMember, defineField, defineType} from 'sanity'
import {valueInternationalized} from '../../types'
import {validateInternationalized} from '../../lib/validations'
import {MAX_LENGTH_TITLE} from '../../lib/constans'

export const cityType = defineType({
  name: 'city',
  type: 'document',
  title: 'City',
  __experimental_formPreviewTitle: false,
  preview: {
    select: {
      image: 'gallery.0.asset',
      title: 'title.0.value',
    },
    prepare: ({image, title}) => {
      return {
        title: title,
        media: image,
      }
    },
  },
  fields: [
    defineField({
      name: 'title',
      type: 'internationalizedArrayString',
      title: 'Title',
      validation: (Rule) =>
        Rule.custom((value: valueInternationalized[]) =>
          validateInternationalized(value, MAX_LENGTH_TITLE),
        ),
    }),
    defineField({
      name: 'country',
      type: 'reference',
      title: 'Country',
      to: [{type: 'country'}],
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      title: 'Gallery',
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
      options: {
        layout: 'grid',
      },
    }),
  ],
})
