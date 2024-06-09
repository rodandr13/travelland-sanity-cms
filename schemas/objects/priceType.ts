import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons'

export const priceType = defineType({
  type: 'object',
  name: 'price',
  title: 'Price',
  preview: {
    select: {
      categoryTitle: 'category.title.0.value',
      categoryDescription: 'category.description.0.value',
      price: 'price',
    },
    prepare: (selection) => {
      const {categoryTitle, categoryDescription, price} = selection
      return {
        title: `${categoryTitle} | ${price} €`,
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
      validation: (Rule) => Rule.required(),
      to: [{type: 'category'}],
      options: {
        filter: async ({document}) => {
          const excursionCategoryRef = (document as any)?.excursionCategory?._ref

          return {
            filter: 'excursionCategory._ref == $excursionCategoryRef',
            params: {excursionCategoryRef},
          }
        },
      },
    }),
    defineField({
      type: 'number',
      name: 'price',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
