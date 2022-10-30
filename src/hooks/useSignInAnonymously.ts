import { useFirebaseApp } from "contexts/FirebaseApp";
import { signInAnonymously } from "firebase/auth";
import { useCallback } from "react";

export default function useSignInAnonymously() {
  const { auth } = useFirebaseApp()

  return useCallback(() => signInAnonymously(auth), [auth])
}