import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import DashboardHeader from "./_components/DashboardHeader";
import { AuthProvider } from "@/context/useAuth";
import DashboardSidebar from "./_components/DashboardSidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex bg-[#D3E7F0]">
            <div className="p-2">
            <DashboardSidebar />
            </div>
            <div className="w-full">
               <div className="p-2">
               <DashboardHeader />
               </div>
                {children}
            </div>
        </div>
    );
}
