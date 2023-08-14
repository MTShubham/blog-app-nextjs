import { FormEventHandler, useState } from 'react';
import Link from 'next/link';
import { initIndexedDB, saveUser } from '@/utils/indexedDB';
import { useRouter } from 'next/router';
import { setLocalStorage } from '@/utils/storage';

const Signup = () => {
    const [user, setUser] = useState({ username: "", password: "" });
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const db = await initIndexedDB();
        const response = await saveUser(db, user);
        if(response.success) {
            setLocalStorage('loggedUser', user.username);
            router.push('/');
        }
        else {
            setError(response.msg);
        }
    }

    return (
        <div className='flex justify-center align-center'>
            <form onSubmit={handleSubmit} className='flex flex-col w-80 my-60 border border-gray-300 p-6 rounded'>
                {error && (<p className='text-center text-red-600 font-semibold'>{error}</p>)}
                <h2 className='text-center font-semibold text-2xl my-5 text-gray-500'>Sign Up</h2>
                <input type="text" placeholder="Username" className='border border-gray-300 rounded px-3 py-1 outline-green-500 my-3' onChange={(e) => { setUser({ ...user, username: e.target.value }) }} />
                <input type="password" placeholder="Password" className='border border-gray-300 rounded px-3 py-1 outline-green-500 my-3' onChange={(e) => setUser({ ...user, password: e.target.value })} />
                <input type="submit" value="SignUp" className='border self-center py-1 px-3 rounded my-3 cursor-pointer' />
                <p className='text-sm my-3'>Already have an account? <Link href='/login' className='text-blue-600'>Login</Link></p>
            </form>
        </div>
    )
}

export default Signup
