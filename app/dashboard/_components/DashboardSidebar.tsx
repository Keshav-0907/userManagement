'use client'
import React from "react";
import {
    Users,
    House,
    Building,
    Receipt,
    Landmark,
    ChartLine,
} from "lucide-react";
import { usePathname } from "next/navigation";

const dashboardItems = () => [
    {
        name: "Dashboard",
        icon: <House size={16} />,
        link: "/dashboard",
    },
    {
        name: "All Users",
        icon: <Users size={16} />,
        link: "/dashboard/users",
    },
    {
        name: "All Organisations",
        icon: <Building size={16} />,
        link: "/dashboard/organisations",
    },
    {
        name: "Accounting & Billing",
        icon: <Receipt size={16} />,
        link: "/dashboard/accounting",
    },
    {
        name: "Tokens & API",
        icon: <Landmark size={16} />,
        link: "/dashboard/tokens",
    },
    {
        name: "Attendance",
        icon: <ChartLine size={16} />,
        link: "/dashboard/attendance",
    },
    {
        name: "Notifications",
        icon: <ChartLine size={16} />,
        link: "/dashboard/notifications",
    },
    {
        name: "Logout",
        icon: <ChartLine size={16} />,
        link: "/logout",
    },
];

const DashboardSidebar = () => {
    const pathname = usePathname();

    return (
        <div className="bg-[#034F75] h-[calc(100vh-16px)] rounded-lg w-60 py-5">
            <div className="flex items-center justify-center font-semibold text-white">Dashboard</div>

            <div className="flex flex-col gap-2 py-5 px-2">
                {dashboardItems().map((item, index) => {
                    const isActive = pathname === item.link;
                    return (
                        <div
                            key={index}
                            className={`flex cursor-pointer items-center gap-2 p-2 rounded-md text-white hover:bg-[#FFFFFF] hover:text-[#034F75] ${
                                isActive ? 'bg-white text-[#034F75]' : ''
                            }`}
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DashboardSidebar;
