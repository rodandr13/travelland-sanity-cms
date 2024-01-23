export default {
  name: 'city',
  type: 'document',
  title: 'City',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'country',
      type: 'reference',
      title: 'Country',
      to: [{type: 'country'}],
    },
  ]
}
