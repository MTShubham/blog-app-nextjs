'use client'
import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

const SanityStudio = () => {
    return <NextStudio config={config} />
}

export default SanityStudio
