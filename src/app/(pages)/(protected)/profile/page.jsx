'use client'
import appwriteService from '@/appwrite/config'
import useAuth from '@/context/useAuth';
import { Button } from '@nextui-org/react';
import { redirect, useRouter } from 'next/navigation';
import React, { use } from 'react'

const Page = () => {
  const [loader, setLoader] = React.useState(false)
  const router = useRouter()
  const { setAuthStatus } = useAuth()
  const handleLogout = async () => {
    setLoader(true)
    await appwriteService.logoutUser();
    // setAuthStatus(false)
    setLoader(false)
    router.replace('/auth/login')
  }
  return (
    <>
      <div>Page</div>
      <Button color="primary" variant="light" onClick={handleLogout}>
        {loader ? 'Logging out...' : 'Logout'}
      </Button>
    </>
  )
}

export default Page