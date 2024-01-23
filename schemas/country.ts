export default {
  name: 'country',
  type: 'document',
  title: 'Country',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'cities',
      type: 'array',
      title: 'Cities',
      of: [{ type: 'reference', to: [{ type: 'city' }] }],
    },
  ],
}
