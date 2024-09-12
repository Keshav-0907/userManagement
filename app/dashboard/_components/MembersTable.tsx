import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import AddMember from "./AddMember";

const MembersTable = ({
    membersData,
    orgID,
    onMemberDelete,
    updateMembers,
}) => {
    const handleMemberDelete = async (memberId) => {
        try {
            const res = await axios.post("/api/members/deleteMember", {
                memberID: memberId,
                orgID: orgID,
            });

            if (res.data.status === "success") {
                toast.success("Member deleted successfully");
                onMemberDelete(memberId);
            }
        } catch (error) {
            console.error("Error deleting member:", error);
        }
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Added On</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {membersData.length > 0 ? ( // Check if membersData has any items
                    membersData.map((member) => (
                        <TableRow key={member?._id}>
                            <TableCell className="font-medium">
                                {member?._id}
                            </TableCell>
                            <TableCell className="font-medium">
                                {member?.name}
                            </TableCell>
                            <TableCell>{member?.email}</TableCell>
                            <TableCell>
                                {member?.addedOn
                                    ? new Date(
                                          member.addedOn
                                      ).toLocaleDateString()
                                    : ""}
                            </TableCell>
                            <TableCell>
                                <div className="bg-yellow-200 rounded-lg cursor-pointer w-fit px-3">
                                    Member
                                </div>
                            </TableCell>
                            <TableCell className="flex justify-end">
                                <div
                                    onClick={() =>
                                        handleMemberDelete(member._id)
                                    }
                                    className="bg-gray-200 rounded-sm p-2 hover:bg-red-200 cursor-pointer"
                                >
                                    <Trash2 size={16} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center">
                            <div> No members here :( </div>
                            <AddMember
                                orgID={orgID}
                                updateMembers={updateMembers}
                            />
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default MembersTable;
