import React, { useCallback } from "react"

export default function Form({ onSubmit, ...props }: React.ComponentProps<'form'>) {
  const handleSubmit = useCallback((onSubmit: React.FormEventHandler<HTMLFormElement>) => {
    return (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      onSubmit(e)
    }
  }, [])

  return <form onSubmit={onSubmit && handleSubmit(onSubmit)} {...props} />
}