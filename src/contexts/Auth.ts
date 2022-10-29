import { createContext, useContext } from "react"
import type { Auth } from "firebase/auth"

const AuthContext = createContext<Auth | undefined>(undefined)

export const useAuth = () => {
  const auth = useContext(AuthContext)
  if (!auth) throw new Error('Missing auth!')
  return auth
}

export default AuthContext