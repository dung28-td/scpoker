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
            <label>
              Tell me your name and we are good
              <input
                name="user[name]"
                type="text"
                required
                className="mt-2 relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm"
                placeholder="John Doe"
              />
            </label>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded border border-transparent bg-cyan-600 py-2 px-4 text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
          >
            We are good
          </button>
        </div>
      </Form>
    </div>
  )
}