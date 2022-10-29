import React, { lazy, Suspense } from "react";
import Loading from "./Loading";

type ChunkProps<T> = JSX.IntrinsicAttributes & ((React.PropsWithoutRef<T> & React.RefAttributes<React.Component<T, any, any>>) | React.PropsWithRef<T>)

export default function withChunk<T>(factory: () => Promise<{ default: React.ComponentType<T> }>) {
  const Component = lazy(factory)

  return function WrappedComponent(props: T) {
    return (
      <Suspense fallback={<Loading />}>
        <Component  {...props as ChunkProps<T>} />
      </Suspense>
    )
  }
}