import React, { useLayoutEffect } from "react"
import Loading from "components/Loading"
import Points from "components/Points"
import Votes from "components/Votes"
import PlanContext from "contexts/Plan"
import TicketContext from "contexts/Ticket"
import useDoc from "hooks/useDoc"
import { useLocation, useParams } from "react-router-dom"
import { emptyArray } from "constants/common"
import { useUser } from "contexts/User"
import { arrayUnion, updateDoc } from "firebase/firestore"
import { QRCodeSVG } from 'qrcode.react'
import Member from "components/Member"
import Copy from "components/Copy"
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid'
import useCreateTicket from "hooks/useCreateTicket"
import type { DocumentReference } from "firebase/firestore"
import TicketControl from "components/TicketControl"

interface Props {
  plan: Plan
  planRef: DocumentReference
}

function PlanConntainer({ plan, planRef, children }: React.PropsWithChildren<Props>) {
  const { ownerId, memberIds = emptyArray } = plan
  const user = useUser()
  const uid = user!.uid
  const isOwner = ownerId === uid

  useLayoutEffect(() => {
    if (isOwner || memberIds.includes(uid)) return
    updateDoc(planRef, { memberIds: arrayUnion(uid) })
  }, [isOwner, uid, planRef, memberIds])

  return (
    <PlanContext.Provider value={{ planRef, data: plan }}>
      {children}
    </PlanContext.Provider>
  )
}

function TicketContainer({ plan, children }: React.PropsWithChildren<Props>) {
  const { data, ref: ticketRef } = useDoc<Ticket>(`tickets/${plan.currentTicketId}`)

  return (
    <TicketContext.Provider value={{ ticketRef, data }}>
      {children}
    </TicketContext.Provider>
  )
}

export default function Plan() {
  const { planId } = useParams()
  const { pathname } = useLocation()
  const user = useUser()
  const { loading, data, ref } = useDoc<Plan>(`plans/${planId}`)
  const url = window.location.origin + pathname
  const createTicket = useCreateTicket(planId!)

  if (loading) return <Loading />

  if (!data) return <div>404</div>

  const isOwner = user!.uid === data.ownerId

  const Footer = isOwner ? TicketControl : Points

  return (
    <PlanConntainer plan={data} planRef={ref}>
      {data.currentTicketId ? (
        <TicketContainer plan={data} planRef={ref}>
          <Votes plan={data} />
          <div className="fixed bottom-0 left-0 right-0 overflow-x-auto border-t py-6">
            <Footer />
          </div>
        </TicketContainer>
      ) : (
        <div className="container mx-auto">
          <div className="h-screen -mt-16 flex justify-center items-center space-x-8">
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
              {isOwner && (
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
        </div>
      )}
    </PlanConntainer>
  )
}