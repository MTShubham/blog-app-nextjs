import React, { useContext, useEffect, useState } from 'react'
import Header from '@/components/Header';
import { Card, CardBody, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { getBookmarkedPosts, initIndexedDB, removePostBookmark } from '@/utils/indexedDB';
import { getLocalStorage } from '@/utils/storage';
import { UserContext } from './_app';
import { getPostsByBookmarkedPostIds } from '@/utils/sanityData';
import { IDBPDatabase } from 'idb';
import { PostType } from '@/utils/types';

const SavedBlogs = () => {
    let [bookmarkedPostIds, setBookmarkedPostIds] = useState<string[]>([]);
    let [posts, setPosts] = useState([]);
    const [isLoading, setisLoading] = useState<Boolean>(true);
    const loggedUserContext = useContext(UserContext);

    useEffect(() => {
        let user: string = getLocalStorage('loggedUser');
        loggedUserContext?.setLoggedUser(user)
        setisLoading(false);
    }, [])

    useEffect(() => {
        async function getBookmarkPostsId() {
            const db: IDBPDatabase = await initIndexedDB();
            let user: string = getLocalStorage('loggedUser');
            let response = await getBookmarkedPosts(db, user);
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
        }
        if (bookmarkedPostIds) {
            getPosts();
        }
    }, [bookmarkedPostIds])

    const removeBookmark = async (postId: string) => {
        const db = await initIndexedDB();
        let user: string = getLocalStorage('loggedUser');
        let response = await removePostBookmark(db, user, postId);
        if (response.success) {
            setBookmarkedPostIds(response.postIds)
        }
    }

    if (isLoading)
        return <p>Loading...</p>

    return (
        <>
            <Header />
            <div className='grid grid-cols-1 md:grid-cols-4 px-3 py-5 bg-slate-50'>
                <div></div>

                <div className='col-span-2'>

                    {loggedUserContext?.loggedUser ? (
                        <>
                            {posts.length > 0 && (
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