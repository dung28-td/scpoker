import { createContext, useContext } from "react"
import type { User } from "firebase/auth"

const UserContext = createContext<User | null | undefined>(undefined)

export const useUser = () => useContext(UserContext)

export default UserContext