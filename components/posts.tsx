import { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Box, Card, CardBody, Flex, Stack, Text } from '@chakra-ui/react'
import { bookmarkPost, getBookmarkedPosts, removePostBookmark } from '@/utils/indexedDB'
import { getLocalStorage } from '@/utils/storage'
import Modal from './Modal'
import { UserContext } from '@/pages/_app'
import { PostType } from '@/utils/types'

const Posts = ({ posts }: any) => {
    let [bookmarkedPosts, setBookmarkedPosts] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);
    const [modalData, setModalData] = useState<JSX.Element>(<></>);
    const userContext = useContext(UserContext);

    useEffect(() => {
        const user: string = getLocalStorage('loggedUser');
        userContext?.setLoggedUser(user)
        setIsLoading(false);
    }, [])

    useEffect(() => {
        async function getBookmarkPostsId() {
            const user: string = getLocalStorage('loggedUser');
            userContext?.setLoggedUser(user);
            const response = await getBookmarkedPosts(user);
            if (response.success)
                setBookmarkedPosts(response.postIds);
        }
        if (userContext?.loggedUser) {
            getBookmarkPostsId();
        }
        else {
            setBookmarkedPosts([])
        }
    }, [userContext?.loggedUser])

    const bookmark = async (postId: string) => {
        const user: string = getLocalStorage('loggedUser');
        userContext?.setLoggedUser(user)
        if (user) {
            const response = await bookmarkPost(user, postId);
            if (response.success) {
                setBookmarkedPosts(response.postIds);
            }
            else if (response.status === 400) {
                setIsModalOpen(true);
                setModalData(<p>{response.msg}</p>);
            }
        }
    }

    const removeBookmark = async (postId: string) => {
        let user: string = getLocalStorage('loggedUser');
        userContext?.setLoggedUser(user);
        const response = await removePostBookmark(user, postId);
        if (response.success) {
            setBookmarkedPosts(response.postIds);
        }
    }

    const openModal = (value: JSX.Element) => {
        setIsModalOpen(true);
        setModalData(value)
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (isLoading)
        return <p>Loading...</p>

    return (
        <>
            {isModalOpen &&
                <Modal onClose={closeModal}>{modalData}</Modal>
            }

            <div className="grid grid-cols-1 md:grid-cols-6 place-items-center">
                <div></div>
                <div className='grid grid-cols-1 xl:grid-cols-2 md:col-span-4 gap-x-5 gap-y-8 my-5 p-5' id='posts'>
                    {posts.map((post: PostType) => {
                        return (
                            <Card maxW='md' key={post._id}>
                                <CardBody>
                                    <Image
                                        src={post.posterImage.url}
                                        width={420}
                                        height={100}
                                        quality={100}
                                        alt={post.posterImage.alt}
                                        className='rounded-md max-h-60'
                                    />
                                    <Stack mt='6' spacing='3'>
                                        <Link href={`/post/${post.slug}`}><Text className='text-base md:text-lg font-semibold line-clamp-2'>{post.title}</Text></Link>
                                        <Text className='leading-5 text-gray-500 text-xs md:text-sm text-justify line-clamp-2'>{post.subtitle}</Text>
                                        <Flex justifyContent='space-between' className='mt-2'>
                                            <Flex gap='3' alignItems='center' flexWrap='wrap'>
                                                <Image
                                                    src={post.author.profileImage.url}
                                                    width={50}
                                                    height={50}
                                                    quality={100}
                                                    alt={post.author.profileImage.alt}
                                                    className='rounded-full'
                                                />
                                                <Box>
                                                    <Text className='text-xs md:text-sm font-semibold'>{post.author.name}</Text>
                                                    <Text className='text-xs md:text-xs font-semibold line-clamp-1'><span className='text-gray-500'>in</span> {post.author.organization}</Text>
                                                </Box>
                                            </Flex>
                                            <div className='flex p-2 border-gray-500 border-1 cursor-pointer'>
                                                {!bookmarkedPosts?.includes(post._id) ?
                                                    (<svg onClick={() => userContext?.loggedUser ? bookmark(post._id) : openModal(<p>Please login to bookmark the blog<br /><Link href="/login" className='text-blue-600 my-5'>Login</Link></p>)}
                                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                                    </svg>) :
                                                    (<svg onClick={() => userContext?.loggedUser ? removeBookmark(post._id) : openModal(<p>Please login to remove bookmark<br /><Link href="/login" className='text-blue-600 my-5'>Login</Link></p>)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                        <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
                                                    </svg>)
                                                }
                                            </div>
                                        </Flex>
                                    </Stack>
                                </CardBody>
                            </Card>
                        )
                    })}
                </div>
                <div></div>
            </div>
        </>
    )
}

export default Posts