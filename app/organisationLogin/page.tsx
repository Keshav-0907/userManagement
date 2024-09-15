import React from "react";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";

const OrganisationAdminLogin = () => {
    return (
        <div className="p-10 flex">
            <div className="w-1/2 flex justify-center items-center flex-col gap-5">
                <div className="flex flex-col text-center">
                    <div className="text-5xl font-semibold">Welcome Back</div>
                    <div className="font-medium">Organisation Admin</div>
                    <div className="text-sm text-gray-400">
                        We are glad to see you back with us
                    </div>
                </div>

                <div className="flex flex-col gap-3 w-full justify-center items-center">
                    <div className="bg-[#F2F2F2] flex p-2 items-center gap-3 w-1/2 rounded-md">
                        <Mail size={16} />
                        <input
                            type="text"
                            placeholder="Email"
                            className="bg-[#F2F2F2] w-full focus:outline-none"
                        />
                    </div>

                    <div className="bg-[#F2F2F2] flex p-2 items-center gap-3 w-1/2 rounded-md">
                        <Lock size={16} />
                        <input
                            type="text"
                            placeholder="Email"
                            className="bg-[#F2F2F2] w-full focus:outline-none"
                        />
                    </div>

                    <button className="bg-black rounded-md text-white w-1/2 py-2 hover:bg-gray-800">
                        Login
                    </button>
                </div>

                <div>
                    Login as a Super Admin?{" "}
                    <Link href="/" className="text-blue-500">
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

export default OrganisationAdminLogin;
