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
    <div className={clsx(
      "m-4 h-32 w-24 border rounded-md flex flex-col items-center justify-center text-center px-4",
      Number.isInteger(value) && 'bg-cyan-500 text-white'
    )}>
      {!voting && Number.isInteger(value) && (
        <div className="text-2xl mb-8">
          {value}
        </div>
      )}
      <div className="w-full truncate">
        {data?.name}
      </div>
    </div>
  )
}