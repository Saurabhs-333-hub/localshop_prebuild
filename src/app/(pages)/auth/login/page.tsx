'use client'
import Login from '@/components/Login'
import useAuth from '@/context/useAuth';
import {  redirect, useRouter } from 'next/navigation';
import React from 'react'

const Page = () => {
    const router = useRouter();
    const { authStatus } = useAuth();

    if (authStatus) {
        // router.replace("/profile");
        redirect("/profile")
        return <></>;
    }
    return (
        <div className='flex justify-center items-center'><Login /></div>
    )
}

export default Page