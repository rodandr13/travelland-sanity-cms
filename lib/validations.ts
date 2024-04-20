import {valueInternationalized} from '../types'
import {ValidationContext} from 'sanity'

export const validateInternationalized = (
  value: valueInternationalized[],
  maxLength: number,
): string | true => {
  const title = value[0]?.value
  if (!title) {
    return 'Title is required'
  }
  if (title.length <= 2) {
    return 'Title length must be more than 2 characters'
  }
  if (title.length > maxLength) {
    return `Title length must be less than ${maxLength} characters`
  }
  return true
}

export const validateUniqueTitle = async (title: string, context: ValidationContext) => {
  const {getClient, document} = context
  if (!document) {
    return 'Document is undefined'
  }
  const client = getClient({apiVersion: '2022-03-07'})
  const documentType = document._type
  const id = document._id.replace(/^drafts\./, '')
  const params = {
    draft: `drafts.${id}`,
    published: id,
    documentType,
  }
  const query = `*[!(_id in [$draft, $published]) && _type == $documentType].time`
  const response = await client.fetch(query, params)
  return !response.includes(title) || `Must be unique`
}
