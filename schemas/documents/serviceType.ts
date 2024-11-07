import {defineField, defineType} from 'sanity'
import {validateInternationalized} from '../../lib/validations'
import {valueInternationalized} from '../../types'
import {MAX_LENGTH_DESCRIPTION, MAX_LENGTH_TITLE} from '../../lib/constans'

export const serviceType = defineType({
  name: 'service',
  title: 'Услуги',
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
      name: 'image',
      type: 'image',
      title: 'Фото',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
