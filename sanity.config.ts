import {defineConfig, isKeySegment} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {media} from 'sanity-plugin-media'
import {googleMapsInput} from '@sanity/google-maps-input'
import {schemaTypes} from './schemas'
import {internationalizedArray} from 'sanity-plugin-internationalized-array'
import {languageFilter} from '@sanity/language-filter'
import {MdApartment, MdMap, MdRoom, MdTour} from 'react-icons/md'
import {CogIcon, TagIcon} from '@sanity/icons'
import './styles.css'

import * as dotenv from 'dotenv'

let googleMapsApiKey = import.meta.env?.SANITY_STUDIO_GOOGLE_MAPS_API_KEY
if (!googleMapsApiKey) {
  dotenv.config({
    path: `.env`,
  })
  googleMapsApiKey = process.env?.SANITY_STUDIO_GOOGLE_MAPS_API_KEY
}

export default defineConfig({
  name: 'default',
  title: 'travelland',
  projectId: 'w6lmtfgf',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) => {
        return S.list()
          .title('Content')
          .items([
            S.divider(),
            S.listItem().icon(MdMap).title('Экскурсии').child(S.documentTypeList('excursion')),
            S.listItem().icon(MdApartment).title('Города').child(S.documentTypeList('city')),
            S.listItem().icon(MdTour).title('Страны').child(S.documentTypeList('country')),
            S.listItem()
              .icon(MdRoom)
              .title('Достопримечательности')
              .child(S.documentTypeList('place')),
            S.divider(),
            S.listItem()
              .title('Коллекции')
              .child(
                S.list()
                  .title('Коллекции')
                  .items([
                    S.listItem()
                      .schemaType('category')
                      .title('Возрастные категории')
                      .child(S.documentTypeList('category')),
                    S.listItem()
                      .schemaType('excursionCategory')
                      .title('Типы экскурсии')
                      .child(S.documentTypeList('excursionCategory')),
                    S.listItem()
                      .schemaType('excursionSubcategory')
                      .title('Подтипы экскурсии')
                      .child(S.documentTypeList('excursionSubcategory')),
                    S.listItem()
                      .schemaType('groupSize')
                      .title('Group size')
                      .child(S.documentTypeList('groupSize')),
                    S.listItem()
                      .schemaType('language')
                      .title('Language')
                      .child(S.documentTypeList('language')),
                    S.listItem()
                      .icon(TagIcon)
                      .schemaType('media.tag')
                      .title('Media tags')
                      .child(S.documentTypeList('media.tag')),
                    S.listItem()
                      .schemaType('meetingPlaces')
                      .title('Meeting place')
                      .child(S.documentTypeList('meetingPlaces')),
                    S.listItem()
                      .schemaType('included')
                      .title('Included')
                      .child(S.documentTypeList('included')),
                    S.listItem()
                      .schemaType('service')
                      .title('Services')
                      .child(S.documentTypeList('service')),
                    S.listItem()
                      .schemaType('additionalTerms')
                      .title('Дополнительные условия')
                      .child(S.documentTypeList('additionalTerms')),
                    S.listItem()
                      .schemaType('startTime')
                      .title('Start time')
                      .child(S.documentTypeList('startTime')),
                    S.listItem()
                      .schemaType('surcharge')
                      .title('Surcharge')
                      .child(S.documentTypeList('surcharge')),
                  ]),
              ),
            S.divider(),
            S.listItem()
              .icon(CogIcon)
              .title('Site settings')
              .child(S.editor().schemaType('settingsApp').documentId('settingsApp')),
            ...S.documentTypeListItems().filter(
              (item) =>
                ![
                  'meetingPlaces',
                  'place',
                  'country',
                  'city',
                  'category',
                  'included',
                  'excursion',
                  'surcharge',
                  'startTime',
                  'media.tag',
                  'excursionCategory',
                  'excursionSubcategory',
                  'additionalTerms',
                  'service',
                  'settingsApp',
                  'language',
                  'groupSize',
                ].includes(item.getId?.() ?? ''),
            ),
          ])
      },
    }),
    visionTool(),
    media(),
    googleMapsInput({
      apiKey: googleMapsApiKey,
    }),
    internationalizedArray({
      languages: [{id: 'ru', title: 'Russian'}],
      defaultLanguages: ['ru'],
      fieldTypes: ['string', 'text'],
      buttonAddAll: false,
    }),
    languageFilter({
      // Use the same languages as the internationalized array plugin
      supportedLanguages: [{id: 'ru', title: 'Russian'}],
      defaultLanguages: ['ru'],
      documentTypes: ['excursion', 'category'],
      filterField: (enclosingType, member, selectedLanguageIds) => {
        // Filter internationalized arrays
        if (
          enclosingType.jsonType === 'object' &&
          enclosingType.name.startsWith('internationalizedArray') &&
          'kind' in member
        ) {
          // Get last two segments of the field's path
          const pathEnd = member.field.path.slice(-2)
          // If the second-last segment is a _key, and the last segment is `value`,
          // It's an internationalized array value
          // And the array _key is the language of the field
          const language =
            pathEnd[1] === 'value' && isKeySegment(pathEnd[0]) ? pathEnd[0]._key : null

          return language ? selectedLanguageIds.includes(language) : false
        }

        // Filter internationalized objects if you have them
        // `localeString` must be registered as a custom schema type
        if (enclosingType.jsonType === 'object' && enclosingType.name.startsWith('locale')) {
          return selectedLanguageIds.includes(member.name)
        }

        return true
      },
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})
