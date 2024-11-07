import {defineField, defineType} from 'sanity'
import {valueInternationalized} from '../../types'
import {validateInternationalized} from '../../lib/validations'
import {MAX_LENGTH_DESCRIPTION, MAX_LENGTH_TITLE} from '../../lib/constans'

export const meetingPlaceType = defineType({
  name: 'meetingPlaces',
  type: 'document',
  title: 'Место начала экскурсии',
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
      title: 'Название',
      validation: (Rule) =>
        Rule.custom((value: valueInternationalized[]) =>
          validateInternationalized(value, MAX_LENGTH_TITLE),
        ),
    }),
    defineField({
      name: 'city',
      type: 'reference',
      title: 'Город',
      validation: (Rule) => Rule.required(),
      to: [{type: 'city'}],
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
      name: 'image',
      type: 'image',
      title: 'Фото',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      type: 'geopoint',
      title: 'Геолокация',
    }),
  ],
})
