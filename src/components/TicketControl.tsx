import { useCallback } from "react"
import { useTicket } from "contexts/Ticket"
import useCreateTicket from "hooks/useCreateTicket"
import { useParams } from "react-router-dom"
import { setDoc, updateDoc } from "firebase/firestore"
import { ArrowPathIcon, CheckIcon, ArrowRightCircleIcon } from '@heroicons/react/24/outline'

export default function TicketControl() {
  const { planId } = useParams()
  const { data, ticketRef } = useTicket()
  const createTicket = useCreateTicket(planId!)

  const reset = useCallback(() => setDoc(ticketRef, { voting: true, votes: {} }), [ticketRef])
  const viewResult = useCallback(() => updateDoc(ticketRef, { voting: false }), [ticketRef])


  return (
    <div className="flex justify-center space-x-3">
      <button
        type="button"
        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
        onClick={reset}
      >
        <ArrowPathIcon className="h-5 w-5 mr-3" />
        Reset
      </button>
      {data?.voting ? (
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
          onClick={viewResult}
        >
          <CheckIcon className="h-5 w-5 mr-3" />
          View result
        </button>
      ) : (
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
          onClick={createTicket}
        >
          <ArrowRightCircleIcon className="h-5 w-5 mr-3" />
          Next
        </button>
      )}
    </div>
  )
}