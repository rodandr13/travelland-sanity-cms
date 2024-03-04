import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {media} from 'sanity-plugin-media'
import {googleMapsInput} from '@sanity/google-maps-input'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'travelland',

  projectId: 'w6lmtfgf',
  dataset: 'production',

  plugins: [
    structureTool(),
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
