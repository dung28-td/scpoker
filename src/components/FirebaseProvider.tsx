import React, { useLayoutEffect, useState } from "react"
import UserContext from "contexts/User"
import FirebaseAppContext from "contexts/FirebaseApp"
import { getAuth } from "firebase/auth"
import type { FirebaseApp } from "firebase/app"
import type { User } from "firebase/auth"

interface Props {
  app: FirebaseApp
}

export default function AuthProvider({ app, children }: React.PropsWithChildren<Props>) {
  const [user, setUser] = useState<User | null>()

  useLayoutEffect(() => {
    const auth = getAuth(app)
    return auth.onAuthStateChanged(setUser)
  }, [app])

  return (
    <FirebaseAppContext.Provider value={app}>
      <UserContext.Provider value={user}>
        {children}
      </UserContext.Provider>
    </FirebaseAppContext.Provider>
  )
}