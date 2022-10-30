import { DocumentReference } from "firebase/firestore";
import { createContext, useContext } from "react";

interface Context {
  planRef: DocumentReference
  data: Plan | undefined
}

const PlanContext = createContext<Context | undefined>(undefined)

export const usePlan = () => {
  const plan = useContext(PlanContext)

  if (!plan) throw new Error("Missing plan context!")

  return plan
}

export default PlanContext