import { useLayoutEffect } from "react"
import { Outlet } from "react-router-dom"
import { useUser } from "contexts/User"
import useSignInAnonymously from "hooks/useSignInAnonymously"
import Loading from "components/Loading"
import UpdateProfile from "components/UpdateProfile"
import useDoc from "hooks/useDoc"

function Main() {
  const user = useUser()
  const { data, loading } = useDoc<User>(`users/${user?.uid}`)

  if (loading) return <Loading />

  if (!data?.name) return <UpdateProfile />

  return (
    <Outlet />
  )
}

export default function PlanLayout() {
  const signInAnonymously = useSignInAnonymously()
  const user = useUser()

  useLayoutEffect(() => {user === null && signInAnonymously()}, [user, signInAnonymously])

  if (!user) return <Loading />

  return <Main />
}