"use server"

import { postFetch, postFetchUnauth } from "@/utils/fetching"
import { handleErrors } from "@/utils/helper"
import { cookies } from "next/headers"

async function login(state,formData) {
    const email = formData.get('email')
    const password = formData.get('password')

   
    if(email == ""){
        return{
            status:"error",
            message:"فیلد ایمیل الزامی است"
        }
    }
     if(password == ""){
        return{
            status:"error",
            message:"فیلد پسورد الزامی است"
        }
    }

    const data = await postFetchUnauth('/auth/login',{email,password})
    
     if(data.status == 'success'){
            (await cookies()).set({
                name:'token',
                value:data.data.token,
                httpOnly:true,
                path:'/',
                maxAge:60 * 60 * 24 * 7 //1 week
            })
            return{
                status:data.status,
                message:'شما با موفقیت وارد شدید',
                user:data.data.user
            }
        }else{
            return{
                status:data.status,
                message:handleErrors(data.message)
            }
        }
}

async function me(state,formData) {

    const token = (await cookies()).get('token')

     if(!token ){
    return{
        error:"Not Authorized"
    }
   }
    
    const data = await postFetch('/auth/me')
    
           if(data.status == 'success'){
            return{
                status:data.status,
                user:data.data
            }
        }else{
            return{
                status:data.status,
                message:handleErrors(data.message)
            }
        }
}

async function logOut() {
   
    const data = await postFetch('/auth/logout')

    if(data.status == 'success'){
        (await cookies()).delete('token')
        return{
            success:'شما از حساب خود خارج شدید'
        }
    }else{
        return{
            error:'User Forbiden'
        }
    }
}

export {login,me,logOut}