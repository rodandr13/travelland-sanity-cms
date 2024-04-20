import {defineArrayMember, defineField, defineType} from 'sanity'
import isUniqueSlugByType from '../../lib/isUniqueSlugByType'

export const excursionType = defineType({
  name: 'excursion',
  type: 'document',
  title: 'Excursion',
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
      name: 'places',
      title: 'Places',
    },
    {
      name: 'schedule',
      title: 'Schedule',
    },
    {
      name: 'prices',
      title: 'Prices',
    },
    {
      name: 'media',
      title: 'Media',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      group: 'content',
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      group: 'content',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        isUnique: isUniqueSlugByType,
      },
    }),
    defineField({
      name: 'city',
      type: 'reference',
      title: 'Excursion starting city',
      group: 'options',
      validation: (Rule) => Rule.required(),
      to: [{type: 'city'}],
    }),
    defineField({
      name: 'route',
      type: 'array',
      title: 'Places to visit',
      group: 'places',
      validation: (Rule) => Rule.required(),
      of: [defineArrayMember({type: 'reference', to: [{type: 'place'}]})],
    }),
    defineField({
      name: 'excursionCategory',
      type: 'reference',
      title: 'Type',
      group: 'options',
      validation: (Rule) => Rule.required(),
      to: [{type: 'excursionCategory'}],
    }),
    defineField({
      name: 'excursionSubcategory',
      type: 'array',
      title: 'Subtype',
      group: 'options',
      validation: (Rule) => Rule.required(),
      of: [defineArrayMember({type: 'reference', to: [{type: 'excursionSubcategory'}]})],
    }),
    defineField({
      name: 'included',
      type: 'array',
      title: 'Whats included',
      group: 'options',
      validation: (Rule) => Rule.required(),
      of: [defineArrayMember({type: 'reference', to: [{type: 'included'}]})],
    }),
    defineField({
      name: 'surcharge',
      type: 'array',
      title: 'Surcharges',
      group: 'options',
      validation: (Rule) => Rule.required(),
      of: [defineArrayMember({type: 'reference', to: [{type: 'surcharge'}]})],
    }),
    defineField({
      name: 'excursionParameters',
      type: 'array',
      title: 'Parameters',
      group: 'options',
      validation: (Rule) => Rule.required(),
      of: [defineArrayMember({type: 'reference', to: [{type: 'excursionParameters'}]})],
    }),
    defineField({
      name: 'additionalTerms',
      type: 'array',
      title: 'Additional terms',
      group: 'options',
      of: [defineArrayMember({type: 'reference', to: [{type: 'additionalTerms'}]})],
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      title: 'Gallery',
      group: 'media',
      validation: (Rule) => Rule.required(),
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
    defineField({
      name: 'seo',
      type: 'seo',
      group: 'seo',
    }),
    defineField({
      name: 'meetingPoint',
      type: 'reference',
      title: 'Meeting Point',
      group: 'schedule',
      validation: (Rule) => Rule.required(),
      to: [{type: 'meetingPlaces'}],
    }),
    defineField({
      name: 'dates',
      title: 'Activity dates',
      type: 'object',
      options: {
        columns: 2,
      },
      group: 'schedule',
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'dateFrom',
          type: 'date',
          title: 'From',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'dateTo',
          type: 'date',
          title: 'To',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'weekdays',
      type: 'weekdaysSelector',
      title: 'Days of the week',
      group: 'schedule',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'prices',
      type: 'array',
      title: 'Base prices',
      group: 'prices',
      validation: (Rule) => Rule.required(),
      of: [
        defineArrayMember({
          type: 'price',
        }),
      ],
    }),
    defineField({
      name: 'startTime',
      type: 'array',
      title: 'Time start',
      group: 'schedule',
      validation: (Rule) => Rule.required(),
      of: [defineArrayMember({type: 'reference', to: [{type: 'startTime'}]})],
    }),
    defineField({
      name: 'duration',
      type: 'reference',
      title: 'Duration',
      group: 'schedule',
      validation: (Rule) => Rule.required(),
      to: [{type: 'duration'}],
    }),
    defineField({
      name: 'priceCorrections',
      title: 'Price corrections',
      type: 'array',
      group: 'prices',
      of: [defineArrayMember({type: 'schedule'})],
    }),
    defineField({
      name: 'promotionalPrices',
      title: 'Promotional prices',
      type: 'array',
      group: 'prices',
      of: [
        defineArrayMember({
          type: 'schedule',
        }),
      ],
    }),
  ],
})
