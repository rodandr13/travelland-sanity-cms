import {defineField, defineType} from 'sanity'
import {GenerateIcon} from '@sanity/icons'

export const meetingPlaceType = defineType({
  name: 'meetingPlaces',
  type: 'document',
  title: 'Meeting places',
  icon: GenerateIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
    }),
    defineField({
      name: 'location',
      type: 'geopoint',
      title: 'Location',
    }),
  ],
})
