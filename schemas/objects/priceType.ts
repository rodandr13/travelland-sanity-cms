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
        filter: async ({document, getClient}) => {
          const client = getClient({apiVersion: '2023-01-01'})
          const excursionCategoryRef = (document as any)?.excursionCategory?._ref
          const categoryTitle = await client.fetch(
            `*[_type == "excursionCategory" && _id == '${excursionCategoryRef}'][0].title[0].value`,
          )

          if (!categoryTitle) {
            return {
              filter: '',
            }
          }

          return {
            filter: 'title[0].value == $categoryTitle',
            params: {categoryTitle},
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
