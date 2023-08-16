import { UserContext } from "@/pages/_app";
import { getLocalStorage, removeLocalStorage } from "@/utils/storage";
import Link from "next/link"
import { useRouter } from "next/router";
import { useContext, useEffect } from 'react'

const Header = () => {
    const router = useRouter();
    const loggedUserContext = useContext(UserContext);

    useEffect(() => {
        let user: string = getLocalStorage('loggedUser');
        loggedUserContext?.setLoggedUser(user);
    }, [])

    const logout = () => {
        removeLocalStorage('loggedUser');
        loggedUserContext?.setLoggedUser('');
        router.push('/');
    }

    return (
        <nav className='border flex justify-between align-center px-2 md:px-20 py-5'>
            <div>
                <Link href='/'><span className='text-xl md:text-2xl font-semibold'><span className="text-gray-500">Teal</span>Feed</span></Link>
            </div>
            {loggedUserContext?.loggedUser ?
                (<div>
                    <Link href='/saved-blogs' className='text-sm md:text-l hover:text-blue-600 mx-3'>Bookmarked Blogs</Link>
                    <span className="px-3">{loggedUserContext?.loggedUser}</span>
                    <button className="text-sm border text-red-500 border-red-500 rounded-full px-2 md:px-5 md:py-1 vertical-center" onClick={logout}>Logout</button>
                </div>
                ) :
                (<Link href='/login' className="text-sm border border-gray-300 rounded-full px-5 py-1 vertical-center">Sign In</Link>)
            }
        </nav >
    )
}

export default Header
