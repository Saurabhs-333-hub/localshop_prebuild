import { useRouter } from 'next/navigation'
import React from 'react'

const Intro = () => {
    const router = useRouter()
    return (
        <div className=' w-full flex flex-col justify-center gap-10 items-center'>
            <h1 className="text-8xl">Localshop</h1>
            <button className="p-2 bg-slate-700 rounded-lg m-auto text-white hover:border-white hover:border-2  transition-all" onClick={
                () => {
                    router.push('/auth/login')
                }
            }>Get Started</button>

        </div>
    )
}

export default Intro