import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Sidebar from "./_components/Sidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex w-full">
            <Sidebar />
            <div className="w-full">{children}</div>
        </div>
    );
}
