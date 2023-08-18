import Header from "@/components/Header";
import Posts from "@/components/posts"
import { REVALIDATE_TIME } from "@/utils/globalConstants";
import { getAllPosts } from "@/utils/sanityData";

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
  const posts = await getAllPosts();
  return {
    props: { posts },
    revalidate: REVALIDATE_TIME
  }
}   
