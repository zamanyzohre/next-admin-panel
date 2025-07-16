

import { cookies } from "next/headers"

const getFetch = async(url)=>{
    const token = (await cookies()).get('token')
    const res = await fetch(`${process.env.API_URL}${url}`,{
        cache:'no-store',
        headers:{
            'Content-Type':'application/json',
            "Accept":"application/json",
            "Authorization":`Bearer ${token.value}`
        }
    })

 return await res.json();
}
       
const postFetch = async(url,body)=>{
    const token = (await cookies()).get('token')

    const res = await fetch(`${process.env.API_URL}${url}`,{
        method:'POST',
        cache:'no-store',
        headers:{
            'Content-Type':'application/json',
            "Accept":"application/json",
            "Authorization":`Bearer ${token.value}`
        },
        body:JSON.stringify(body)
    })

        return await res.json()


}

const postFetchUnauth = async(url,body)=>{

    const res = await fetch(`${process.env.API_URL}${url}`,{
        method:'POST',
        cache:'no-store',
        headers:{
            'Content-Type':'application/json',
            "Accept":"application/json",
        },
        body:JSON.stringify(body)
    })

           return await res.json()
     

}

const editFetch = async(url,body)=>{
    const token = (await cookies()).get('token')

    const res = await fetch(`${process.env.API_URL}${url}`,{
        method:'PUT',
        cache:'no-store',
        headers:{
            'Content-Type':'application/json',
            "Accept":"application/json",
            "Authorization":`Bearer ${token.value}`
        },
        body:JSON.stringify(body)
    })

        return await res.json()


}

const deleteFetch = async(url)=>{
    const token = (await cookies()).get('token')

    const res = await fetch(`${process.env.API_URL}${url}`,{
        method:"DELETE",
        cache:'no-store',
        headers:{
            'Content-Type':'application/json',
            "Accept":"application/json",
            "Authorization":`Bearer ${token.value}`
        }
    })

    if(res.ok){
        const data = await res.json()
        return data
    }else{
        throw new Error(`مشکل در ارسال پیام-  کد : ${res.status}`)
    }
}



export {getFetch,postFetch,postFetchUnauth,deleteFetch,editFetch}