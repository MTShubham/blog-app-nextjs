import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import sanityClient from '@/sanity/sanity.client';
import { groq } from 'next-sanity';
import Header from '@/components/Header';
import { Card, CardBody, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { getBookmarkedPosts, initIndexedDB, removePostBookmark } from '@/utils/indexedDB';
import { getLocalStorage } from '@/utils/storage';

const SavedBlogs = ({ post }) => {
    const router = useRouter();
    let [bookmarkedPostIds, setBookmarkedPostIds] = useState<string[]>([]);
    let [posts, setPosts] = useState([]);
    const [loggedUser, setLoggedUser] = useState('');

    // if (isLoading)
    //     return <p>Loading...</p>

    // if (post) {
    //     setIsLoading(false);
    // }

    useEffect(() => {
        let user = getLocalStorage('loggedUser');
        setLoggedUser(user)
    }, [loggedUser]);

    useEffect(() => {
        async function getBookmarkPostsId() {
            const db = await initIndexedDB();
            let user = getLocalStorage('loggedUser');
            let response = await getBookmarkedPosts(db, user);
            if (response.success) {
                setBookmarkedPostIds(response.postIds);
            }
        }
        getBookmarkPostsId();
    }, [])

    useEffect(() => {
        async function getPosts() {
            const filPosts = await sanityClient.fetch(groq`
                *[_type=="post" && _id in $bookmarkedPostIds] {
                ...,
                "posterImage": {"alt": posterImage.alt, "url": posterImage.asset->.url},
                "author": author->{
                ...,
                "profileImage": {"alt": profileImage.alt, "url":profileImage.asset->.url}
                },
                "categories": categories[]->
            }
            `, {
                bookmarkedPostIds
            });
            setPosts(filPosts);
        }
        getPosts();
    }, [bookmarkedPostIds])

    const removeBookmark = async (postId) => {
        const db = await initIndexedDB();
        let user = getLocalStorage('loggedUser');
        let response = await removePostBookmark(db, user, postId);
        if (response.success) {
            setBookmarkedPostIds(response.postIds)
        }
    }

    return (
        <>
            <Header />
            <div className='grid grid-cols-1 md:grid-cols-4 px-3 py-5 bg-slate-50'>
                <div></div>

                <div className='col-span-2'>
                    {/* {posts.length ? (posts.map((post: any) => {
                        return (
                            <Card
                                key={post._id}
                                className='max-h-50 my-5'
                            >
                                <div className='flex items-center px-2 md:px-5 flex-row my-5'>
                                    <Image
                                        src={post.posterImage.url}
                                        width={100}
                                        height={30}
                                        quality={100}
                                        alt={post.author.profileImage.alt}
                                        className='w-14 md:w-24'
                                    />
                                    <div className=''>
                                        <CardBody>
                                            <Link href={`/post/${post.slug.current}`}><Text size='md' className='text-sm md:text-lg font-semibold line-clamp-3 md:line-clamp-1'>{post.title}</Text></Link>
                                            <Text className='leading-5 text-gray-500 text-xs md:text-sm text-justify line-clamp-4 md:line-clamp-1 my-3'>{post.subtitle}</Text>
                                        </CardBody>
                                    </div>
                                </div>
                                <button onClick={() => removeBookmark(post._id)} className='text-xs border border-gray-300 px-3 py-1 rounded-full self-center vertical-center mb-5'>Remove</button>
                            </Card>
                        )
                    })) : (loggedUser ?
                        (
                            <h1 className='text-center text-2xl font-semibold my-20'>No saved blogs</h1>
                        ) :
                        (<h1 className='text-center text-2xl font-semibold my-20'>Please login to see this page</h1>)
                    )
                    } */}

                    {loggedUser ? (

                        posts.length ? (
                            posts.map((post: any) => {
                                return (
                                    <Card
                                        key={post._id}
                                        className='max-h-50 my-5'
                                    >
                                        <div className='flex items-center px-2 md:px-5 flex-row my-5'>
                                            <Image
                                                src={post.posterImage.url}
                                                width={100}
                                                height={30}
                                                quality={100}
                                                alt={post.author.profileImage.alt}
                                                className='w-14 md:w-24'
                                            />
                                            <div>
                                                <CardBody>
                                                    <Link href={`/post/${post.slug.current}`}><Text size='md' className='text-sm md:text-lg font-semibold line-clamp-3 md:line-clamp-1'>{post.title}</Text></Link>
                                                    <Text className='leading-5 text-gray-500 text-xs md:text-sm text-justify line-clamp-4 md:line-clamp-1 my-3'>{post.subtitle}</Text>
                                                </CardBody>
                                            </div>
                                        </div>
                                        <button onClick={() => removeBookmark(post._id)} className='text-xs border border-gray-300 px-3 py-1 rounded-full self-center vertical-center mb-5'>Remove</button>
                                    </Card>
                                )
                            })
                        ) : (
                            <h1 className='text-center text-2xl font-semibold my-20'>No saved blogs</h1>
                        )


                    ) : (
                        <h1 className='text-center text-2xl font-semibold my-20'>Please login to see this page</h1>
                    )
                    }

                </div>

                <div></div>
            </div>
        </>
    )
}

export default SavedBlogs

export async function getStaticProps(context: any) {
    const { params } = context
    const posts = await sanityClient.fetch(groq`
        *[_type=="post" && slug.current=='manager-to-software-developer-lessons-learned'] {
        ...,
        "posterImage": {"alt": posterImage.alt, "url": posterImage.asset->.url},
        "author": author->{
          ...,
          "profileImage": {"alt": profileImage.alt, "url":profileImage.asset->.url}
        },
        "categories": categories[]->
      }
    `);
    return {
        props: { post: posts[0] }
    }
}   