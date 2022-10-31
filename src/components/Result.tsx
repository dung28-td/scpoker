import { useTicket } from "contexts/Ticket"

export default function Result() {
  const { data } = useTicket()

  if (data?.voting !== false) return null

  const avg = (Object.values(data!.votes).reduce((sum, x) => sum + x, 0) / Object.keys(data.votes).length).toFixed(1)

  return (
    <div className="text-3xl font-semibold">
      AVG = {' '}
      <span className="text-cyan-600 ">
        {avg}
      </span>
    </div>
  )
}