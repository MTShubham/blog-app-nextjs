import React, { useContext, useEffect, useState } from 'react'
import Header from '@/components/Header';
import { Card, CardBody, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { getBookmarkedPosts, removePostBookmark } from '@/utils/indexedDB';
import { getLocalStorage } from '@/utils/storage';
import { UserContext } from './_app';
import { getPostsByBookmarkedPostIds } from '@/utils/sanityData';
import { PostType } from '@/utils/types';

const SavedBlogs = () => {
    let [bookmarkedPostIds, setBookmarkedPostIds] = useState<string[]>([]);
    let [posts, setPosts] = useState<any>(null);
    const [isLoading, setisLoading] = useState<Boolean>(true);
    const loggedUserContext = useContext(UserContext);

    useEffect(() => {
        let user: string = getLocalStorage('loggedUser');
        loggedUserContext?.setLoggedUser(user)
    }, [])

    useEffect(() => {
        async function getBookmarkPostsId() {
            let user: string = getLocalStorage('loggedUser');
            let response = await getBookmarkedPosts(user);
            if (response.success) {
                setBookmarkedPostIds(response.postIds);
            }
        }
        if (loggedUserContext?.loggedUser) {
            getBookmarkPostsId();
        }
    }, [loggedUserContext?.loggedUser])

    useEffect(() => {
        async function getPosts() {
            const filteredPosts = await getPostsByBookmarkedPostIds(bookmarkedPostIds);
            setPosts(filteredPosts);
            setisLoading(false);
        }
        if (bookmarkedPostIds && loggedUserContext?.loggedUser) {
            getPosts();
        }
    }, [bookmarkedPostIds])

    const removeBookmark = async (postId: string) => {
        let user: string = getLocalStorage('loggedUser');
        let response = await removePostBookmark(user, postId);
        if (response.success) {
            setBookmarkedPostIds(response.postIds)
        }
    }

    if (isLoading || posts == null)
        return <p>Loading...</p>

    return (
        <>
            <Header />
            <div className='grid grid-cols-1 md:grid-cols-4 px-3 py-5 bg-slate-50'>
                <div></div>

                <div className='col-span-2'>

                    {loggedUserContext?.loggedUser ? (
                        <>
                            {posts && posts.length > 0 && (
                                posts.map((post: PostType) => {
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
                                                        <Link href={`/post/${post.slug}`}><Text size='md' className='text-sm md:text-lg font-semibold line-clamp-3 md:line-clamp-1'>{post.title}</Text></Link>
                                                        <Text className='leading-5 text-gray-500 text-xs md:text-sm text-justify line-clamp-4 md:line-clamp-1 my-3'>{post.subtitle}</Text>
                                                    </CardBody>
                                                </div>
                                            </div>
                                            <button onClick={() => removeBookmark(post._id)} className='text-xs border border-gray-300 px-3 py-1 rounded-full self-center vertical-center mb-5'>Remove</button>
                                        </Card>
                                    )
                                })
                            )}
                            {posts.length === 0 && (
                                <h1 className='text-center text-2xl font-semibold my-20'>No saved blogs</h1>
                            )}
                        </>
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