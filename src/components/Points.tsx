import { RadioGroup } from "@headlessui/react"
import { points } from "constants/common"
import { useTicket } from "contexts/Ticket"
import { useUser } from "contexts/User"
import { updateDoc } from "firebase/firestore"
import { useCallback } from "react"
import { Fragment } from "react"
import clsx from "utils/clsx"

export default function Points() {
  const { ticketRef, data } = useTicket()
  const user = useUser()
  const uid = user!.uid

  const vote = useCallback((point: number) => updateDoc(ticketRef, { [`votes.${uid}`]: point }), [ticketRef, uid])

  return (
    <RadioGroup
      value={data?.votes[uid]}
      onChange={vote}
      disabled={!data?.voting}
      className='mx-4'
    >
      <RadioGroup.Label className="sr-only">
        Choose a point
      </RadioGroup.Label>
      <div className="flex space-x-4 justify-center">
        {points.map(point => (
          <RadioGroup.Option
            key={point}
            value={point}
            className={({ active }) => clsx(
              'bg-white shadow-sm text-gray-900 cursor-pointer',
              active ? 'ring-2 ring-indigo-500' : '',
              'group relative border rounded-md h-20 w-16 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none'
            )}
          >
            {({ active, checked }) => (
              <Fragment>
                <RadioGroup.Label as="span">{point}</RadioGroup.Label>
                <span
                  className={clsx(
                    active ? 'border' : 'border-2',
                    checked ? 'border-indigo-500' : 'border-transparent',
                    'pointer-events-none absolute -inset-px rounded-md'
                  )}
                  aria-hidden="true"
                />
              </Fragment>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}