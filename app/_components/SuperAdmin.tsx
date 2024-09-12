"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import toast from "react-hot-toast";

const SuperAdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter(); // Initialize router for navigation

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state on form submission

        try {
            const response = await axios.post("/api/superadmin/login", {
                email,
                password,
            });
            console.log(response.data);

            if (response.data.status === true) { // Use === for comparison
                localStorage.setItem("superAdminToken", response.data.token);
                toast.success("Login successful. Redirecting to dashboard...");
                setTimeout(() => {
                    router.push("/dashboard");
                }, 1000);
            } else {
                setError("Login failed. Please check your credentials.");
                toast.error("Login failed");
            }

        } catch (error) {
            toast.error("Login failed");
            console.error("Login failed:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <div className="text-2xl font-semibold text-center text-gray-800">
                    SuperAdmin Login
                </div>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleAdminLogin} className="space-y-4"> {/* Changed div to form */}
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

export default SuperAdminLogin;
