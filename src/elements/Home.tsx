import { Link } from "react-router-dom"
import { PlusIcon } from '@heroicons/react/24/outline'

export default function Home() {
  return (
    <div className="container mx-auto">
      <div className="h-screen -mt-16 flex items-center justify-center">
        <Link
          to='/plans/new'
          className="bg-cyan-500 text-white rounded px-4 py-2 flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-3" />
          Start new plan
        </Link>
      </div>
    </div>
  )
}