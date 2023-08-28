import { bookmarkPost, getBookmarkedPosts, initIndexedDB, isBookmarkedPost, isMaxBookmarkLimitReached, loginUser, removePostBookmark, saveUser } from "@/utils/indexedDB";
import { mockUsers } from '../__mock__/mockUsers'
require("fake-indexeddb/auto");

const user = { username: 'Abc', password: 'asd' };

describe('authenticity', () => {

    test('user signup', () => {
        mockUsers.forEach(async (mockUser) => {
            const response = await saveUser(mockUser);
            expect(response.success).toBe(true);
        })
    })

    test('user to be login', async () => {
        const response = await loginUser(user);
        expect(response.success).not.toBeFalsy();
        localStorage.setItem('loggedUser', user.username);
    })

    test('bookmark the post only if user loggedin', async () => {
        const user = localStorage.getItem('loggedUser');
        if (user) {
            const response = await bookmarkPost(user, '303dff72-129a-47eb-89b7-7833dcc2a246');
            expect(response.success).toBe(true)
        }
    })

    test('check if post is bookmarked by user or not', async () => {
        const user = localStorage.getItem('loggedUser');
        if (user) {
            const response = await isBookmarkedPost(user, '303dff72-129a-47eb-89b7-7833dcc2a246');
            expect(response.success).toBe(true)
        }
    })

    test('remove bookmark only if user loggedin', async () => {
        const user = localStorage.getItem('loggedUser');
        if (user) {
            const response = await removePostBookmark(user, '303dff72-129a-47eb-89b7-7833dcc2a246');
            expect(response.success).toBe(true)
        }
    })

    test('check if maximum limit for bookmark has been reached', async () => {
        const user = localStorage.getItem('loggedUser');
        if (user) {
            const bookmarkedPosts = await getBookmarkedPosts(user);
            const isMaxLimitReached = isMaxBookmarkLimitReached(bookmarkedPosts.postIds)
            expect(isMaxLimitReached).toBe(false);
        }
    })

})