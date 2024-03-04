import {defineField, defineType} from 'sanity'
import meetingPlaces from './meetingPlaces'

export default defineType({
  name: 'excursion',
  type: 'document',
  title: 'Excursion',
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'media',
      title: 'Media',
    },
  ],
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      group: 'content',
    }),
    defineField({
      name: 'slug',
      type: 'string',
      title: 'Slug',
      group: 'content',
    }),
    defineField({
      name: 'description',
      type: 'array',
      title: 'Description',
      group: 'content',
      of: [
        {
          type: 'block',
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
        },
      ],
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      title: 'Gallery',
      group: 'media',
      of: [
        {
          type: 'image',
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
            {
              name: 'attribution',
              type: 'string',
              title: 'Attribution',
            },
          ],
          options: {
            hotspot: true,
          },
        },
      ],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'seoTitle',
      type: 'string',
      title: 'Title',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      type: 'text',
      title: 'Description',
      group: 'seo',
    }),
    defineField({
      name: 'meetingPoint',
      type: 'reference',
      title: 'Meeting Point',
      group: 'content',
      to: [{type: 'meetingPlaces'}],
    }),
  ],
})
