'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Pagination({links}) {
    const pathName = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    function handleclicked(page){
        const params = new URLSearchParams(searchParams)
        params.set("page",page)
        router.replace(`${pathName}?${params.toString()}`)
    }
    
  return (
        <div className="mt-5">
            <nav aria-label="Page navigation example ">
                <ul className="pagination justify-content-center">
                    {links.slice(1,-1).map((link,index)=>(

                    <li key={index} className={link.active? "page-item active":"page-item"}>
                        <button onClick={()=>handleclicked(link.label)} className="page-link" >{link.label}</button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
  )
}
