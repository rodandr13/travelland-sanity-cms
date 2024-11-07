import {defineArrayMember, defineField, defineType} from 'sanity'
import isUniqueSlugByType from '../../lib/isUniqueSlugByType'
import {PhysicalActivityInput} from '../../components/PhysicalActivityInput'

export const excursionType = defineType({
  name: 'excursion',
  type: 'document',
  title: 'Экскурсия',
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
      title: 'Контент',
      default: true,
    },
    {
      name: 'options',
      title: 'Опции',
    },
    {
      name: 'parameters',
      title: 'Параметры',
    },
    {
      name: 'places',
      title: 'Места посещения',
    },
    {
      name: 'schedule',
      title: 'Расписание',
    },
    {
      name: 'prices',
      title: 'Цены',
    },
    {
      name: 'media',
      title: 'Медиа',
    },
    {
      name: 'seo',
      title: 'СЕО',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Название',
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
      title: 'Описание',
      description: 'Краткое описание экскурсии. Не более 1000 символов',
      group: 'content',
      validation: (Rule) => Rule.required().max(1000),
    }),
    defineField({
      name: 'city',
      type: 'reference',
      title: 'Город',
      description: 'Откуда стартует экскурсия',
      group: 'options',
      validation: (Rule) => Rule.required(),
      to: [{type: 'city'}],
    }),
    defineField({
      name: 'excursionCategory',
      type: 'reference',
      title: 'Тип',
      description: 'Используется для фильтров',
      group: 'options',
      validation: (Rule) => Rule.required(),
      to: [{type: 'excursionCategory'}],
    }),
    defineField({
      name: 'excursionSubcategory',
      type: 'array',
      title: 'Подтип',
      description: 'Может быть выбрано несколько. Используется для фильтров',
      group: 'options',
      validation: (Rule) => Rule.required(),
      of: [defineArrayMember({type: 'reference', to: [{type: 'excursionSubcategory'}]})],
    }),
    defineField({
      name: 'included',
      type: 'array',
      title: 'Включено в экскурсию',
      description: 'Опции, которые выводятся списком в описании',
      group: 'options',
      validation: (Rule) => Rule.required(),
      of: [defineArrayMember({type: 'reference', to: [{type: 'included'}]})],
    }),
    defineField({
      name: 'surcharge',
      type: 'array',
      title: 'Дополнительно оплачивается',
      description: 'Доплаты, которые не включены в экскурсию',
      group: 'options',
      validation: (Rule) => Rule.required(),
      of: [defineArrayMember({type: 'reference', to: [{type: 'surcharge'}]})],
    }),
    defineField({
      name: 'additionalTerms',
      type: 'array',
      title: 'Дополнительные условия',
      description: 'Скорее всего вам не нужно тут ничего выбирать',
      group: 'options',
      of: [defineArrayMember({type: 'reference', to: [{type: 'additionalTerms'}]})],
    }),
    defineField({
      name: 'language',
      type: 'array',
      title: 'Язык',
      description: 'Языки на которых проводится экскурсия',
      group: 'parameters',
      validation: (Rule) => Rule.required(),
      of: [defineArrayMember({type: 'reference', to: [{type: 'language'}]})],
    }),
    defineField({
      name: 'physicalActivity',
      type: 'number',
      title: 'Требуемая физическая активность',
      group: 'parameters',
      validation: (Rule) => Rule.required().min(1).max(10),
      components: {input: PhysicalActivityInput},
    }),
    defineField({
      name: 'groupSize',
      type: 'reference',
      title: 'Размер группы',
      description:
        'Данный параметр размера группы нужен только для описания, отображается на странице экскурсии под описанием',
      group: 'parameters',
      validation: (Rule) => Rule.required(),
      to: [{type: 'groupSize'}],
    }),
    defineField({
      name: 'adultsOnly',
      type: 'boolean',
      title: 'Только для взрослых',
      description:
        'Выбрать только если экскурсия для взрослых. Опция отвечает за отображении в описании параметра "Можно с детьми", если неактивно, значит можно. По-умолчанию неактивно',
      group: 'parameters',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'visitCountries',
      type: 'array',
      title: 'Страны посещения',
      description: 'Фильтрует города посещения',
      group: 'places',
      validation: (Rule) => Rule.required(),
      of: [defineArrayMember({type: 'reference', to: [{type: 'country'}]})],
    }),
    defineField({
      name: 'visitCities',
      type: 'array',
      title: 'Города посещения',
      description: 'Фильтрует места посещения',
      group: 'places',
      validation: (Rule) =>
        Rule.custom((value, {document}) => {
          if (!document?.visitCountries || document.visitCountries.length === 0) {
            return 'Необходимо выбрать страны посещения'
          }
          return true
        }).required(),
      readOnly: ({document}) => {
        const selectedCountries = document?.visitCountries || []
        return selectedCountries.length === 0
      },
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'city'}],
          options: {
            filter: ({document}) => {
              const selectedCountryIds = (document.visitCountries || [])
                .map((ref: any) => ref._ref)
                .filter(Boolean)

              if (!selectedCountryIds.length) {
                return {
                  filter: 'false',
                }
              }

              return {
                filter: 'country._ref in $countryIds',
                params: {
                  countryIds: selectedCountryIds,
                },
              }
            },
            disableNew: true,
          },
        }),
      ],
    }),
    defineField({
      name: 'route',
      type: 'array',
      title: 'Места посещения',
      description: 'Места, которые посещаются на экскурсии. Порядок имеет значения',
      group: 'places',
      validation: (Rule) =>
        Rule.custom((value, {document}) => {
          if (!document?.visitCities || document.visitCities.length === 0) {
            return 'Необходимо выбрать города посещения'
          }
          return true
        }).required(),
      readOnly: ({document}) => {
        const selectedCities = document?.visitCities || []
        return selectedCities.length === 0
      },
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'place'}],
          options: {
            filter: ({document}) => {
              const selectedCityIds = (document.visitCities || [])
                .map((ref) => ref._ref)
                .filter(Boolean)

              if (!selectedCityIds.length) {
                return {
                  filter: 'false',
                  message: 'Сначала выберите города в поле "Cities to visit"',
                }
              }

              return {
                filter: 'city._ref in $cityIds',
                params: {
                  cityIds: selectedCityIds,
                },
              }
            },
            disableNew: true,
          },
        }),
      ],
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      title: 'Галерея',
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
      title: 'Начало экскурсии',
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
      title: 'Окончания экскурсии',
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
      title: 'Даты расписания',
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
    }),
    defineField({
      name: 'weekdays',
      type: 'weekdaysSelector',
      title: 'Дни недели',
      description: 'Дни недели по которым проводится экскурсия',
      group: 'schedule',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startTime',
      type: 'array',
      title: 'Время начала',
      description: 'Может быть выбрано несколько вариантов',
      group: 'schedule',
      validation: (Rule) => Rule.required(),
      of: [defineArrayMember({type: 'reference', to: [{type: 'startTime'}]})],
    }),
    defineField({
      name: 'durationObject',
      type: 'duration',
      title: 'Длительность экскурсии',
      group: 'schedule',
      options: {
        columns: 3,
      },
    }),
    defineField({
      name: 'prices',
      type: 'array',
      title: 'Базовые цены',
      description: 'Цены на экскурсию с учетом расписания',
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
      title: 'Коррекция расписания',
      description: 'Больший приоритет, чем у базовых цен',
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
      title: 'Акционные цены',
      description: 'Наивысший приоритет среди цен',
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
