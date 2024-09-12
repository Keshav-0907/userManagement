'use client';
import React from "react";
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
import useAuth from "@/hooks/useAuth";

const DashboardHeader = () => {
    const {logout} = useAuth()
    return (
        <div className="flex justify-end p-2 items-center gap-2 border-b-2 shadow-md">
            <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 bg-gray-200 p-1 rounded-lg">
                    <Avatar className="flex justify-end h-8 w-8">
                        <AvatarImage
                            src="https://github.com/shadcn.png"
                            className=""
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Label>Hi, Super Admin</Label>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Account Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>Log Out</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default DashboardHeader;
