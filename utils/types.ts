export type Category = {
    title: string, 
    description: string
}

export type ImageType = {
    url: string,
    alt: string
}

export type Author = {
    profileImage: ImageType,
    name: string,
    organization: string
}

export type Post = {
    slug: string,
    title: string,
    subtitle: string,
    posterImage: ImageType,
    categories: Category[],
    body: [],
    _id: string,
    author: Author,
    _createdAt: string,
    _updatedAt: string,
}