import {defineArrayMember, defineField, defineType} from 'sanity'
import isUniqueSlugByType from '../../utils/isUniqueSlugByType'

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
      name: 'media',
      title: 'Media',
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
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      group: 'content',
      options: {
        source: 'title',
        isUnique: isUniqueSlugByType,
      },
    }),
    defineField({
      name: 'city',
      type: 'reference',
      title: 'Excursion starting city',
      to: [{type: 'city'}],
      group: 'options',
    }),
    defineField({
      name: 'meetingPoint',
      type: 'reference',
      title: 'Meeting Point',
      group: 'options',
      to: [{type: 'meetingPlaces'}],
    }),
    defineField({
      name: 'route',
      type: 'array',
      title: 'Excursion route',
      of: [defineArrayMember({type: 'reference', to: [{type: 'place'}]})],
      group: 'options',
    }),
    defineField({
      name: 'excursionCategory',
      type: 'reference',
      title: 'Type',
      to: [{type: 'excursionCategory'}],
      group: 'options',
    }),
    defineField({
      name: 'excursionSubcategory',
      type: 'array',
      title: 'Subtype',
      of: [defineArrayMember({type: 'reference', to: [{type: 'excursionSubcategory'}]})],
      group: 'options',
    }),
    defineField({
      name: 'included',
      type: 'array',
      title: 'Whats included',
      of: [defineArrayMember({type: 'reference', to: [{type: 'included'}]})],
      group: 'options',
    }),
    defineField({
      name: 'surcharge',
      type: 'array',
      title: 'Surcharges',
      of: [defineArrayMember({type: 'reference', to: [{type: 'surcharge'}]})],
      group: 'options',
    }),
    defineField({
      name: 'additionalTerms',
      type: 'array',
      title: 'Additional terms',
      of: [defineArrayMember({type: 'reference', to: [{type: 'additionalTerms'}]})],
      group: 'options',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      group: 'content',
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      title: 'Gallery',
      group: 'media',
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
      name: 'dates',
      title: 'Activity dates',
      type: 'object',
      options: {
        columns: 2,
      },
      group: 'schedule',
      fields: [
        defineField({
          name: 'dateFrom',
          type: 'date',
          title: 'From',
        }),
        defineField({
          name: 'dateTo',
          type: 'date',
          title: 'To',
        }),
      ],
    }),
    defineField({
      name: 'weekdays',
      type: 'weekdaysSelector',
      title: 'Days of the week',
      group: 'schedule',
    }),
    defineField({
      name: 'prices',
      type: 'array',
      title: 'Base prices',
      group: 'prices',
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
      of: [defineArrayMember({type: 'reference', to: [{type: 'startTime'}]})],
    }),
    defineField({
      name: 'duration',
      type: 'reference',
      title: 'Duration',
      group: 'schedule',
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
      of: [defineArrayMember({type: 'schedule'})],
    }),
  ],
})
