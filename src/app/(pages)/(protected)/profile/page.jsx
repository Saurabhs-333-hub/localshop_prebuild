'use client'
import appwriteService from '@/appwrite/config'
import useAuth from '@/context/useAuth';
import { Button } from '@nextui-org/react';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import Profile from '@/components/Profile'

const Page = () => {


  return (
    <>
      <Profile />
    </>
  )
}

export default Page