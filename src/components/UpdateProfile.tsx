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
    <div className="h-screen max-w-md mx-auto flex w-full items-center -mt-16 px-4">
      <Form
        className="space-y-6 w-full"
        onSubmit={update}
      >
        <div className="-space-y-px rounded shadow-sm">
          <div>
            <label htmlFor="name-input" className="sr-only">
              Name
            </label>
            <input
              id="name-input"
              name="user[name]"
              type="text"
              required
              className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter your name"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </Form>
    </div>
  )
}