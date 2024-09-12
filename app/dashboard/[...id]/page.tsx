"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MembersTable from "../_components/MembersTable";
import OptionsBar from "../_components/OptionsBar";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import AddMember from "../_components/AddMember";
import AuthContext from "@/context/useAuth";
import { useContext } from "react";
import { useRouter } from "next/navigation";

const Organisation = () => {
    const router = useRouter();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [orgData, setOrgData] = useState(null);
    const [members, setMembers] = useState([]);
    const authContext = useContext(AuthContext);

    const { user, loading } = authContext;

    if (!user && !loading) {
        router.push("/");
        return;
    }

    const fetchOrganisation = async () => {
        setIsLoading(true);
        try {
            const res = await axios.post("/api/organisation/getSingleOrg", {
                id: id,
            });
            if (res.data.status === "success") {
                setMembers(res.data.members);
                setOrgData(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching organisation:", error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchOrganisation();
    }, [id]);

    const updateMembers = (newMember) => {
        setMembers([...members, newMember]);
    };

    const handleMemberDelete = (deletedMemberId) => {
        setMembers(members.filter(member => member._id !== deletedMemberId));
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="p-3">
                <Label>
                    <Link
                        href={"/dashboard"}
                        className="flex gap-1 items-center"
                    >
                        <ArrowLeft size={16} /> Go Back
                    </Link>
                </Label>
                <div className="flex justify-between items-center mb-4 py-2">
                    <div className="text-2xl font-semibold">
                        {orgData?.name}
                    </div>

                    <AddMember orgID={id} updateMembers={updateMembers} />
                </div>
                <OptionsBar setSearchTerm={() => {}} setSortOption={() => {}} />
                <div className="border rounded-xl p-2">
                    <MembersTable 
                        membersData={members} 
                        orgID={id}
                        onMemberDelete={handleMemberDelete}
                        updateMembers={updateMembers}
                    />
                </div>
            </div>
        </div>
    );
};

export default Organisation;