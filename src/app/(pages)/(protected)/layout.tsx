'use client'
// import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import appwriteService from '@/appwrite/config'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useAuth from '@/context/useAuth'
import ProfileHeader from '@/components/ProfileHeader'

const inter = Inter({ subsets: ['latin'] })




export default function ProtectedPageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { authStatus } = useAuth()
    const router = useRouter()
    if (!authStatus) {
        // router.replace("/auth/login");
        router.replace("/auth/login")
        return <></>;
    }
    return <div className='flex flex-col'>
        {children}
    </div>;
}
