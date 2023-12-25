'use client'
import appwriteService, { storage } from '@/appwrite/config'
import Modals from '@/widgets/Modal'
import { Button, Card, CardFooter, CardHeader, Divider, Image, Input } from '@nextui-org/react'
import Link from 'next/link'
import React, { useRef } from 'react'
import errorComponentsExtractor from "@/json/methods.js";
import NextImage from 'next/image'
import { useRouter } from 'next/navigation'
import avatar from '@/assets/user_avatar.png'
import { Client, Account, ID, Databases, Storage } from "appwrite";
import { v4 } from "uuid";
const Register = () => {
    const [formData, setformData]: any = React.useState({
        email: '',
        password: '',
        name: '',
        profileImage: {
            id: '',
            file: ''
        }
    })
    const [errorTitle, setErrorTitle] = React.useState('')
    const [errorDescription, setErrorDescription] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [image, setImage]: any = React.useState("")
    const router = useRouter()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setErrorTitle('')
            setErrorDescription('')
            setLoading(true)
            await appwriteService.createUser(formData)
            setLoading(false)
            router.replace('/auth/login')
        } catch (error: any) {
            const errorCode = error.code
            const errorMessage = error.message
            const { title, description }: any = errorComponentsExtractor(error.message)
            setErrorTitle(title)
            setErrorDescription(description)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }
    const validateEmail = (value: any) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

    const isInvalid = React.useMemo(() => {
        let value = formData.email;
        if (value === "") return false;

        return validateEmail(value) ? false : true;
    }, [formData.email]);
    const refs = useRef<HTMLInputElement>(null)
    return (
        <>
            <div className="flex flex-col justify-center items-center  mt-24">
                <h1 className='text-3xl font-bold'>Register</h1>
                <form action="" className=' flex flex-col max-w-full gap-2' onSubmit={handleSubmit}>
                    <Card isBlurred className=" border-none bg-background/60 dark:bg-default-100/30  flex flex-col  gap-2 bg-gray-800  rounded-lg px-16 py-10 mt-10">
                        <CardHeader className='text-cyan-500 flex flex-wrap gap-2 text-ellipsis bg-transparent rounded-lg'>
                            <Image
                                as={NextImage}
                                width={100}
                                height={50}
                                src={image || avatar.src}
                                priority={true}
                                alt="NextUI hero Image"
                            />
                            <input type="file" ref={refs} onChange={async (e) => {
                                // console.log(formData)
                                let file = e.target.files![0]
                                await setImage(URL.createObjectURL(file))
                                let id = v4()
                                console.log(id)
                                setformData({ ...formData, profileImage: { id: id, file: file } })
                                console.log(formData)
                            }} className="rounded-lg m-auto hidden text-cyan-500 w-full outline-none active:bg-transparent hover:text-cyan-300 transition-all" />
                            <Button onClick={() => {
                                refs.current!.click()
                            }} color='primary' variant='flat' className='text-white hover:text-cyan-300 transition-all' >Choose Profile Image</Button>
                        </CardHeader>
                        {/* {error && <CardHeader className='text-red-700 text-ellipsis bg-danger-50 rounded-lg'>{error}</CardHeader>} */}
                        <Input type="text" label="Name" value={formData.name}
                            isRequired onClear={() => {
                                setformData({ ...formData, name: '' })
                            }} isClearable onChange={(e) => {
                                setformData({ ...formData, name: e.target.value })
                            }} className="rounded-lg m-auto text-cyan-500 w-full outline-none active:bg-transparent hover:text-cyan-300 transition-all" />
                        <Input type="email" label="Email"
                            isInvalid={isInvalid}
                            color={isInvalid ? "danger" : "default"}
                            errorMessage={isInvalid && "Please enter a valid email"} value={formData.email} isRequired onClear={() => {
                                setformData({ ...formData, email: '' })
                            }} isClearable onChange={(e) => {
                                setformData({ ...formData, email: e.target.value })
                            }} className="rounded-lg m-auto text-cyan-500 w-full outline-none active:bg-transparent hover:text-cyan-300 transition-all" />
                        <Input type="password" label="Password" value={formData.password} isRequired onClear={
                            () => {
                                setformData({ ...formData, password: '' })
                            }
                        } isClearable onChange={(e) => {
                            setformData({ ...formData, password: e.target.value })
                        }} className="rounded-lg m-auto text-cyan-500 w-full outline-none active:bg-transparent hover:text-cyan-300 transition-all" />
                        <CardFooter>
                            <Button type="submit" color='primary' variant='flat' isDisabled={loading ? true : false} value="Login" className="p-2 px-10 w-auto cursor-pointer rounded-full m-auto text-white hover:text-cyan-300 transition-all" >{loading ? "Registering..." : "Register"}</Button>
                        </CardFooter>
                    </Card>
                </form>
                <div className="w-80 center justify-center items-center">
                    <Divider className='mt-10 bg-cyan-700'></Divider>
                </div>
                <span className='mt-8'>
                    Already have an account? <Link href="/auth/login" className="text-blue-500">Login</Link>
                </span>
                {errorTitle && <Modals text={errorDescription} title={errorTitle} bodyColor={
                    'text-red-200'
                } headerColor={'text-red-600'} footerColor={'bg-transparent'} action={false} />}
            </div>
        </>
    )
}

export default Register