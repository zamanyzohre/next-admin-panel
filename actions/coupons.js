'use server'

import { handleErrors } from "@/utils/helper"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { deleteFetch, editFetch, postFetch } from "@/utils/fetching"

async function createCoupons(state,formData){
    const code = formData.get('code')
    const percentage = formData.get('percentage')
    const expired_at = formData.get('expired_at')

    if(code === ""){
        return{
            status:'error',
            message:'فیلد کد تخفیف را وارد کنید'
        }
    }
    if(percentage === ""){
        return{
            status:'error',
            message:'درصد مورد نظر را وارد کنید'
        }
    }

    if(expired_at === ""){
        return{
            status:'error',
            message:'تاریخ انقضاء را وارد کنید'
        }
    }
  

const data = await postFetch('/coupons',{code,percentage,expired_at}) 

  if(data.status === 'success'){
     revalidatePath('/coupons')
    return{
        status:data.status,
        message:'تخفیف مورد نظر ایجاد شد'
    }
 }else{
    return{
        status:data.status,
        message:handleErrors(data.message)
    }
 }
}

async function deleteCoupons(state,formData){
    
    const id = formData.get('id')

    if(id === null || id === ''){
        return{
            status:'error',
            message:' شناسه تخفیف الزامی است'
        }
    }
   
const data = await deleteFetch(`/coupons/${id}`) 
 
  if(data.status === 'success'){
    revalidatePath('/coupons')
    redirect('/coupons')
    return{
        status:data.status,
        message:'تخفیف مورد نظر با موفقیت حذف شد'
    }
 }else{
    return{
        status:data.status,
        message:handleErrors(data.message)
    }
 }
}

async function editCoupons(state,formData){
    
    const id = formData.get('id')
    const code = formData.get('code')
    const percentage = formData.get('percentage')
    const expired_at = formData.get('expired_at')

     if(id == "" || id == null){
        return{
            status:'error',
            message:' شناسه تخفیف را وارد کنید'
        }
    }
    if(code == ''){
        return{
            status:'error',
            message:'فیلد کد تخفیف را وارد کنید'
        }
    }
    if(percentage == ""){
        return{
            status:'error',
            message:'درصد مورد نظر را وارد کنید'
        }
    }

const data = await editFetch(`/coupons/${id}`,{code,percentage,expired_at}) 

  if(data.status === 'success'){
     revalidatePath('/coupons')
    return{
        status:data.status,
        message:'کد تخفیف مورد نظر ویرایش شد'
    }
 }else{
    return{
        status:data.status,
        message:handleErrors(data.message)
    }
 }
}

export {createCoupons,deleteCoupons,editCoupons}