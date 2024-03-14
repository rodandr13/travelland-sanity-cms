import {defineField, defineType} from 'sanity'

export const countryType = defineType({
  name: 'country',
  type: 'document',
  title: 'Country',
  preview: {
    select: {
      image: 'gallery.0.asset',
      title: 'title',
    },
    prepare: ({image, title}) => {
      return {
        title: title,
        media: image,
      }
    },
  },
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      title: 'Gallery',
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
  ],
})
