"use client";
import React, { use, useEffect, useState } from "react";
import DashboardHeader from "./_components/DashboardHeader";
import DashboardTable from "./_components/DashboardTable";
import OptionsBar from "./_components/OptionsBar";
import AddOrganisation from "./_components/AddOrganisation";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "@/context/useAuth";
import MembersTable from "./_components/MembersTable";
import AddMember from "./_components/AddMember";

const Dashboard = () => {
    const authContext = useContext(AuthContext);
    const { user, loading } = authContext;

    console.log("User:", user);

    const router = useRouter();
    const [organisations, setOrganisations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        adminName: "",
        adminEmail: "",
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState({ members: "", date: "" });
    const [members, setMembers] = useState([]);
    const [orgData, setOrgData] = useState([]);

    useEffect(() => {
        if (!user && !loading) {
            router.push("/");
            return;
        }

        const getAllOrganisations = async () => {
            try {
                setIsLoading(true);
                const res = await axios.post("/api/organisation/getAll");
                setOrganisations(res.data.data);
            } catch (error) {
                console.error("Error fetching organisations:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (user) {
            getAllOrganisations();
        }
    }, [user, loading, router]);

    const handleNewOrg = async () => {
        const res = await axios.post("/api/organisation/addNew", {
            name: formData.name,
            adminName: formData.adminName,
            adminEmail: formData.adminEmail,
        });

        if (res.data.status === "success") {
            setOrganisations([...organisations, res.data.data]);
            setFormData({
                name: "",
                adminName: "",
                adminEmail: "",
            });
            alert("Organisation added successfully");
        }
    };

    useEffect(() => {
        if (user && user.role === "admin") {
            console.log("User org:", user.org);
            const getOrganisationMembers = async () => {
                try {
                    setIsLoading(true);
                    const res = await axios.post(
                        "/api/organisation/getSingleOrg",
                        {
                            id: user.org,
                        }
                    );
                    console.log("Members:", res);
                    setOrgData(res.data.data);
                    setMembers(res.data.members);
                } catch (error) {
                    console.error("Error fetching members:", error);
                } finally {
                    setIsLoading(false);
                }
            };
            getOrganisationMembers();
        }
    }, [user]);

    console.log("members", members);

    const updateMembers = (newMember) => {
        setMembers([...members, newMember]);
    };

    // Filter organisations based on search term
    const filteredOrganisations = organisations.filter((org) =>
        org.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort organisations based on selected options
    const sortedOrganisations = filteredOrganisations.sort((a, b) => {
        // Sorting by member count
        if (sortOption.members) {
            return sortOption.members === "asc"
                ? a.members - b.members
                : b.members - a.members;
        }
        // Sorting by date
        if (sortOption.date) {
            return sortOption.date === "newer"
                ? new Date(b.date) - new Date(a.date)
                : new Date(a.date) - new Date(b.date);
        }
        return 0;
    });

    const handleMemberDelete = (deletedMemberId) => {
        setMembers(members.filter(member => member._id !== deletedMemberId));
    };

    return (
        <div className="p-3">
            <div className="flex justify-between items-center mb-4 w-full">
                {user && user.role === "superadmin" ? (
                    <div> All Organisations </div>
                ) : (
                    <div className="flex justify-between w-full">
                      <div className="p-4 bg-gray-100 rounded-lg shadow-md">
    <div className="text-xl font-semibold text-gray-800">
        All Members of {orgData?.name}
    </div>
    <div className="mt-2 text-lg text-gray-600">
        Total Members: <span className="font-bold text-gray-800">{orgData?.membersCount}</span>
    </div>
</div>


                        <div>
                            <AddMember
                                orgID={user?.org}
                                updateMembers={updateMembers}
                            />
                        </div>
                    </div>
                )}
                {user && user.role === "superadmin" && (
                    <AddOrganisation
                        setFormData={setFormData}
                        formData={formData}
                        handleNewOrg={handleNewOrg}
                    />
                )}
            </div>
            <OptionsBar
                setSearchTerm={setSearchTerm}
                setSortOption={setSortOption}
            />

            {user && user.role === "superadmin" ? (
                <div className="border rounded-xl p-2">
                    <DashboardTable organisations={sortedOrganisations} />
                </div>
            ) : (
                <div>
                    <MembersTable
                        orgID={user?.org}
                        membersData={members}
                        updateMembers={updateMembers}
                        onMemberDelete={handleMemberDelete}
                    />
                </div>
            )}
        </div>
    );
};

export default Dashboard;
