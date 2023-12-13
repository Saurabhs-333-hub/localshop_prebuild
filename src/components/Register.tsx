'use client'
import appwriteService from '@/appwrite/config'
import { Button, Card, CardFooter, CardHeader, Divider, Input } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

const Register = () => {
    const [formData, setformData] = React.useState({
        email: '',
        password: '',
        name: ''
    })
    const [error, setError] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await appwriteService.createUser(formData)
            setLoading(false)

        } catch (error: any) {
            const errorCode = error.code
            const errorMessage = error.message
            setError(errorMessage)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <div className="w-full flex flex-col justify-center items-center  mt-24">
                <h1 className='text-3xl font-bold'>Register</h1>
                <form action="" className=' flex flex-col w-1/4 gap-2' onSubmit={handleSubmit}>
                    <Card isBlurred className=" border-none bg-background/60 dark:bg-default-100/30  flex flex-col  gap-2 bg-gray-800  rounded-lg px-16 py-10 mt-10">
                        {error && <CardHeader className='text-red-700 text-ellipsis bg-danger-50 rounded-lg'>{error}</CardHeader>}
                        <Input type="text" label="Name" value={formData.name} isRequired onClear={() => {
                            setformData({ ...formData, name: '' })
                        }} isClearable onChange={(e) => {
                            setformData({ ...formData, name: e.target.value })
                        }} className="rounded-lg m-auto text-cyan-500 w-full outline-none active:bg-transparent hover:text-cyan-300 transition-all" />
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
                            <Button type="submit" color='primary' variant='flat' value="Login" className="p-2 px-10 w-auto cursor-pointer rounded-full m-auto text-white hover:text-cyan-300 transition-all" >{loading ? "Registering..." : "Register"}</Button>
                        </CardFooter>
                    </Card>
                </form>
                <div className="w-80 center justify-center items-center">
                    <Divider className='mt-10 bg-cyan-700'></Divider>
                </div>
                <span className='mt-8'>
                    Already have an account? <Link href="/auth/login" className="text-blue-500">Login</Link>
                </span>
            </div>
        </>
    )
}

export default Register