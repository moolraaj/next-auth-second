import React from 'react'

function SignUppage() {
  return (
     <>
     <div className="form_outer">
        <div className="form_field">
            <label htmlFor="">name</label>
            <input type="text" name="" id="" />
        </div>
        <div className="form_field">
            <label htmlFor="">email</label>
            <input type="email" name="" id="" />
        </div>
        <div className="form_field">
            <label htmlFor="">password</label>
            <input type="password" name="" id="" />
        </div>
        <div className="form_field">
            <label htmlFor="">confirm password</label>
            <input type="password" name="" id="" />
        </div>
        <div className="form_button">
            <button>register</button>
        </div>
    </div>
     </>
  )
}

export default SignUppage
