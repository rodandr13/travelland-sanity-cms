import {at, defineMigration, setIfMissing, unset} from 'sanity/migrate'

const from = 'route'
const to = 'visitPlaces'

export default defineMigration({
  title: 'rename field route to visitPlaces',
  documentTypes: ['excursion'],

  migrate: {
    document(doc, context) {
      return [at(to, setIfMissing(doc[from])), at(from, unset())]
    },
  },
})
