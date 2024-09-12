"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";

const AddMember = ({ orgID, updateMembers }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const handleAddMember = async () => {
        try {
            const res = await axios.post("/api/members/addMemberToOrg", {
                organisation: orgID,
                name: name,
                email: email,
            });
            if (res.data.status === "success") {
                updateMembers(res.data.newMember);
                alert("Member Added Successfully");
                setName("");
                setEmail("");
                setIsOpen(false);
            } else {
                alert("Failed to add member");
            }
        } catch (error) {
            console.error("Error adding member:", error);
            alert("Failed to add member");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>
                <div onClick={() => setIsOpen(true)}> Add New Member </div>
            </DialogTrigger>
            <DialogContent className="bg-white py-5">
                <DialogHeader className="py-2">
                    <DialogTitle>Add New Member</DialogTitle>
                </DialogHeader>
                <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                />
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />

                <Button onClick={handleAddMember}> Add Member </Button>
            </DialogContent>
        </Dialog>
    );
};

export default AddMember;
