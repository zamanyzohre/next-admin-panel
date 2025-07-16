'use server'

import { handleErrors } from "@/utils/helper"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { deleteFetch, editFetch } from "@/utils/fetching"

async function createCategories(state,formData){
    const name = formData.get('name')
    const description = formData.get('description')

    if(name == ''){
        return{
            status:'error',
            message:'نام را وارد کنید'
        }
    }
   
const token = (await cookies()).get('token')
const res = await fetch(`${process.env.API_URL}/categories`,{
    method:'POST',
    cache:'no-store',
    headers:{
            "Accept":"application/json",
            "Authorization":`Bearer ${token.value}`
    },
    body:formData
 }) 

 const data = await res.json()
 
  if(data.status === 'success'){
     revalidatePath('/categories')
    return{
        status:data.status,
        message:'دسته بندی مورد نظر ایجاد شد'
    }
 }else{
    return{
        status:data.status,
        message:handleErrors(data.message)
    }
 }
}

async function deleteCategory(state,formData){
    
    const id = formData.get('id')

    if(id === null || id === ''){
        return{
            status:'error',
            message:' شناسه کاربر الزامی است'
        }
    }
   
const data = await deleteFetch(`/categories/${id}`) 
 
  if(data.status === 'success'){
    revalidatePath('/categories')
    redirect('/categories')
    return{
        status:data.status,
        message:'دسته بندی با موفقیت حذف شد'
    }
 }else{
    return{
        status:data.status,
        message:handleErrors(data.message)
    }
 }
}

async function editCategories(state,formData){
    
    const id = formData.get('id')
    const name = formData.get('name')
    const description = formData.get('description')

    if(id == '' || id == null){
        return{
            status:'error',
            message:"شناسه کاربری الزامی است"
        }
    }
    if(name == ''){
        return{
            status:'error',
            message:'نام را وارد کنید'
        }
    }
   
    if(description == ''){
        return{
            status:'error',
            message:'توضیخات را وارد کنید'
        }
    }
   

const data = await editFetch(`/categories/${id}`,{name,description})
   
 
  if(data.status === 'success'){
     revalidatePath('/categories')
    return{
        status:data.status,
        message:'دسته بندی مورد نظر ویرایش شد'
    }
 }else{
    return{
        status:data.status,
        message:handleErrors(data.message)
    }
 }
}

export {createCategories,deleteCategory,editCategories}