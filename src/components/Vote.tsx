import useDoc from "hooks/useDoc"
import clsx from "utils/clsx"
import Loading from "./Loading"

interface Props {
  id: string
  value: number | undefined
  voting: boolean
}

export default function Vote({ id, value, voting }: Props) {
  const { data, loading } = useDoc<User>(`users/${id}`)

  if (loading) return <Loading />

  return (
    <div className="flex justify-center">
      <div className={clsx(
        "h-32 border rounded-md flex flex-col justify-between text-center px-4 py-2",
        Number.isInteger(value) && 'bg-cyan-500 text-white'
      )}>
        <div className="text-4xl font-bold mt-2">
          {!voting && value}
        </div>
        <div className="text-sm">
          {data?.name}
        </div>
      </div>
    </div>
  )
}