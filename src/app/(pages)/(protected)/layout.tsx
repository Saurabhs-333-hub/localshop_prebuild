'use client'
// import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import appwriteService from '@/appwrite/config'
import { useEffect, useState } from 'react'
import { redirect, useRouter } from 'next/navigation'
import useAuth from '@/context/useAuth'

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
        redirect("/auth/login")
        return <></>;
    }
    return children;
}
