import {defineArrayMember, defineField, defineType} from 'sanity'
import {validateInternationalized} from '../../lib/validations'
import {valueInternationalized} from '../../types'
import {MAX_LENGTH_DESCRIPTION, MAX_LENGTH_TITLE} from '../../lib/constans'

export const placeType = defineType({
  name: 'place',
  title: 'Достопримечательность',
  type: 'document',
  __experimental_formPreviewTitle: false,
  preview: {
    select: {
      image: 'gallery.0.asset',
      title: 'title.0.value',
      cityTitle: 'city.title.0.value',
      countryTitle: 'city.country.title.0.value',
    },
    prepare: ({image, title, cityTitle, countryTitle}) => {
      return {
        title: title,
        subtitle: `${countryTitle} / ${cityTitle}`,
        media: image,
      }
    },
  },
  fields: [
    defineField({
      name: 'city',
      type: 'reference',
      title: 'Город',
      validation: (Rule) => Rule.required(),
      to: [{type: 'city'}],
    }),
    defineField({
      name: 'title',
      type: 'internationalizedArrayString',
      title: 'Название',
      validation: (Rule) =>
        Rule.custom((value: valueInternationalized[]) =>
          validateInternationalized(value, MAX_LENGTH_TITLE),
        ),
    }),
    defineField({
      name: 'description',
      type: 'internationalizedArrayText',
      title: 'Описание',
      validation: (Rule) =>
        Rule.custom((value: valueInternationalized[]) =>
          validateInternationalized(value, MAX_LENGTH_DESCRIPTION),
        ),
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      title: 'Галерея',
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
