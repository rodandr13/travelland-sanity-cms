import {defineField, defineType} from 'sanity'

export const groupSizeType = defineType({
  name: 'groupSize',
  type: 'document',
  title: 'Group size',
  __experimental_formPreviewTitle: false,
  preview: {
    select: {
      title: 'title',
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
      name: 'title',
      type: 'number',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
