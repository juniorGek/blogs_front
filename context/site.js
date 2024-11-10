import {createContext, useContext} from "react";

const SiteContext = createContext(undefined)
export const useSite = () => useContext(SiteContext)
export default SiteContext;