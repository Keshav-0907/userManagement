'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

const SuperAdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter(); // Initialize router for navigation

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state on form submission

        try {
            const response = await axios.post('/api/superadmin/login', {
                email,
                password,
            });

            // Save token to local storage
            localStorage.setItem('superAdminToken', response.data.token);

            // Redirect to the dashboard or any other page after successful login
            router.push('/dashboard'); // Update with the correct route
        } catch (error) {
            setError("Login failed. Please check your credentials");
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-800">
                    SuperAdmin Login
                </h2>
                {error && (
                    <p className="text-red-500 text-center">{error}</p>
                )}
                <form className="space-y-4" onSubmit={handleAdminLogin}>
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
                        type="submit"
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
