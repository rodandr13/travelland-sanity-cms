import {defineField, defineType, defineArrayMember} from 'sanity'
import {ThListIcon, UserIcon} from '@sanity/icons'

export const scheduleType = defineType({
  name: 'schedule',
  title: 'Schedule',
  type: 'object',
  icon: ThListIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'dates',
      title: 'Dates',
      type: 'object',
      fields: [
        defineField({
          name: 'dateFrom',
          type: 'date',
          title: 'From',
          options: {
            dateFormat: 'DD/MM/YYYY',
          },
        }),
        defineField({
          name: 'dateTo',
          type: 'date',
          title: 'To',
          options: {
            dateFormat: 'DD/MM/YYYY',
          },
        }),
      ],
      options: {
        columns: 2,
      },
    }),
    defineField({
      name: 'weekdays',
      type: 'weekdaysSelector',
      title: 'Days of the week',
    }),
    defineField({
      name: 'startTime',
      type: 'reference',
      title: 'Time start',
      to: [
        {
          type: 'startTime',
        },
      ],
    }),
    defineField({
      name: 'duration',
      type: 'reference',
      title: 'Duration',
      to: [{type: 'duration'}],
    }),
    defineField({
      name: 'prices',
      type: 'array',
      title: 'Prices',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'price',
          title: 'Price',
          preview: {
            select: {
              categoryTitle: 'category.title',
              categoryDescription: 'category.description',
              price: 'price',
            },
            prepare: (selection) => {
              const {categoryTitle, categoryDescription, price} = selection
              return {
                title: `${categoryTitle} | ${price}$`,
                subtitle: categoryDescription,
                media: UserIcon,
              }
            },
          },
          fields: [
            defineField({
              type: 'reference',
              name: 'category',
              title: 'Category',
              to: [{type: 'category'}],
            }),
            defineField({
              type: 'number',
              name: 'price',
            }),
          ],
        }),
      ],
    }),
  ],
})
