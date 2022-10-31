import Container from 'components/Container'
import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <Container tag='header'>
        <div className='flex items-center h-16'>
          <Link
            to='/'
            className='text-cyan-500 text-2xl font-semibold'
          >
            ScPoker
          </Link>
        </div>
      </Container>
      <Outlet />
    </>
  )
}