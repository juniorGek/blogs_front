"use client";
import { fetchProfile, fetchSiteSettings } from "@/helpers/backend_helper";
import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";
import React, { useEffect, useState } from "react";
import UserContext from "@/context/user";
import { useFetch } from "@/helpers/hooks";
import I18nContext, { initI18n } from "@/context/i18n";

import dynamic from "next/dynamic";
import { app } from "../../helpers/firebase.config";
import { getAnalytics } from "firebase/analytics";

// const getAnalytics = dynamic(() => import("firebase/analytics"), {
//   ssr: false,
// });

const Layout = ({ children }) => {
  const i18n = initI18n()
  const [site] = useFetch(fetchSiteSettings);

  useEffect(() => {
    const analytics = getAnalytics(app);
  }, []);

  return (
    <>
      <I18nContext.Provider value={i18n}>
        <Navbar site={site} />
        <div>
        {children}
        </div>
        <Footer site={site} />
      </I18nContext.Provider>

    </>
  );
};

export default Layout;
