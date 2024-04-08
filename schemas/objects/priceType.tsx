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
})
