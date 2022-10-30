import { DocumentReference } from "firebase/firestore";
import { createContext, useContext } from "react";

interface Context {
  ticketRef: DocumentReference
  data: Ticket | undefined
}

const TicketContext = createContext<Context | undefined>(undefined)

export const useTicket = () => {
  const ticket = useContext(TicketContext)

  if (!ticket) throw new Error("Missing ticket context!")

  return ticket
}

export default TicketContext