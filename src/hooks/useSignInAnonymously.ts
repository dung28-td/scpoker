import { useAuth } from "contexts/Auth";
import { signInAnonymously } from "firebase/auth";
import { useCallback } from "react";

export default function useSignInAnonymously() {
  const auth = useAuth()

  return useCallback(() => signInAnonymously(auth), [auth])
}