import { emptyArray } from "constants/common"
import { useTicket } from "contexts/Ticket"
import Vote from "./Vote"

interface Props {
  plan: Plan
}

export default function Votes({ plan }: Props) {
  const { memberIds = emptyArray } = plan
  const { data } = useTicket()

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
      {memberIds.map(id => (
        <Vote
          key={id}
          id={id}
          value={data?.votes[id]}
          voting={!!data?.voting}
        />
      ))}
    </div>
  )
}