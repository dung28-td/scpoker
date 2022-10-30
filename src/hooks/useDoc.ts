import { useFirebaseApp } from "contexts/FirebaseApp"
import { doc, DocumentData, onSnapshot  } from "firebase/firestore"
import { useLayoutEffect, useMemo, useState } from "react"

export default function useDoc<T = DocumentData>(path: string) {
  const { firestore } = useFirebaseApp()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<T>()
  const ref = useMemo(() => doc(firestore, path), [firestore, path])

  useLayoutEffect(() => onSnapshot(
    ref,
    doc => {
      setLoading(false)
      setData(doc.data() as T)
    }
  ), [ref])

  return useMemo(() => ({ loading, data, ref }), [loading, data, ref])
}