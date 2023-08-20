import { UserContext } from "@/pages/_app";
import { getLocalStorage, removeLocalStorage } from "@/utils/storage";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from 'react';

const Header = () => {
    const router = useRouter();
    const loggedUserContext = useContext(UserContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        let user = getLocalStorage('loggedUser');
        loggedUserContext?.setLoggedUser(user);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const logout = () => {
        removeLocalStorage('loggedUser');
        loggedUserContext?.setLoggedUser('');
        router.push('/');
        setIsMobileMenuOpen(false); // Close the mobile menu after logout
    };

    return (
        <nav className={`md:flex md:justify-between md:items-center px-2 md:px-20 py-5 ${isMobileMenuOpen ? 'md:hidden' : ''}`}>
            <div className='pl-3 md:pl-0 flex justify-between items-center'>
                <Link href='/'>
                    <span className='text-xl md:text-2xl font-semibold'>
                        <span className="text-gray-500">Teal</span>Feed
                    </span>
                </Link>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="cursor-pointer md:hidden w-6 h-6"
                    onClick={toggleMobileMenu}
                >
                    {isMobileMenuOpen ? (
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    ) : (
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M3 12h18M3 6h18M3 18h18"
                        />
                    )}
                </svg>
            </div>

            <ul className={`md:flex md:items-center pl-3 ${isMobileMenuOpen ? 'block' : 'hidden'} transition-opacity duration-300 opacity-${isMobileMenuOpen ? '100' : '0'}`}>
                {loggedUserContext?.loggedUser ? (
                    <>
                        <li className='my-4 md:my-0'>
                            <Link href='/saved-blogs' className='text-sm md:text-l hover:text-blue-600 md:mx-3'>
                                Bookmarked Blogs
                            </Link>
                        </li>
                        <li className='my-4 md:my-0'>
                            <span className="md:px-3 flex"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 md:mx-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>{loggedUserContext?.loggedUser}</span>
                        </li>
                        <li className='my-4 md:my-0'>
                            <button
                                className="text-sm border text-red-500 border-red-500 rounded-full px-2 md:px-5 md:py-1 vertical-center"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <li className='my-4 md:my-0'>
                        <Link href='/login' className="text-sm border border-gray-300 rounded-full px-5 py-1 vertical-center">
                            Sign In
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Header;