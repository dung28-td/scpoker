import React from "react";
import Form from "./Form";
import { useUser } from "contexts/User";
import { doc, setDoc } from "firebase/firestore";
import { useFirebaseApp } from "contexts/FirebaseApp";
import { useCallback } from "react";

export default function UpdateProfile() {
  const user = useUser()
  const { firestore } = useFirebaseApp()

  const update = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    const name: string = e.currentTarget['user[name]'].value
    await setDoc(doc(firestore, `users/${user!.uid}`), { name })
  }, [user, firestore])

  return (
    <Form onSubmit={update}>
      <input
        required
        type='text'
        name="user[name]"
        placeholder="Enter your name"
      />
      <button type='submit'>
        Submit
      </button>
    </Form>
  )
}