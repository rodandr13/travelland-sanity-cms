import {defineField, defineType} from 'sanity'
import {valueInternationalized} from '../../types'
import {validateInternationalized} from '../../lib/validations'
import {MAX_LENGTH_TITLE} from '../../lib/constans'

export const parametersType = defineType({
  name: 'excursionParameters',
  title: 'Parameters',
  type: 'document',
  __experimental_formPreviewTitle: false,
  preview: {
    select: {
      title: 'title.0.value',
      icon: 'icon',
    },
    prepare: (selection) => {
      const {title, icon} = selection
      console.log(icon)
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
      name: 'value',
      type: 'internationalizedArrayString',
      title: 'Value',
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
  ],
})
