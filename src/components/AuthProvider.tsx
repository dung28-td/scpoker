import React, { useLayoutEffect, useState } from "react"
import UserContext from "contexts/User"
import type { Auth, User } from "firebase/auth"
import AuthContext from "contexts/Auth"

interface Props {
  auth: Auth
}

export default function AuthProvider({ auth, children }: React.PropsWithChildren<Props>) {
  const [user, setUser] = useState<User | null>()

  useLayoutEffect(() => auth.onAuthStateChanged(setUser), [auth])

  return (
    <AuthContext.Provider value={auth}>
      <UserContext.Provider value={user}>
        {children}
      </UserContext.Provider>
    </AuthContext.Provider>
  )
}