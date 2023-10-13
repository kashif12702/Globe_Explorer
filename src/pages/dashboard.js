import React, { useEffect } from 'react'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Navbar from './../components/Navbar'
import CountrySearcher from '../components/CountrySearch/CountrySearcher';

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
            <CountrySearcher />
        </>
    )
}

export default dashboard

