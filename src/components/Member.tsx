import useDoc from "hooks/useDoc"
import Loading from "./Loading"

interface Props {
  id: string
}

export default function Member({ id }: Props) {
  const { data, loading } = useDoc<User>(`users/${id}`)

  if (loading) return <Loading />

  return <>{data!.name}</>
}