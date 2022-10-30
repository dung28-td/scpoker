interface User {
  name: string
}

interface Plan {
  ownerId: string
  currentTicketId?: string
  memberIds?: string[]
  ticketIds?: string[]
}

interface Ticket {
  voting: boolean
  votes: Record<string, number>
}