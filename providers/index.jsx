"use client"

import UserContext from "@/context/user";
import { fetchProfile } from "@/helpers/backend_helper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CategoryProviders from "./CategoryProviders";
import { SkeletonTheme } from "react-loading-skeleton";


const Providers = ({ children }) => {
    const [user, setUser] = useState({});
    const router = useRouter();
    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        const { data, error } = await fetchProfile();
        if (error === false) {
            setUser(data);
        } else {
            // router.push("/");
            setUser({});
        }
    };


    return <CategoryProviders>
        <UserContext.Provider value={{ user, setUser, getUser }}>
            <SkeletonTheme color="#0F172A" highlightColor="#444">
                {children}
            </SkeletonTheme>
        </UserContext.Provider>
    </CategoryProviders>
}

export default Providers;