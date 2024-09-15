"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState, useContext } from "react";
import Dashboard from "./dashboard/page";
import SuperAdmin from "./_components/SuperAdminLogin";
import AuthContext from "@/context/useAuth";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrganisationAdminLogin from "./_components/OrganisationAdminLogin";
import SuperAdminLogin from "./_components/SuperAdminLogin";

export default function Home() {
    const router = useRouter();
    const authContext = useContext(AuthContext);
    const { user } = authContext;

    if (user) {
        router.push("/dashboard");
    }

    console.log('user', user)

    return (
       <SuperAdminLogin/>
    );
}
