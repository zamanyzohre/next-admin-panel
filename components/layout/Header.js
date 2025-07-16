'use client'

import { logOut } from "@/actions/auth"
import { AuthContext } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useContext } from "react"


export default function Header() {
    const {user,logoutContext} = useContext(AuthContext)
    const router = useRouter()
  return (
    <header className="header">
        <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body fixed-top shadow" data-bs-theme="dark">
            <div className="container-fluid d-block d-md-flex">
                <a className="navbar-brand col-md-3 col-lg-2 ms-0 px-3" href="#">Webinoo.io</a>
                <button className="navbar-toggler d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="w-md-100"></div>
                <div className="navbar-nav me-md-auto text-nowrap d-flex flex-row">
                    {user && (
                        <>
                        <span className="nav-link ms-3 me-4">{user.name}</span>
                        <a className="nav-link" href="#" 
                        onClick={async()=>{
                           await logOut();
                            logoutContext()
                            router.push('/login')
                        }}
                        >خروج</a>
                        </>
                    )}
                </div>
            </div>
        </nav>
    </header>
  )
}
