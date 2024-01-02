'use client'
import { redirect, useRouter } from 'next/navigation'
import useAuth from '@/context/useAuth'
import { useEffect } from 'react'
import Header from '@/components/Header'




export default function ProtectedPageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { authStatus } = useAuth()
    const router = useRouter()
    useEffect((): any => {
        if (!authStatus) {
            // router.replace("/auth/login");
            redirect("/auth/login")
            return <></>;
        }
    }
    );
    // if (!authStatus) {
    //     redirect("/auth/login")
    //     return <></>;
    // }
    return <div className='flex flex-col w-screen'>
        <Header/>
        {children}
    </div>;
}
