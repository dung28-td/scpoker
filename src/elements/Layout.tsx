import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <header className='h-16' />
      <Outlet />
    </>
  )
}