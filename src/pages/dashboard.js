import React, { useEffect } from 'react'
import Index from '../components/CountrySearch'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Navbar from './../components/Navbar'

const dashboard = () => {
    const router = useRouter();
    useEffect(() => {
        if (typeof Cookies.get('token') === 'undefined') {
            router.replace("/login")
        }
    }, [])
    return (
        <>
            <Navbar />
            <Index />
        </>
    )
}

export default dashboard

