import { defineField } from 'sanity'

const author = {
    name: 'author',
    title: 'Author',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'organization',
            title: 'Organization',
            type: 'string',
            validation: Rule => Rule.max(50)
        }),
        defineField({
            name: 'profileImage',
            title: 'ProfileImage',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: "alt",
                    title: "Alt",
                    type: "string",
                },
            ]
        }),
        defineField({
            name: 'bio',
            title: 'Bio',
            type: 'array',
            of: [
                {
                    title: 'Block',
                    type: 'block',
                    styles: [{ title: 'Normal', value: 'normal' }],
                    lists: [],
                },
            ],
        }),
    ],
    preview: {
        select: {
            title: 'name',
            media: 'profileImage',
        },
    },
}

export default author;