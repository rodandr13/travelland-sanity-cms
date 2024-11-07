import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons'

export const priceType = defineType({
  type: 'object',
  name: 'price',
  title: 'Цена',
  preview: {
    select: {
      categoryTitle: 'category.title',
      categoryDescription: 'category.description.0.value',
      price: 'price',
    },
    prepare: (selection) => {
      const {categoryTitle, categoryDescription, price} = selection
      let title
      if (typeof categoryTitle === 'number') {
        title = `До ${categoryTitle} человек`
      } else {
        title = categoryTitle[0].value
      }
      return {
        title: `${title} | ${price} €`,
        subtitle: categoryDescription,
        media: UserIcon,
      }
    },
  },
  fields: [
    defineField({
      type: 'reference',
      name: 'category',
      title: 'Ценовая категория',
      validation: (Rule) => Rule.required(),
      to: [{type: 'category'}, {type: 'groupSize'}],
      options: {
        filter: async ({document, getClient}) => {
          const excursionCategoryRef = (document as any)?.excursionCategory?._ref
          const client = getClient({apiVersion: '2024-06-14'})
          const excursionCategory = await client.fetch(
            `*[_type == 'excursionCategory' && _id == $excursionCategoryRef][0]`,
            {
              excursionCategoryRef,
            },
          )
          const excursionCategoryId = excursionCategory._id
          const filter =
            excursionCategoryId === 'e8ffaead-8fbf-4fa0-95df-505a28a6e7e6'
              ? 'category'
              : 'groupSize'
          return {
            filter: '_type == $filter',
            params: {filter},
          }
        },
      },
    }),
    defineField({
      type: 'number',
      title: 'Стоимость (€)',
      name: 'price',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
