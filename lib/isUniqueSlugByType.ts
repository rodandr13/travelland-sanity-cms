import {SlugValidationContext} from 'sanity'

export default async function isUniqueSlugByType(slug: string, context: SlugValidationContext) {
  const {document, getClient} = context
  if (!document) {
    return 'Document is undefined'
  }
  const client = getClient({apiVersion: '2023-03-07'})
  const documentType = document._type
  const id = document._id.replace(/^drafts\./, '')
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
    documentType,
  }
  const query = `!defined(*[!(_id in [$draft, $published]) && _type == $documentType && slug.current == $slug][0]._id)`
  return await client.fetch(query, params)
}
