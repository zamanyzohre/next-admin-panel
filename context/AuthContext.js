'use client'

import { me } from "@/actions/auth"
import { createContext, useEffect, useState } from "react"

const AuthContext = createContext()


export default function AuthProvider( {children}) {
const [user,setUser] = useState(null)

useEffect(()=>{
    async function checkUserLogedIn(){
        const data = await me()
        
        if(data.status == 'success'){
            setUser(data.user)
        }else{
            setUser(null)
        }
    }
    checkUserLogedIn()
},[])

const logoutContext = ()=>{
    setUser(null)
}

  return (
    <AuthContext value={{user,logoutContext}}>
        {children}
    </AuthContext>
  )
}

export { AuthContext }