"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AuthContext from "@/context/useAuth";
import { Mail, Lock, Eye, EyeOff } from "lucide-react"; // Import Eye icons
import Link from "next/link";

const SuperAdminLogin = () => {
    const authContext = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Add showPassword state
    const [error, setError] = useState(null);
    const router = useRouter();
    const { login } = authContext;

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        login(email, password);
    };

    return (
        <div className="p-10 flex">
            <div className="w-1/2 flex justify-center items-center flex-col gap-5">
                <div className="flex flex-col text-center">
                    <div className="text-5xl font-semibold">Welcome Back</div>
                    <div className="font-medium">Super Admin</div>
                    <div className="text-sm text-gray-400">
                        We are glad to see you back with us
                    </div>
                </div>

                <div className="flex flex-col gap-3 w-full justify-center items-center">
                    <div className="bg-[#F2F2F2] flex p-2 items-center gap-3 w-1/2 rounded-md">
                        <Mail size={16} />
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            placeholder="Email"
                            className="bg-[#F2F2F2] w-full focus:outline-none"
                        />
                    </div>

                    <div className="bg-[#F2F2F2] flex p-2 items-center gap-3 w-1/2 rounded-md">
                        <Lock size={16} />
                        <input
                            type={showPassword ? "text" : "password"} // Toggle password visibility
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="bg-[#F2F2F2] w-full focus:outline-none"
                        />
                        <button onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />} {/* Toggle icon */}
                        </button>
                    </div>

                    <button onClick={handleAdminLogin} className="bg-black rounded-md text-white w-1/2 py-2 hover:bg-gray-800">
                        Login
                    </button>
                </div>

                <div>
                    Login as a Organisation Admin?{" "}
                    <Link href="/organisationLogin" className="text-blue-500">
                        Click here
                    </Link>
                </div>
            </div>
            <div className="w-1/2">
                <img src="/loginImg.png" alt="loginImg" />
            </div>
        </div>
    );
};

export default SuperAdminLogin;
