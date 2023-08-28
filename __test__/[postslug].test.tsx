import { getPostBySlug } from '@/utils/sanityData';

const getPost = async () => {
    return await getPostBySlug('why-stop-doubting-and-start-believing-in-yourself');
}

describe('Post page', () => {

    test('Getting the post data using slug', async () => {
        let post = await getPost();
        expect(post).not.toBeUndefined();
    });

    // test('Whether title of the post fetched or not', async () => {
    //     let post = await getPost();
    //     expect(post.title).not.toBeNull();
    // });

    // test('Whether author data of the post fetched or not', async () => {
    //     let post = await getPost();
    //     console.log(post.author)
    //     expect(post.author).not.toBeNull();
    // });

    // test('Whether posterImage of the post fetched or not', async () => {
    //     let post = await getPost();
    //     expect(post.posterImage.alt).not.toBeNull();
    //     expect(post.posterImage.url).not.toBeNull();
    // });

    // test('Whether body of the post fetched or not', async () => {
    //     let post = await getPost();
    //     expect(post.body).not.toBeUndefined();
    // });

});