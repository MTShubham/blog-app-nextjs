export type CategoryType = {
    title: string, 
    description: string
}

export type ImageType = {
    url: string,
    alt: string
}

export type AuthorType = {
    profileImage: ImageType,
    name: string,
    organization: string
}

export type PostType = {
    slug: string,
    title: string,
    subtitle: string,
    posterImage: ImageType,
    categories: CategoryType[],
    body: [],
    _id: string,
    author: AuthorType,
    _createdAt: string,
    _updatedAt: string,
}