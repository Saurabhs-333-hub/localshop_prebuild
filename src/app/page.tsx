'use client'
import appwriteService from "@/appwrite/config";
import Countries from "@/components/Countries";
import Intro from "@/components/Intro";
import { Models } from "appwrite";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Home() {
    // const user = useSelector((state: any) => JSON.stringify(state.value.isAuth))
    let user: any;
    const fetchUser = async () => {
        const res = await appwriteService.getUser()
        console.log(res)
        user = res;
        return res
    }
    useEffect(() => {

        const user = fetchUser()
        console.log(user)

    });
    return (
        <main className="flex min-h-screen items-center justify-between p-24">
            <div className="bg-gray-800 text-white p-2">{JSON.stringify(user)}</div>
            <Intro />
        </main>
    )
}
