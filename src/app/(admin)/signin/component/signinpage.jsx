'use client'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

function Signinpage() {
    const router = useRouter()
    const [admin, setAdmin] = useState({
        email: '',
        password: ''
    })

    const getAdminValue = (e) => {
        setAdmin({ ...admin, [e.target.name]: e.target.value })
    }

    const submitAdmin = async () => {
        try {
            const resp = await axios.post('/api/admin/login', admin)
            const response = resp.data
            console.log(response)

            if (response.status === 200) {
                const result = await signIn("credentials", {
                    email: admin.email,
                    password: admin.password,
                    redirect: false
                })

                if (result.error) {
                    console.error(result.error)
                } else {
                    router.push('/dashboard')
                }
            }
        } catch (error) {
            console.error("Error logging in:", error)
        }
    }

    return (
        <>
            <input
                type="email"
                name="email"
                value={admin.email}
                onChange={getAdminValue}
                placeholder='Enter admin email address'
            /><br /><br />
            <input
                type="password"
                name="password"
                value={admin.password}
                onChange={getAdminValue}
                placeholder='Enter admin password'
            /><br /><br />
            <button onClick={submitAdmin}>Login</button>
        </>
    )
}

export default Signinpage
