import { createContext, useContext } from "react"
const categoryContext = createContext(null)
export const useCategoryContext = () => useContext(categoryContext)
export default categoryContext