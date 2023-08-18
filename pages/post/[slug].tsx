import Header from "@/components/Header";
import sanityClient from "@/sanity/sanity.client";
import { groq } from "next-sanity";
import Image from "next/image";
import { Box, Flex, Text } from '@chakra-ui/react'
import { PortableText } from "@portabletext/react";
import RichTextComponents from "@/components/RichTextComponents";
import { getImageDimensions } from '@sanity/asset-utils';
import { REVALIDATE_TIME } from "@/utils/globalConstants";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../_app";
import { getLocalStorage } from "@/utils/storage";
import { bookmarkPost, isBookmarkedPost, removePostBookmark } from "@/utils/indexedDB";
import Link from "next/link";
import { getPostBySlug } from "@/utils/sanityData";
import Modal from "@/components/Modal";

const Post = ({ post }: any) => {
    const [isBookmarked, setIsBookmarked] = useState<Boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalData, setModalData] = useState<JSX.Element>(<></>);
    const userContext = useContext(UserContext);

    useEffect(() => {
        const user: string = getLocalStorage('loggedUser');
        userContext?.setLoggedUser(user)
    }, [])

    useEffect(() => {
        async function checkIfBookmarked() {
            const user: string = getLocalStorage('loggedUser');
            userContext?.setLoggedUser(user);
            const response = await isBookmarkedPost(user, post._id);
            if (response.status === 200)
                setIsBookmarked(response.success);
        }
        if (userContext?.loggedUser) {
            checkIfBookmarked();
        }
        else {
            setIsBookmarked(false)
        }
    }, [userContext?.loggedUser])

    const bookmark = async (postId: string) => {
        const user: string = getLocalStorage('loggedUser');
        userContext?.setLoggedUser(user)
        if (user) {
            const response = await bookmarkPost(user, postId);
            if (response.success) {
                setIsBookmarked(true);
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
            setIsBookmarked(false);
        }
    }

    const openModal = (value: JSX.Element) => {
        setIsModalOpen(true);
        setModalData(value)
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {isModalOpen &&
                <Modal onClose={closeModal}>{modalData}</Modal>
            }
            <Header />
            <div className='grid grid-cols-1 md:grid-cols-4 py-5 bg-slate-50'>
                <div></div>

                <div className="col-span-2 p-5">
                    <h1 className="text-2xl md:text-4xl font-semibold">{post.title}</h1>
                    <p className='leading-5 text-gray-500 text-base md:text-lg text-justify my-5'>{post.subtitle}</p>
                    <hr />
                    <div className='flex justify-between align-center'>
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
                        <div className='self-center'>
                            {!isBookmarked ?
                                (<svg onClick={() => userContext?.loggedUser ? bookmark(post._id) : openModal(<p>Please login to bookmark the blog<br /><Link href="/login" className='text-blue-600 my-5'>Login</Link></p>)}
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                </svg>) :
                                (<svg onClick={() => userContext?.loggedUser ? removeBookmark(post._id) : openModal(<p>Please login to remove bookmark<br /><Link href="/login" className='text-blue-600 my-5'>Login</Link></p>)}
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 cursor-pointer">
                                    <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
                                </svg>)
                            }
                        </div>
                    </div>

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
    const post = await getPostBySlug(params.slug);
    return {
        props: { post },
        revalidate: REVALIDATE_TIME
    }
}   