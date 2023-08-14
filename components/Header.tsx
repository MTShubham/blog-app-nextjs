import { getLocalStorage, removeLocalStorage } from "@/utils/storage";
import Link from "next/link"
import { useEffect, useState } from 'react'

const Header = () => {
    let [loggedUser, setLoggedUser] = useState<string>('');

    useEffect(() => {
        let localUser = getLocalStorage('loggedUser');
        if (localUser) {
            setLoggedUser(localUser);
        }
    }, [])

    const logout = () => {
        removeLocalStorage('loggedUser');
        setLoggedUser('');
    }

    return (
        <nav className='border flex justify-between align-center px-2 md:px-20 py-5'>
            <Link href='/'><span className='text-xl md:text-2xl font-semibold'><span className="text-gray-500">Teal</span>Feed</span></Link>
            {loggedUser ?
                (<div>
                    <Link href='/saved-blogs' className='text-sm md:text-l hover:text-blue-600 mx-3'>Bookmarked Blogs</Link>
                    <button className="text-sm border text-red-500 border-red-500 rounded-full px-2 md:px-5 md:py-1 vertical-center" onClick={logout}>Logout</button>
                </div>
                ) :
                (<Link href='/login' className="text-sm border border-gray-300 rounded-full px-5 py-1 vertical-center">Sign In</Link>)
            }
        </nav >
    )
}

export default Header
