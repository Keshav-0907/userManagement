import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import DashboardHeader from "./_components/DashboardHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <DashboardHeader/>
        {children}
      </body>
    </html>
  );
}
