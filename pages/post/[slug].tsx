import Header from "@/components/Header";
import sanityClient from "@/sanity/sanity.client";
import { groq } from "next-sanity";
import Image from "next/image";
import { Box, Flex, Text } from '@chakra-ui/react'
import { PortableText } from "@portabletext/react";
import RichTextComponents from "@/components/RichTextComponents";
import { getImageDimensions } from '@sanity/asset-utils';
import { REVALIDATE_TIME } from "@/utils/globalConstants";
// import { PostType } from "@/utils/types";

const Post = ({ post }: any) => {
    return (
        <>
            <Header />
            <div className='grid grid-cols-1 md:grid-cols-4 py-5 bg-slate-50'>
                <div></div>

                <div className="col-span-2 p-5">
                    <h1 className="text-2xl md:text-4xl font-semibold">{post.title}</h1>
                    <p className='leading-5 text-gray-500 text-base md:text-lg text-justify my-5'>{post.subtitle}</p>
                    <hr />
                    <Flex gap='5' className="p-5" alignItems='center' flexWrap='wrap'>
                        <Image
                            src={post.author.profileImage.url}
                            width={50}
                            height={50}
                            quality={100}
                            alt={post.author.profileImage.alt}
                            className='rounded-full'
                        />
                        <Box>
                            <Text className='text-lg font-semibold'>{post.author.name}</Text>
                            <Text className='text-sm font-semibold line-clamp-1'><span className='text-gray-500'>in</span> {post.author.organization}</Text>
                        </Box>
                    </Flex>
                    <hr />

                    <div className="flex justify-center my-10">
                        <Image
                            src={post.posterImage.url}
                            width={getImageDimensions(post.posterImage.url).width}
                            height={getImageDimensions(post.posterImage.url).height}
                            quality={100}
                            alt={post.posterImage.alt}
                        />
                    </div>

                    <div className="text-justify my-10">
                        <PortableText value={post.body} components={RichTextComponents} />
                    </div>

                </div>

                <div></div>
            </div>
        </>
    )
}

export default Post


export async function getStaticPaths() {
    const postsSlug = await sanityClient.fetch(groq`
        *[_type=="post"] {
            "slug": slug.current
        }
  `);
    const paths = postsSlug.map((post) => {
        return {
            params: {
                slug: post.slug
            }
        }
    })
    return {
        paths,
        fallback: 'blocking'
    }
}

export async function getStaticProps(context: any) {
    const { params } = context
    const posts = await sanityClient.fetch(groq`
        *[_type=="post" && slug.current=='${params.slug}'] {
        ...,
        "posterImage": {"alt": posterImage.alt, "url": posterImage.asset->.url},
        "author": author->{
          ...,
          "profileImage": {"alt": profileImage.alt, "url":profileImage.asset->.url}
        },
        "categories": categories[]->
      }
    `, { cache: 'no-store' });
    return {
        props: { post: posts[0] },
        revalidate: 5
    }
}   