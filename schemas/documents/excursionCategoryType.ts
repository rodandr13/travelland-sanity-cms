import {defineField, defineType} from 'sanity'
import {valueInternationalized} from '../../types'
import {validateInternationalized} from '../../lib/validations'
import {MAX_LENGTH_TITLE} from '../../lib/constans'

export const excursionCategoryType = defineType({
  name: 'excursionCategory',
  title: 'Excursion category',
  type: 'document',
  __experimental_formPreviewTitle: false,
  preview: {
    select: {
      title: 'title.0.value',
      icon: 'icon',
    },
    prepare: (selection) => {
      const {title, icon} = selection
      return {
        title: title,
        media: icon,
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
      name: 'icon',
      type: 'image',
      title: 'Icon',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'key',
      title: 'Key',
      type: 'string',
      description: 'Поле для разработчиков',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
