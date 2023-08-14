import { defineField } from 'sanity'
import blockContent from './blockContent';

const post = {
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => [
                Rule.required().min(10).error('A title of min. 10 characters is required'),
                Rule.max(50).warning('Shorter titles are usually better'),
            ],
            // initialValue: 'xyz'
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string'
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: { type: 'author' },
            validation: Rule => Rule.required()
            // weak: true      // We can't usually delete referenced data. But in weak reference we can   
        }),
        defineField({
            name: 'posterImage',
            title: 'Poster Image',
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
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'category' } }],
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'array',
            of: blockContent,
            validation: Rule => Rule.required()
        }),
    ],

    preview: {
        select: {
            // Giving alias name
            title: 'title',
            author: 'author.name',
            media: 'posterImage',
        },
        prepare(selection: any) {
            const { author } = selection
            return { ...selection, subtitle: author && `by ${author}` }
        },
    },
};

export default post;