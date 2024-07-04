'use client'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

function LoginPage() {
  let searchParams = useSearchParams()

  let data = searchParams.get('message')

  let [user, setUser] = useState({
    email: '',
    password: '',
  })

  let [error, setErrors] = useState({})
  let [loading, setLoading] = useState(false)

  const getUserValue = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
    setErrors({ ...error, [e.target.name]: '' })
  }





  const submitHandler = async () => {
    try {
      setLoading(true)
      let resp = await axios.post('/api/auth/login', user);
      setLoading(false)
      let response = resp.data


      if (response.status === 200) {
        signIn("credentials", {
          email: user.email,
          password: user.password,
          callbackUrl: '/',
          redirect: true
        })
        console.log(response)
        setUser({

          email: '',
          password: ''


        })
      } else if (response.status === 400) {
        setErrors(response.errors)
      }

    } catch (error) {
      console.error(error);
    }
  };

  // signin with github

  const gitHubSignin=()=>{
    signIn('github',{
      callbackUrl:'/',
      redirect:true
    })
  }




  return (
    <>
      {data ? <h1>{data}</h1> : ''}
      <div className="form_outer">
        <div className="form_field">
          <label htmlFor="">email</label>
          <input type="email" name="email" id="" value={user.email} onChange={getUserValue} />
          <span>{error.email || error.message}</span>
        </div>
        <div className="form_field">
          <label htmlFor="">password</label>
          <input type="password" name="password" id="" value={user.password} onChange={getUserValue} />
          <span>{error.password || error.message}</span>
        </div>
        <div className="form_button">
          <button onClick={submitHandler}>{loading ? 'processing' : 'login'}</button>
        </div>

        <button onClick={gitHubSignin}>login with github</button>
      </div>
    </>
  )
}

export default LoginPage
