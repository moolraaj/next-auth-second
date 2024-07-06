import Logout from '@/app/component/logout'
import { signOut } from 'next-auth/react'
import React from 'react'

function Dashboardpage() {
  
  return (
    <>
    <h1>this is admin dashboard</h1>
    <Logout  role='admin'/>
    </>
  )
}

export default Dashboardpage
