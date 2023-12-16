'use client'
import { redirect, useRouter } from 'next/navigation'
import useAuth from '@/context/useAuth'




export default function ProtectedPageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { authStatus } = useAuth()
    const router = useRouter()
    if (!authStatus) {
        redirect("/auth/login")
        return <></>;
    }
    return <div className='flex flex-col'>
        {children}
    </div>;
}
