import Header from "@/components/Header";
import Posts from "@/components/posts"
import sanityClient from "@/sanity/sanity.client";
import { groq } from "next-sanity";

export default function Home({ posts }: any) {
  return (
    <>
      <Header />
      <div className='bg-slate-100'>
        <Posts posts={posts} />
      </div>
    </>
  )
}


export async function getStaticProps() {
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
  return {
    props: { posts }
  }
}   
