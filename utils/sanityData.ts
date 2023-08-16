import sanityClient from "@/sanity/sanity.client";
import { groq } from "next-sanity";

export const getAllPosts = async () => {
    const posts = await sanityClient.fetch(groq`
    *[_type=="post"] | order(_createdAt desc) {
        ...,
        "slug": slug.current,
        "posterImage": {"alt": posterImage.alt, "url": posterImage.asset->.url},
        "author": author->{
          ...,
          "profileImage": {"alt": profileImage.alt, "url":profileImage.asset->.url}
        },
        "categories": categories[]->
      }
  `);
    return posts;
}