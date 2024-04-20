import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons'
import {valueInternationalized} from '../../types'
import {validateInternationalized} from '../../lib/validations'
import {MAX_LENGTH_DESCRIPTION, MAX_LENGTH_TITLE} from '../../lib/constans'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: UserIcon,
  __experimental_formPreviewTitle: false,
  preview: {
    select: {
      title: 'title.0.value',
      description: 'description.0.value',
    },
    prepare: (selection) => {
      const {title, description} = selection
      return {
        title: title,
        subtitle: description,
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
      name: 'description',
      type: 'internationalizedArrayString',
      title: 'Description',
      validation: (Rule) =>
        Rule.custom((value: valueInternationalized[]) =>
          validateInternationalized(value, MAX_LENGTH_DESCRIPTION),
        ),
    }),
  ],
})
