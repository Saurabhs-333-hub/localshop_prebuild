'use client'
import appwriteService from '@/appwrite/config'
import useAuth from '@/context/useAuth'
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image } from '@nextui-org/react'
import { Models } from 'appwrite'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Profile = () => {
    const [user, setUser] = useState<Models.Document>()
    const [loader, setLoader] = React.useState(false)
    const router = useRouter()
    const { setAuthStatus } = useAuth()
    const handleLogout = async () => {
        setLoader(true)
        router.replace('/auth/logout')
        setLoader(false)
    }
    useEffect(() => {
        (async () => {
            const res = await appwriteService.getUserData()
            setUser(res)
            console.log(res.profilePic)
        })()
    }, [])
    return (
        <>
            {/* <Dropdown placement="bottom">
                <DropdownTrigger>
                    <Avatar isBordered
                        as="button"
                        size='lg'
                        className="transition-transform" src={user?.profilePic}>
                        {user?.name}
                    </Avatar>
                </DropdownTrigger>
                <DropdownMenu variant='flat'>
                    <DropdownItem className='text-success' color='success'>Seller Account</DropdownItem>
                    <DropdownItem showDivider>Settings</DropdownItem>
                    <DropdownItem description="This will logout you!" onClick={handleLogout} className='text-danger' color='danger'>Logout</DropdownItem>
                </DropdownMenu>
            </Dropdown> */}
        </>
    )
}

export default Profile