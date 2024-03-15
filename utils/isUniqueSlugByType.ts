export default async function isUniqueSlugByType(slug, context) {
  console.log('slug')
  const {document, getClient} = context
  const client = getClient({apiVersion: '2022-03-07'})
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
