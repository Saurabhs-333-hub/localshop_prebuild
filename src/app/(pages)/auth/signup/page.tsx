'use client'
import Login from '@/components/Login'
import Register from '@/components/Register'
import useAuth from '@/context/useAuth';
import { useRouter } from 'next/navigation';
import React from 'react'

const Page = () => {
  const router = useRouter();
  const { authStatus } = useAuth();

  if (authStatus) {
    router.replace("/profile");
    return <></>;
  }
  return (
    <div className='flex justify-center items-center'><Register /></div>
  )
}

export default Page