import {defineField, defineType, defineArrayMember} from 'sanity'
import {ThListIcon} from '@sanity/icons'
import {StatusBadgePreview} from '../../components/StatusBadgePreview'

export const scheduleType = defineType({
  name: 'schedule',
  title: 'Расписание',
  type: 'object',
  icon: ThListIcon,
  components: {
    preview: StatusBadgePreview,
  },
  preview: {
    select: {
      title: 'title',
      dateFrom: 'dates.dateFrom',
      dateTo: 'dates.dateTo',
    },
  },
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Название',
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: 'dates',
      title: 'Даты активности',
      type: 'object',
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'dateFrom',
          type: 'date',
          title: 'От',
          validation: (Rule) => Rule.required(),
          options: {
            dateFormat: 'DD.MM.YYYY',
          },
        }),
        defineField({
          name: 'dateTo',
          type: 'date',
          title: 'До',
          validation: (Rule) => Rule.required(),
          options: {
            dateFormat: 'DD.MM.YYYY',
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
      title: 'Дни недели',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'prices',
      type: 'array',
      title: 'Цены',
      validation: (Rule) => Rule.required(),
      of: [
        defineArrayMember({
          type: 'price',
        }),
      ],
    }),
  ],
})
