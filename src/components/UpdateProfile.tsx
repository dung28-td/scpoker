import React from "react";
import Form from "./Form";
import { updateProfile } from 'firebase/auth'
import type { User } from "firebase/auth";

interface Props {
  user: User
  onCompleted?: () => void
}

export default function UpdateProfile({ user, onCompleted }: Props) {
  const update = async (e: React.FormEvent<HTMLFormElement>) => {
    const displayName: string = e.currentTarget['user[name]'].value
    await updateProfile(user, { displayName })
    if (onCompleted) onCompleted()
  }

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