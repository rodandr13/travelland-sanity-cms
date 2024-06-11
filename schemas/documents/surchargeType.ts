import {defineField, defineType} from 'sanity'
import {validateInternationalized} from '../../lib/validations'
import {valueInternationalized} from '../../types'
import {MAX_LENGTH_TITLE} from '../../lib/constans'

export const surchargeType = defineType({
  name: 'surcharge',
  type: 'document',
  title: 'Surcharge',
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
      title: 'Title',
      validation: (Rule) =>
        Rule.custom((value: valueInternationalized[]) => validateInternationalized(value, MAX_LENGTH_TITLE)),
    }),
  ],
})
