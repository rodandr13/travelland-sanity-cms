import {defineArrayMember, defineField, defineType} from 'sanity'

export const cityType = defineType({
  name: 'city',
  type: 'document',
  title: 'City',
  __experimental_formPreviewTitle: false,
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
      type: 'internationalizedArrayString',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'country',
      type: 'reference',
      title: 'Country',
      to: [{type: 'country'}],
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      title: 'Gallery',
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
      options: {
        layout: 'grid',
      },
    }),
  ],
})
