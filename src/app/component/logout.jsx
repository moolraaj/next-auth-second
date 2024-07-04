'use client'
import { signOut } from 'next-auth/react'
import React from 'react'

function Logout() {
    const logoutHandler=()=>{
        signOut({
            callbackUrl:'/login',
            redirect:true
        })
    }
  return (
    <>
    <button onClick={logoutHandler}>logout</button>
    </>
  )
}

export default Logout
