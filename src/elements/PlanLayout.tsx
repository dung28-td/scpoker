import { useLayoutEffect } from "react"
import { Outlet } from "react-router-dom"
import { useUser } from "contexts/User"
import useSignInAnonymously from "hooks/useSignInAnonymously"
import Loading from "components/Loading"
import UpdateProfile from "components/UpdateProfile"
import useRerender from "hooks/useRerender"

export default function PlanLayout() {
  const rerender = useRerender()
  const signInAnonymously = useSignInAnonymously()
  const user = useUser()

  useLayoutEffect(() => {user === null && signInAnonymously()}, [user, signInAnonymously])

  if (!user) return <Loading />

  if (!user.displayName) return (
    <UpdateProfile
      user={user}
      onCompleted={rerender}
    />
  )

  return (
    <Outlet />
  )
}