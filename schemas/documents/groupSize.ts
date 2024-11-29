import {defineField, defineType} from 'sanity'

export const groupSizeType = defineType({
  name: 'groupSize',
  type: 'document',
  title: 'Размер группы',
  __experimental_formPreviewTitle: false,
  preview: {
    select: {
      title: 'size',
    },
    prepare: (selection) => {
      const {title} = selection
      return {
        title: `до ${title} человек`,
      }
    },
  },
  fields: [
    defineField({
      name: 'size',
      type: 'number',
      title: 'Количество человек',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
