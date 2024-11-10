"use client";
import { fetchSiteSettings } from "@/helpers/backend_helper";
import React from "react";
import { useFetch } from "@/helpers/hooks";
import I18nContext, { initI18n } from "@/context/i18n";
const Layout = ({ children }) => {
    const i18n = initI18n()


    const [site] = useFetch(fetchSiteSettings);

    return (
        <>
            <I18nContext.Provider value={i18n}>
                {children}
            </I18nContext.Provider>

        </>
    );
};

export default Layout;
