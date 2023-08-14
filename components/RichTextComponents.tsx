import { PortableTextComponents } from '@portabletext/react'
import SanityImage from './SanityImage'

const RichTextComponents: PortableTextComponents = {
    list: {
        bullet: ({ children }) => <ul className="mt-xl">{children}</ul>,
        number: ({ children }) => <ol className="mt-lg">{children}</ol>,
    },
    listItem: {
        bullet: ({ children }) => <li style={{ listStyleType: 'disc' }} className='my-3 mx-10'>{children}</li>,
        number: ({ children }) => <li style={{ listStyleType: 'number' }} className='my-3 mx-5'>{children}</li>,
    },
    marks: {
        em: ({ children }) => <em className="text-gray-600 font-semibold">{children}</em>,

        internalLink: ({ value, children }) => {
            const { slug = {} } = value
            const href = `/${slug.current}`
            return <a href={href}>{children}</a>
        },
        link: ({ value, children }) => {
            const { href } = value
            return <a href={href} className='text-blue-600'>{children}</a>
        }
    },
    block: {
        // Ex. 1: customizing common block types
        h1: ({ children }) => <h1 className="text-xl font-semibold mt-5 mb-3">{children}</h1>,
        blockquote: ({ children }) => <blockquote className="border-l-purple-500 text-xl"><em>{children}</em></blockquote>,
        normal: ({ children }) => <p className='my-4'>{children}</p>,

        // Ex. 2: rendering custom styles
        customHeading: ({ children }) => (
            <h2 className="text-lg text-primary text-purple-700">{children}</h2>
        ),
    },
    types: {
        image: ({ value }) => {
            return (
                <SanityImage {...value} />
            );
        },
    },
}

export default RichTextComponents