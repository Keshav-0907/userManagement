"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import Dashboard from "./dashboard/page";
import SuperAdmin from "./_components/SuperAdmin";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Home() {
    const { isAuthorised, loading } = useAuth();
    const router = useRouter();
    console.log("hhehe", isAuthorised);

    // if(isAuthorised && !loading){
    //     router.push('/dashboard');
    // }
    return (
        <div>
            <SuperAdmin />
        </div>
    );
}
