import {defineField, defineType} from 'sanity'
import {CircleIcon} from '@sanity/icons'
import {validateInternationalized} from '../../lib/validations'
import {valueInternationalized} from '../../types'
import {MAX_LENGTH_TITLE} from '../../lib/constans'

export const startTimeType = defineType({
  name: 'startTime',
  title: 'Start time',
  type: 'document',
  description: 'Excursion start time',
  icon: CircleIcon,
  __experimental_formPreviewTitle: false,
  preview: {
    select: {
      time: 'time',
    },
    prepare: (selection) => {
      const {time} = selection
      return {
        title: time,
      }
    },
  },
  fields: [
    defineField({
      name: 'time',
      title: 'Time',
      type: 'timeValue',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
