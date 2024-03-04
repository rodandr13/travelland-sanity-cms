import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'meetingPlaces',
  type: 'document',
  title: 'Meeting places',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
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
