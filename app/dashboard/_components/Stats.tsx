"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Stats = () => {
    const [stats, setStats] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await axios.post("/api/stats");
                setStats(res.data);
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };

        getStats();
    }, []);

    if (loading) return <div className="text-center p-4">Loading...</div>;

    return (
        <div className="flex space-x-4 p-4">
            <div className="w-full sm:w-1/2 lg:w-1/4 p-6 bg-gradient-to-b from-white to-gray-100 shadow-lg rounded-xl transition-transform transform hover:scale-105 duration-300">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-xs font-medium text-gray-500">
                            Active Members
                        </h2>
                        <p className="text-5xl font-extrabold text-gray-800">
                            43
                        </p>
                    </div>
                    <div className="p-2 bg-green-100 rounded-full">
                        <svg
                            className="w-6 h-6 text-green-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                </div>
                <div className="w-full h-[2px] bg-gray-300 my-4"></div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-green-600 font-semibold flex items-center">
                        <svg
                            className="w-4 h-4 mr-1"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        +23%
                    </span>
                    <span className="text-gray-500">from last month</span>
                </div>
            </div>

            <div className="w-full sm:w-1/2 lg:w-1/4 p-6 bg-gradient-to-b from-white to-gray-100 shadow-lg rounded-xl transition-transform transform hover:scale-105 duration-300">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-xs font-medium text-gray-500">
                            Active Organisations
                        </h2>
                        <p className="text-5xl font-extrabold text-gray-800">
                            4
                        </p>
                    </div>
                    <div className="p-2 bg-green-100 rounded-full">
                        <svg
                            className="w-6 h-6 text-green-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                </div>
                <div className="w-full h-[2px] bg-gray-300 my-4"></div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-green-600 font-semibold flex items-center">
                        <svg
                            className="w-4 h-4 mr-1"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        +10%
                    </span>
                    <span className="text-gray-500">from last month</span>
                </div>
            </div>
        </div>
    );
};

export default Stats;
