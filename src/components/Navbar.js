import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const Navbar = () => {
    const router = useRouter();
    console.log(router.asPath)
    return (
        <>
            <main className="fixed top-0 w-full sm:px-8 px-4 py-2 bg-[#F4F6F8] shadow-sm bg-opacity-60 backdrop-filter backdrop-blur-lg text-[#202226] z-[999]">
                <div className="flex items-center justify-between">
                    <Link href="/">
                        <h2 className='text-2xl font-bold'>
                            Globe Explorer
                        </h2>
                    </Link>
                    <div>

                        {
                            router.asPath === "/" &&
                            <Link href="/login">
                                <button className='white-button rounded'>Login</button>
                            </Link>
                        }
                        {
                            router.asPath === "/dashboard" &&

                            <Link href="/login">
                                <button className='white-button rounded' onClick={() => { Cookies.remove('token'); }}>Logout</button>
                            </Link>
                        }
                    </div>
                </div>
            </main>
        </>
    )
}

export default Navbar
