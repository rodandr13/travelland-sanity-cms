import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {media} from 'sanity-plugin-media'
import {googleMapsInput} from '@sanity/google-maps-input'
import {schemaTypes} from './schemas'
import {MdApartment, MdTour, MdRoom, MdMap} from 'react-icons/md'
import {TagIcon} from '@sanity/icons'
import './styles.css'

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
            S.listItem().icon(MdMap).title('Excursion').child(S.documentTypeList('excursion')),
            S.listItem().icon(MdApartment).title('City').child(S.documentTypeList('city')),
            S.listItem().icon(MdTour).title('Country').child(S.documentTypeList('country')),
            S.listItem().icon(MdRoom).title('Place').child(S.documentTypeList('place')),
            S.divider(),
            S.listItem()
              .title('Collections')
              .child(
                S.list()
                  .title('Collections')
                  .items([
                    S.listItem()
                      .schemaType('category')
                      .title('Category')
                      .child(S.documentTypeList('category')),
                    S.listItem()
                      .schemaType('duration')
                      .title('Duration')
                      .child(S.documentTypeList('duration')),
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
                  'duration',
                  'startTime',
                  'media.tag',
                ].includes(item.spec.id),
            ),
          ])
      },
    }),
    visionTool(),
    media(),
    googleMapsInput({
      apiKey: 'AIzaSyBx7lPY5LJ3HDcByxeCWBcLUjlnUjv8oTU',
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})
