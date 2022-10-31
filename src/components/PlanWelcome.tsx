import { QRCodeSVG } from 'qrcode.react'
import Member from "components/Member"
import Copy from "components/Copy"
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid'
import { useLocation } from 'react-router-dom'
import useCreateTicket from 'hooks/useCreateTicket'
import { useUser } from 'contexts/User'

interface Props {
  planId: string
  data: Plan
}

export default function PlanWelcome({ planId, data }: Props) {
  const user = useUser()
  const { pathname } = useLocation()
  const url = window.location.origin + pathname
  const createTicket = useCreateTicket(planId)

  return (
    <div className="h-screen -mt-16 flex flex-col sm:flex-row justify-center items-center space-y-8 sm:space-x-8 sm:space-y-0">
      <div>
        <QRCodeSVG
          value={url}
          size={240}
        />
        <div className="flex w-60 mt-4 items-center rounded border p-2">
          <p className="truncate flex-1 text-sm mr-1">
            {url}
          </p>
          <Copy value={url} />
        </div>
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
            Members
          </h2>
          {data.memberIds?.length ? (
            <ol className="list-decimal ml-4">
              {data.memberIds.map(id => (
                <li key={id}>
                  <Member id={id} />
                </li>
              ))}
            </ol>
          ) : (
            <p>Waiting member to join</p>
          )}
        </div>
        {data.ownerId === user?.uid && (
          <button
            type="button"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-cyan-500 py-2 px-4 text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
            onClick={createTicket}
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <ArrowRightCircleIcon className="h-5 w-5 text-cyan-300" aria-hidden="true" />
            </span>
            Start
          </button>
        )}
      </div>
    </div>
  )
}