import {defineArrayMember, defineField, defineType} from 'sanity'
import isUniqueSlugByType from '../../lib/isUniqueSlugByType'
import {PhysicalActivityInput} from '../../components/PhysicalActivityInput'

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
      description:
        'Название экскурсии. Желательно не использовать слово "экскурсия" в названии, а также принадлежность к типу (индивидуальная, пешеходная и тп.)',
      group: 'content',
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description:
        'Отображается в URL для идентификации страницы. Генерируется из названия экскурсии после нажатия кнопки "Generate"',
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
      description: 'Краткое описание экскурсии. Не более 800 символов',
      group: 'content',
      validation: (Rule) => Rule.required().max(800),
    }),
    defineField({
      name: 'city',
      type: 'reference',
      title: 'Excursion starting city',
      description: 'Город начала экскурсии',
      group: 'options',
      validation: (Rule) => Rule.required(),
      to: [{type: 'city'}],
    }),
    defineField({
      name: 'excursionCategory',
      type: 'reference',
      title: 'Type',
      description: 'Тип экскурсии. Используется для фильтров',
      group: 'options',
      validation: (Rule) => Rule.required(),
      to: [{type: 'excursionCategory'}],
    }),
    defineField({
      name: 'excursionSubcategory',
      type: 'array',
      title: 'Subtype',
      description: 'Подтип экскурсии. Может быть выбрано несколько. Используется для фильтров',
      group: 'options',
      validation: (Rule) => Rule.required(),
      of: [defineArrayMember({type: 'reference', to: [{type: 'excursionSubcategory'}]})],
    }),
    defineField({
      name: 'included',
      type: 'array',
      title: 'Whats included',
      description: 'Что включено в экскурсию. Опции, которые выводятся списком в описании',
      group: 'options',
      validation: (Rule) => Rule.required(),
      of: [defineArrayMember({type: 'reference', to: [{type: 'included'}]})],
    }),
    defineField({
      name: 'surcharge',
      type: 'array',
      title: 'Surcharges',
      description: 'Доплаты, которые не включены в экскурсию',
      group: 'options',
      validation: (Rule) => Rule.required(),
      of: [defineArrayMember({type: 'reference', to: [{type: 'surcharge'}]})],
    }),
    defineField({
      name: 'additionalTerms',
      type: 'array',
      title: 'Additional terms',
      description: 'Скорее всего вам не нужно тут ничего выбирать',
      group: 'options',
      of: [defineArrayMember({type: 'reference', to: [{type: 'additionalTerms'}]})],
    }),
    defineField({
      name: 'language',
      type: 'array',
      title: 'Language',
      description: 'Языки на которых проводится экскурсия',
      group: 'parameters',
      validation: (Rule) => Rule.required(),
      of: [defineArrayMember({type: 'reference', to: [{type: 'language'}]})],
    }),
    defineField({
      name: 'physicalActivity',
      type: 'number',
      title: 'Physical activity',
      group: 'parameters',
      validation: (Rule) => Rule.required().min(1).max(10),
      components: {input: PhysicalActivityInput},
    }),
    defineField({
      name: 'groupSize',
      type: 'reference',
      title: 'Group size',
      description:
        'Данный параметр размера группы нужен только для описания, отображается на странице экскурсии под описанием',
      group: 'parameters',
      validation: (Rule) => Rule.required(),
      to: [{type: 'groupSize'}],
    }),
    defineField({
      name: 'adultsOnly',
      type: 'boolean',
      title: 'Adults only',
      description:
        'Выбрать только если экскурсия для взрослых. Опция отвечает за отображении в описании параметра "Можно с детьми", если неактивно, значит можно. По-умолчанию неактивно',
      group: 'parameters',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'route',
      type: 'array',
      title: 'Places to visit',
      description: 'Места, которые посещаются на экскурсии. Порядок не имеет значения',
      group: 'places',
      validation: (Rule) => Rule.required(),
      of: [defineArrayMember({type: 'reference', to: [{type: 'place'}]})],
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      title: 'Gallery',
      description:
        'Фотографии экскурсии для галереи. Первая фотография всегда используется на превью',
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
      description: 'Место сбора где начинается экскурсия',
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
      description: 'Место завершения экскурсии',
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
      description: 'Даты активности экскурсии. Используется для расчета цен',
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
          options: {
            dateFormat: 'DD.MM.YYYY',
          },
        }),
        defineField({
          name: 'dateTo',
          type: 'date',
          title: 'To',
          validation: (Rule) => Rule.required(),
          options: {
            dateFormat: 'DD.MM.YYYY',
          },
        }),
      ],
    }),
    defineField({
      name: 'weekdays',
      type: 'weekdaysSelector',
      title: 'Days of the week',
      description: 'Дни недели по которым проводится экскурсия',
      group: 'schedule',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startTime',
      type: 'array',
      title: 'Time start',
      description: 'Время начала. Может быть выбрано несколько вариантов',
      group: 'schedule',
      validation: (Rule) => Rule.required(),
      of: [defineArrayMember({type: 'reference', to: [{type: 'startTime'}]})],
    }),
    defineField({
      name: 'duration',
      type: 'reference',
      title: 'Duration',
      description: 'Длительность экскурсии',
      group: 'schedule',
      to: [{type: 'duration'}],
    }),
    defineField({
      name: 'prices',
      type: 'array',
      title: 'Base prices',
      description: 'Базовые цены на экскурсию с учетом расписания',
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
      description: 'Коррекция расписания. Больший приоритет, чем у базовых цен',
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
      description: 'Акционные цены. Наивысший приоритет среди цен',
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
