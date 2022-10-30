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
    <div className="container mx-auto">
      <div className="flex flex-wrap justify-center items-center -m-4">
        {memberIds.map(id => (
          <Vote
            key={id}
            id={id}
            value={data?.votes[id]}
            voting={!!data?.voting}
          />
        ))}
      </div>
    </div>
  )
}