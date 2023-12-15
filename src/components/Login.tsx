'use client'
import appwriteService from '@/appwrite/config'
import { login } from '@/features/authSlice'
import errorComponentsExtractor from '@/json/methods'
import { AppDispatch } from '@/redux_material/store'
import Modals from '@/widgets/Modal'
import { Button, Card, CardFooter, CardHeader, Divider, Input } from '@nextui-org/react'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import { NextResponse } from 'next/server'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux";

// const user = useSelector((state: any) => state.auth.value.isAuth)


const Login = () => {
    const [formData, setformData] = React.useState({
        email: '',
        password: '',
    })
    const [errorTitle, setErrorTitle] = React.useState('')
    const [errorDescription, setErrorDescription] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setErrorTitle('')
            setErrorDescription('')
            setLoading(true)
            await appwriteService.loginUser(formData)
            dispatch(login(formData))
            setLoading(false)
            const res = NextResponse.json({
                message: 'Login successful'

            })
            res.cookies.set('token', 'token', {
                httpOnly: true,
            })
            router.replace('/')
            console.log(res)

            return res
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
    return (
        <>
            <div className="w-full flex flex-col justify-center items-center mt-24">
                <h1 className='text-3xl font-bold'>Login</h1>
                <form action="" className=' flex flex-col max-w-full gap-2' onSubmit={handleSubmit}>
                    <Card isBlurred className=" border-none bg-background/60 dark:bg-default-100/30  flex flex-col  gap-2 bg-gray-800  rounded-lg px-16 py-10 mt-10">
                        {/* {error && <CardHeader className='text-red-700 text-ellipsis bg-danger-50 rounded-lg'>{error}</CardHeader>} */}

                        <Input type="email" label="Email" value={formData.email} isRequired onClear={() => {
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
                            <Button type="submit" color='primary' variant='flat' value="Login" className="p-2 px-10 w-auto cursor-pointer rounded-full m-auto text-white hover:text-cyan-300 transition-all" >{loading ? "Logging In" : "Login"}</Button>
                        </CardFooter>
                    </Card>
                </form>
                <div className="w-80 center justify-center items-center">
                    <Divider className='mt-10 bg-cyan-700'></Divider>
                </div>
                <span className='my-8'>
                    Don&apos;t have an account? <Link href="/auth/signup" className="text-blue-500">Signup</Link>
                </span>
                {errorTitle && <Modals text={errorDescription} title={errorTitle} bodyColor={
                    'text-red-200'
                } headerColor={'text-red-700'} footerColor={'bg-transparent'} action={false} />}
            </div>
        </>
    )
}

export default Login

// export {user}