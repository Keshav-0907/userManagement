"use client";
import React from "react";
import { format } from "date-fns";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const DashboardTable = ({ organisations, onDeleteOrganization }) => {
    // Function to handle viewing full organization details
    const handleDeleteOrganization = (organizationId) => {
        if (
            window.confirm("Are you sure you want to delete this organization?")
        ) {
            onDeleteOrganization(organizationId);
        }
    };

    const handleViewMembers = (organizationId) => {
        console.log(`Viewing members of organization ID: ${organizationId}`);
    };

    console.log("organisations", organisations);

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[150px]">Organization</TableHead>
                    <TableHead>Admin</TableHead>
                    <TableHead> Admin Email </TableHead>
                    <TableHead>Members</TableHead>
                    <TableHead>Created On</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {organisations.length > 0 ? (
                    organisations.map((org) => (
                        <TableRow key={org._id}>
                            <TableCell className="font-medium">
                                {org.name}
                            </TableCell>
                            <TableCell>{org.adminName}</TableCell>
                            <TableCell>{org.adminEmail}</TableCell>
                            <TableCell>{org.allMembers.length - 1}</TableCell>
                            <TableCell>
                                {format(new Date(org.createdOn), "yyyy-MM-dd")}
                            </TableCell>
                            <TableCell className="text-right space-x-2">
                                <Link
                                    // target="_blank"
                                    className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                                    href={`/dashboard/${org._id}`}
                                >
                                    View Members
                                </Link>
                                <Button
                                    onClick={() =>
                                        handleDeleteOrganization(org._id)
                                    }
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center">
                            No organisations found
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>

            {/* <TableFooter>
                <TableRow>
                    <TableCell colSpan={6} className="text-right">
                        Total Organizations: {organisations.length}
                    </TableCell>
                </TableRow>
            </TableFooter> */}
        </Table>
    );
};

export default DashboardTable;
