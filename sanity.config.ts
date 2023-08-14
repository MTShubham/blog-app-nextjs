import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'

import schemas from './sanity/schemas'

const config = defineConfig({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
    title: 'Blog site',
    apiVersion: '2021-03-25',
    basePath: '/studio',
    plugins: [deskTool(), visionTool()],
    schema: { types: schemas }
})

export default config;