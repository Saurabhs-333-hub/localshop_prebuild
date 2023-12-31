"use client";
import appwriteService from "@/appwrite/config";
import useAuth from "@/context/useAuth";
import { Card } from "@nextui-org/react";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const LogoutPage = () => {
    const { setAuthStatus } = useAuth();
    const router = useRouter()
    useEffect(() => {
        appwriteService.logoutUser()
            .then(() => {
                setAuthStatus(false);
                router.replace("/auth/login");
            })
    }, []);

    return (
        <>
            <Card>
                <h1>Logging out...</h1>
            </Card>
        </>
    )
}


export default LogoutPage;