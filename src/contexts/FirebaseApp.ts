import { createContext, useContext } from "react"
import type { FirebaseApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const FirebaseAppContext = createContext<FirebaseApp | undefined>(undefined)

export const useFirebaseApp = () => {
  const app = useContext(FirebaseAppContext)

  if (!app) throw new Error('Missing FirebaseApp!')

  return {
    auth: getAuth(app),
    firestore: getFirestore(app)
  }
}

export default FirebaseAppContext