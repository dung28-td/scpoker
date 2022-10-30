import { useFirebaseApp } from "contexts/FirebaseApp";
import { arrayUnion, doc, runTransaction } from "firebase/firestore";
import { useCallback } from "react";

export default function useCreateTicket(planId: string) {
  const { firestore } = useFirebaseApp()

  return useCallback(() => runTransaction(firestore, async transaction => {
    const ticketId = crypto.randomUUID()

    transaction.set(doc(firestore, `tickets/${ticketId}`), {
      voting: true,
      votes: {}
    })

    transaction.update(doc(firestore, `plans/${planId}`), {
      currentTicketId: ticketId,
      ticketIds: arrayUnion(ticketId)
    })
  }), [firestore, planId])
}