import {defineField, defineType} from 'sanity'

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
      name: 'options',
      title: 'Options',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'media',
      title: 'Media',
    },
    {
      name: 'schedule',
      title: 'Schedule',
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
      name: 'city',
      type: 'reference',
      title: 'Excursion starting city',
      to: [{type: 'city'}],
      group: 'options',
    }),
    defineField({
      name: 'whatsIncluded',
      type: 'array',
      title: 'Whats included',
      of: [{type: 'reference', to: [{type: 'whatsIncluded'}]}],
      group: 'options',
    }),
    defineField({
      name: 'surcharges',
      type: 'array',
      title: 'Surcharges',
      of: [{type: 'reference', to: [{type: 'surcharges'}]}],
      group: 'options',
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
      group: 'options',
      to: [{type: 'meetingPlaces'}],
    }),
    defineField({
      name: 'schedule',
      type: 'reference',
      title: 'Schedule',
      group: 'schedule',
      to: [{type: 'schedule'}],
    }),
  ],
})
