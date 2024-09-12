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

export default function Home() {
    const router = useRouter();
    const authContext = useContext(AuthContext);
    const { user } = authContext;

    if (user) {
        router.push("/dashboard");
    }

    console.log('user', user)

    return (
        <div className="flex items-center justify-center h-screen w-screen">
            <div className="w-1/2">
                <Tabs defaultValue="account" className="">
                    <TabsList className="w-full">
                        <TabsTrigger value="account" className="w-full">
                            Super Admin Login
                        </TabsTrigger>
                        <TabsTrigger value="password" className="w-full">
                            Organisation Admin Login
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        <SuperAdmin />
                    </TabsContent>
                    <TabsContent value="password">
                        <OrganisationAdminLogin/>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
