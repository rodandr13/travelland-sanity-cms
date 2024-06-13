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
  initialValue: {
    adultsOnly: false,
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
      name: 'parameters',
      title: 'Parameters',
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
      name: 'description',
      type: 'text',
      title: 'Description',
      group: 'content',
      validation: (Rule) => Rule.required().max(800),
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
      name: 'additionalTerms',
      type: 'array',
      title: 'Additional terms',
      group: 'options',
      of: [defineArrayMember({type: 'reference', to: [{type: 'additionalTerms'}]})],
    }),
    defineField({
      name: 'adultsOnly',
      type: 'boolean',
      title: 'Adults only',
      group: 'parameters',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'language',
      type: 'array',
      title: 'Language',
      group: 'parameters',
      validation: (Rule) => Rule.required(),
      of: [defineArrayMember({type: 'reference', to: [{type: 'language'}]})],
    }),
    defineField({
      name: 'physicalActivity',
      type: 'number',
      title: 'Physical activity',
      group: 'parameters',
      validation: (Rule) => Rule.required(),
      options: {
        list: [...Array.from({length: 10}, (v, i) => i + 1)],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'groupSize',
      type: 'reference',
      title: 'Group size',
      group: 'parameters',
      validation: (Rule) => Rule.required(),
      to: [{type: 'groupSize'}],
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
      name: 'startingPlace',
      type: 'reference',
      title: 'Starting place',
      group: 'schedule',
      to: [{type: 'meetingPlaces'}],
      readOnly: ({document}) => {
        return Boolean(!document?.city)
      },
      validation: (Rule) =>
        Rule.custom((value, {document}) => {
          if (!document?.city) {
            return 'Необходимо выбрать город начала экскурсии'
          }
          return true
        }).required(),
      options: {
        filter: ({document}) => {
          const cityRef = (document as any)?.city?._ref

          return {
            filter: 'city._ref == $cityRef',
            params: {cityRef},
          }
        },
      },
    }),
    defineField({
      name: 'endingPlace',
      type: 'reference',
      title: 'Ending place',
      group: 'schedule',
      to: [{type: 'meetingPlaces'}],
      readOnly: ({document}) => {
        return Boolean(!document?.city)
      },
      validation: (Rule) =>
        Rule.custom((value, {document}) => {
          if (!document?.city) {
            return 'Необходимо выбрать город начала экскурсии'
          }
          return true
        }).required(),
      options: {
        filter: ({document}) => {
          const cityRef = (document as any)?.city?._ref

          return {
            filter: 'city._ref == $cityRef',
            params: {cityRef},
          }
        },
      },
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
      to: [{type: 'duration'}],
    }),
    defineField({
      name: 'prices',
      type: 'array',
      title: 'Base prices',
      group: 'prices',
      readOnly: ({document}) => {
        return Boolean(!document?.excursionCategory)
      },
      validation: (Rule) =>
        Rule.custom((value, {document}) => {
          if (!document?.excursionCategory) {
            return 'Необходимо выбрать категорию экскурсии'
          }
          return true
        }).required(),
      of: [
        defineArrayMember({
          type: 'price',
        }),
      ],
    }),
    defineField({
      name: 'priceCorrections',
      title: 'Price corrections',
      type: 'array',
      group: 'prices',
      readOnly: ({document}) => {
        return Boolean(!document?.excursionCategory)
      },
      validation: (Rule) =>
        Rule.custom((value, {document}) => {
          if (!document?.excursionCategory) {
            return 'Необходимо выбрать категорию экскурсии'
          }
          return true
        }),
      of: [defineArrayMember({type: 'schedule'})],
    }),
    defineField({
      name: 'promotionalPrices',
      title: 'Promotional prices',
      type: 'array',
      group: 'prices',
      readOnly: ({document}) => {
        return Boolean(!document?.excursionCategory)
      },
      validation: (Rule) =>
        Rule.custom((value, {document}) => {
          if (!document?.excursionCategory) {
            return 'Необходимо выбрать категорию экскурсии'
          }
          return true
        }),
      of: [
        defineArrayMember({
          type: 'schedule',
        }),
      ],
    }),
  ],
})
