import { openDB } from 'idb';

type User = {
    username: string,
    password: string
}

export async function initIndexedDB() {
    const db = await openDB('blogs', 2, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('users')) {
                db.createObjectStore('users', { keyPath: 'username' });
            }
            if (!db.objectStoreNames.contains('bookmarks')) {
                db.createObjectStore('bookmarks', { keyPath: 'username' });
            }
        },
    });
    return db;
}

export async function saveUser(db, user: User) {
    const transaction = await db.transaction('users', 'readwrite');
    let users = transaction.objectStore('users');
    const request = await users.add(user);
    if (request) {
        return { success: true, msg: 'Created an user account' };
    }
    else {
        return { success: false, msg: 'Error in creating user' };
    }
}

export async function loginUser(db, user: User) {
    const transaction = await db.transaction('users', 'readonly');
    let users = transaction.objectStore('users');
    const foundUser = await users.get(user.username);
    if (foundUser.password === user.password && foundUser !== undefined) {
        return { success: true, msg: 'Successful login' };
    }
    else {
        return { success: false, msg: 'Invalid credentials' };
    }
}

export async function getBookmarkedPosts(db, username: string) {
    const transaction = await db.transaction('bookmarks', 'readwrite');
    let bookmarks = transaction.objectStore('bookmarks');
    let userBookmarks = await bookmarks.get(username);
    let postIds = userBookmarks;
    if (userBookmarks) {
        ({ postIds } = userBookmarks);
        return { success: true, postIds };
    }
    return { success: false, msg: 'Unable to fetch bookmarked posts' };
}

export async function removePostBookmark(db, username: string, postId: string) {
    const transaction = await db.transaction('bookmarks', 'readwrite');
    let bookmarks = transaction.objectStore('bookmarks');
    let userBookmarks = await bookmarks.get(username);
    let { postIds } = userBookmarks;
    let postIdsAfterRemoval = postIds.filter((id: string) => postId !== id)
    const request = await bookmarks.put({ username, postIds: postIdsAfterRemoval });
    if (request) {
        return { success: true, postIds: postIdsAfterRemoval };
    }
    else {
        return { success: false, msg: 'Unable to remove bookmark' };
    }
}

export async function bookmarkPost(db, username: string, postId: string) {
    const transaction = await db.transaction('bookmarks', 'readwrite');
    let bookmarks = transaction.objectStore('bookmarks');
    let userBookmarks = await bookmarks.get(username);
    let postIds;
    if (userBookmarks) {
        ({ postIds } = userBookmarks);
    }
    else {
        postIds = [];
    }
    console.log(postIds.length, postIds);
    postIds.push(postId);
    const request = await bookmarks.put({ username, postIds: postIds });
    if (request) {
        return { success: true, postIds };
    }
    else {
        return { success: false, msg: 'Unable to bookmark' };
    }
}   