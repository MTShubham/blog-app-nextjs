import localStorageMock from '@/__mock__/localStorage';
import { getAllPosts } from '@/utils/sanityData';

const getPostsData = async () => {
    return await getAllPosts();
}

describe('Index page', () => {
    
    test('Getting all posts', async () => {
        let data = await getPostsData();
        expect(data).not.toHaveLength(0);
    });

    // test('Title of all the posts loaded or not', async () => {
    //     let data = await getPostsData();
    //     data.forEach((post) => {
    //         expect(post.title).not.toBeNull();
    //     });
    // })

    // test('Author of all the posts loaded or not', async () => {
    //     let data = await getPostsData();
    //     data.forEach((post) => {
    //         expect(post.author).not.toBeNull();
    //     });
    // })

    // test('Whether all the poster images of the post loaded or not', async () => {
    //     let data = await getPostsData();
    //     data.forEach((post) => {
    //         expect(post.posterImage.alt).not.toBeNull();
    //         expect(post.posterImage.url).not.toBeNull();
    //     });
    // })

    // test('Body of all the posts loaded or not', async () => {
    //     let data = await getPostsData();
    //     data.forEach((post) => {
    //         expect(post.body).not.toBeUndefined();
    //     });
    // })
});