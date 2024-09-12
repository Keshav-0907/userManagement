"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { User, JWTTokenPayload } from "../types";
import { StringExpression } from "mongoose";

interface AuthContextProps {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
    orgAdminLogin: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true);
        const token = localStorage.getItem("token");
        console.log("Token Chekc:", token);
        if (token) {
            try {
                const decoded = jwtDecode<JWTTokenPayload>(token);
                console.log("Decoded token:", decoded);
                setUser({
                    email: decoded.isAdmin.email,
                    role: decoded.isAdmin.role,
                    _id: decoded.isAdmin._id,
                });
            } catch (e) {
                console.error("Failed to decode token", e);
            }
        }
        setLoading(false);
    }, []);

    const login = async (email: string, password: StringExpression) => {
        try {
            setLoading(true);
            const response = await axios.post("/api/superadmin/login", {
                email,
                password,
            });
            console.log("Response:", response);
            if (response.status === 200) {
                const token = response.data.token;
                console.log("Token:", token);
                localStorage.setItem("token", token);
                const decoded = jwtDecode(token);
                setUser({
                    email: decoded.isAdmin.email,
                    role: decoded.isAdmin.role,
                    _id: decoded.isAdmin._id,
                });
                console.log("Login successful", decoded);
            }
            setLoading(false);
        } catch (error) {
            setLoading(true);
            console.error("Login failed", error);
            setLoading(false);
        }
    };

    const logout = () => {
      setLoading(true);
        localStorage.removeItem("token");
        setUser(null);
        setLoading(false);
        window.location.reload();
    };

    const orgAdminLogin = async (email: string, password: StringExpression) => {
        try {
            setLoading(true);
            const response = await axios.post("/api/organisation/adminLogin", {
                email,
                password,
            });
            console.log("Response:", response);
            if (response.status === 200) {
                const token = response.data.token;
                console.log("Token:", token);
                localStorage.setItem("token", token);
                const decoded = jwtDecode(token);
                setUser({
                    email: decoded.email,
                    role: decoded.role,
                    _id: decoded._id,
                    org: decoded.orgId,
                })
                console.log("Decoded token:", decoded);
            }
            setLoading(false);
        } catch (error) {
            setLoading(true);
            console.error("Login failed", error);
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, orgAdminLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
