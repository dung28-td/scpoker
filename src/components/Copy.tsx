import { Popover } from "@headlessui/react";
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import { useCallback, useRef } from "react";

interface Props {
  value: string
}

export default function Copy({ value }: Props) {
  const closeRef = useRef<() => void>(() => {})

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(value)
    setTimeout(() => closeRef.current(), 2000)
  }, [value])

  return (
    <Popover className='relative flex'>
      <Popover.Button
        className="text-cyan-400 hover:text-cyan-500 outline-none"
        onClick={copy}
      >
        <span className="sr-only">Copy</span>
        <DocumentDuplicateIcon className="h-5 w-5" />
      </Popover.Button>
      <Popover.Panel className="absolute z-10 top-full mt-1 left-2/4 -translate-x-2/4">
        {({ close }) => {
          closeRef.current = close

          return (
            <div className="bg-white shadow text-xs text-white bg-gray-700 rounded p-1">
              Copied
            </div>
          )
        }}
      </Popover.Panel>
    </Popover>
  )
}