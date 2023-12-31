'use client'
// import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import appwriteService from '@/appwrite/config'
import { useEffect, useState } from 'react'
import { AuthProvider } from '@/context/AuthContext'
import ProfileHeader from '@/components/ProfileHeader'

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//     title: 'Create Next App',
//     description: 'Generated by create next app',
// }


export default function PageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [authStatus, setAuthStatus] = useState(false);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        appwriteService.isLoggedIn()
            .then(setAuthStatus)
            .finally(() => setLoader(false));
    }, []);
    return (

        <div className='flex flex-col'>
            <ProfileHeader/>
            <div className="flex item-center justify-center w-full h-screen">
                {children}
            </div>
        </div>

    )
}
