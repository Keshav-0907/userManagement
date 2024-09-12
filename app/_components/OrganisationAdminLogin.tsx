"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AuthContext from "@/context/useAuth";

const OrganisationAdminLogin = () => {
    const authContext = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();
    const { orgAdminLogin } = authContext;

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        orgAdminLogin(email, password);
    };
    return (
        <div className="flex items-center justify-center w-full">
            <div className="w-full p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <div className="text-2xl font-semibold text-center text-gray-800">
                    Organisation Admin Login
                </div>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleAdminLogin} className="space-y-4">
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email ID"
                        type="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button
                        type="submit" // Changed onClick to type="submit" in form
                        className="w-full py-2 mt-4 text-white transition-colors duration-200 bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default OrganisationAdminLogin;
