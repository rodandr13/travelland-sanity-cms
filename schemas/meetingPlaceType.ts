import {defineField, defineType} from 'sanity'
import {GenerateIcon} from '@sanity/icons'

export const meetingPlaceType = defineType({
  name: 'meetingPlaces',
  type: 'document',
  title: 'Meeting places',
  icon: GenerateIcon,
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
    }),
    defineField({
      name: 'description',
      type: 'internationalizedArrayText',
      title: 'Description',
    }),
    defineField({
      name: 'location',
      type: 'geopoint',
      title: 'Location',
    }),
  ],
})
