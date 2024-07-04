'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function SignUppage() {
  let router=useRouter()
    let [user,setUser]=useState({
         name:'',
         email:'',
         password:'',
         password_confirmation:''

    })

    let [error,setErrors]=useState({})
    let [loading,setLoading]=useState(false)

    const getUserValue=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
        setErrors({...error,[e.target.name]:''})
    }

    



    const submitHandler = async () => {
        try {
            setLoading(true)
          let resp = await axios.post('/api/auth/register', user);
          setLoading(false)
          let response=resp.data
          
         
          if(response.status===200){
            router.push(`/login?message=${response.message}`)
            setUser({
              name:'',
              email:'',
              password:'',
              password_confirmation:''
     
         })
          }else if(response.status===400){
            setErrors(response.errors)
          }

        } catch (error) {
          console.error(error);
        }
      };
      
  return (
     <>
     <div className="form_outer">
        <div className="form_field">
            <label htmlFor="">name</label>
            <input type="text" name="name" id="" value={user.name} onChange={getUserValue}/>
            <span>{error.name}</span>
        </div>
        <div className="form_field">
            <label htmlFor="">email</label>
            <input type="email" name="email" id=""  value={user.email}onChange={getUserValue}/>
            <span>{error.email}</span>
        </div>
        <div className="form_field">
            <label htmlFor="">password</label>
            <input type="password" name="password" id="" value={user.password} onChange={getUserValue}/>
            <span>{error.password}</span>
        </div>
        <div className="form_field">
            <label htmlFor="">confirm password</label>
            <input type="password" name="password_confirmation" value={user.password_confirmation} id="" onChange={getUserValue}/>
        </div>
        <div className="form_button">
            <button onClick={submitHandler}>{loading?'processing':'register'}</button>
        </div>
    </div>
     </>
  )
}

export default SignUppage
