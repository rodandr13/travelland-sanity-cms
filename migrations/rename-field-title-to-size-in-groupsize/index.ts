import {at, defineMigration, setIfMissing, unset} from 'sanity/migrate'

const from = 'title'
const to = 'size'

export default defineMigration({
  title: 'rename field title to size in groupSize',
  documentTypes: ['groupSize'],

  migrate: {
    document(doc, context) {
      return [at(to, setIfMissing(doc[from])), at(from, unset())]
    },
  },
})
