'use client'
import appwriteService from "@/appwrite/config";
import Countries from "@/components/Countries";
import Intro from "@/components/Intro";
import { Models } from "appwrite";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Home() {
    return (
        <main className="flex min-h-screen items-center justify-between p-24">
            <Intro />
        </main>
    )
}
