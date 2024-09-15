"use client";
import React, { useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AuthContext from "@/context/useAuth";

const DashboardHeader = () => {
    const authContext = useContext(AuthContext);
    const { loading, logout, user } = authContext || {};

    return (
        <div className="flex justify-end p-2 items-center gap-2 border-b-2 rounded-lg bg-[#034F75]">
            <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 bg-gray-200 p-1 rounded-lg">
                    <Avatar className="flex justify-end h-8 w-8">
                        <AvatarImage
                            src="https://github.com/shadcn.png"
                            className=""
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    {user && user.role === "superadmin" ? (
                        <Label>Hi, Super Admin</Label>
                    ) : (
                        <Label>Hi, Organisation Admin</Label>
                    )}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Account Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>
                        Log Out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default DashboardHeader;
