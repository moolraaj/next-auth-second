'use client'
import { signOut } from 'next-auth/react'
import React from 'react'

function Logout({role}) {
    const logoutHandler=()=>{
        signOut({
            callbackUrl:role==='admin'?'/signin':'/login',
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
