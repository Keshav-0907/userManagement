import { useEffect, useState, useCallback } from "react";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isAuthorised, setIsAuthorised] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    console.log("isAuthorised", isAuthorised);
    console.log("user", user);

    const loadUserFromToken = useCallback(() => {
        setLoading(true);
        const token = localStorage.getItem("superAdminToken");
        if (token) {
            try {
                const decodedUser = jwt.decode(token);
                console.log("decodedUser", decodedUser);
                setUser(decodedUser);
                setIsAuthorised(true);
            } catch (error) {
                console.error("Invalid token:");
                setUser(null);
                setIsAuthorised(false);
            }
        } else {
            setUser(null);
            setIsAuthorised(false);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        loadUserFromToken();
    }, [loadUserFromToken]);

    const logout = () => {
        localStorage.removeItem("superAdminToken");
        setUser(null);
        setIsAuthorised(false);
        router.push("/");
    };

    return {
        user,
        isAuthorised,
        loading,
        logout,
    };
};

export default useAuth;
