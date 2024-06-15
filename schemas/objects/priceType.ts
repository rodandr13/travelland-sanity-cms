import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons'

export const priceType = defineType({
  type: 'object',
  name: 'price',
  title: 'Price',
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
      title: 'Category',
      description: 'Ценовая категория',
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
            excursionCategoryId === '7d5275ef-b329-4373-a105-ce50d16d39f6'
              ? 'groupSize'
              : 'category'
          return {
            filter: '_type == $filter',
            params: {filter},
          }
        },
      },
    }),
    defineField({
      type: 'number',
      description: 'Стоимость категории (€)',
      name: 'price',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
