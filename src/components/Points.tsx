import { RadioGroup } from "@headlessui/react"
import { points } from "constants/common"
import { useTicket } from "contexts/Ticket"
import { useUser } from "contexts/User"
import { updateDoc } from "firebase/firestore"
import { useCallback } from "react"
import clsx from "utils/clsx"

export default function Points() {
  const { ticketRef, data } = useTicket()
  const user = useUser()
  const uid = user!.uid

  const vote = useCallback((point: number) => updateDoc(ticketRef, { [`votes.${uid}`]: point }), [ticketRef, uid])

  return (
    <RadioGroup
      value={data?.votes[uid] ?? null}
      onChange={vote}
      disabled={!data?.voting}
      className='px-4 w-max sm:w-full'
    >
      <RadioGroup.Label className="sr-only">
        Choose a point
      </RadioGroup.Label>
      <div className="flex space-x-4 sm:justify-center">
        {points.map(point => (
          <RadioGroup.Option
            key={point}
            value={point}
            className={({ checked }) => clsx(
              checked ? 'bg-cyan-500 text-white cursor-default' : 'bg-white text-gray-900 hover:bg-gray-200  cursor-pointer',
              'shadow-sm flex-shrink-0',
              'group relative border rounded-md h-20 w-16 flex items-center justify-center text-sm font-medium uppercase outline-none'
            )}
          >
            <RadioGroup.Label>{point}</RadioGroup.Label>
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}