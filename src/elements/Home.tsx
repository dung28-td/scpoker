import { Link } from "react-router-dom"

export default function Home() {
  return (
    <Link to='/plans/new' className="text-cyan-500">
      Start new plan
    </Link>
  )
}