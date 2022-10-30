import { useLayoutEffect } from "react"
import Loading from "components/Loading"
import { useUser } from "contexts/User"
import { addDoc, collection } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { useFirebaseApp } from "contexts/FirebaseApp"

export default function NewPlan() {
  const user = useUser()
  const navigate = useNavigate()
  const { firestore } = useFirebaseApp()

  useLayoutEffect(() => {
    addDoc(collection(firestore, 'plans'), {
      ownerId: user?.uid
    }).then(planRef => {
      navigate(`/plans/${planRef.id}`, { replace: true })
    })
  }, [navigate, firestore, user])

  return <Loading />
}