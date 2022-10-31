import React, { useLayoutEffect } from "react"
import Loading from "components/Loading"
import Points from "components/Points"
import Votes from "components/Votes"
import PlanContext from "contexts/Plan"
import TicketContext from "contexts/Ticket"
import useDoc from "hooks/useDoc"
import { useParams } from "react-router-dom"
import { emptyArray } from "constants/common"
import { useUser } from "contexts/User"
import { arrayUnion, updateDoc } from "firebase/firestore"
import type { DocumentReference } from "firebase/firestore"
import TicketControl from "components/TicketControl"
import Container from "components/Container"
import PlanWelcome from "components/PlanWelcome"
import Result from "components/Result"

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

  const user = useUser()
  const { loading, data, ref } = useDoc<Plan>(`plans/${planId}`)


  if (loading) return <Loading />

  if (!data) return <div>404</div>

  const isOwner = user!.uid === data.ownerId

  const Footer = isOwner ? TicketControl : Points

  return (
    <PlanConntainer plan={data} planRef={ref}>
      {data.currentTicketId ? (
        <TicketContainer plan={data} planRef={ref}>
          <Container>
            <div className="max-w-xl mx-auto min-h-[100vh] -mt-16 flex flex-col justify-center pt-16 pb-32 md:pb-44">
              <Votes plan={data} />
              <div className="text-center mt-8">
                <Result />
              </div>
            </div>
          </Container>
          <div className="bg-white fixed bottom-0 left-0 right-0 overflow-x-auto border-t h-28 sm:h-40 flex items-center sm:justify-center">
            <Footer />
          </div>
        </TicketContainer>
      ) : (
        <Container>
          <PlanWelcome
            planId={planId!}
            data={data}
          />
        </Container>
      )}
    </PlanConntainer>
  )
}