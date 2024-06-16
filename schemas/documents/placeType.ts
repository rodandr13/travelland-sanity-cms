import {defineArrayMember, defineField, defineType} from 'sanity'
import {validateInternationalized} from '../../lib/validations'
import {valueInternationalized} from '../../types'
import {MAX_LENGTH_DESCRIPTION, MAX_LENGTH_TITLE} from '../../lib/constans'

export const placeType = defineType({
  name: 'place',
  title: 'Place',
  type: 'document',
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
      name: 'city',
      type: 'reference',
      title: 'City',
      validation: (Rule) => Rule.required(),
      to: [{type: 'city'}],
    }),
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
      name: 'description',
      type: 'internationalizedArrayText',
      title: 'Description',
      validation: (Rule) =>
        Rule.custom((value: valueInternationalized[]) =>
          validateInternationalized(value, MAX_LENGTH_DESCRIPTION),
        ),
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      title: 'Gallery',
      validation: (Rule) => Rule.required(),
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
