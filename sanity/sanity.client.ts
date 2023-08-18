import { createClient } from 'next-sanity'

const sanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    // projectId: 'zwb253js',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    // dataset: 'production',
    apiVersion: '2021-03-25',
    useCdn: false
})

export default sanityClient