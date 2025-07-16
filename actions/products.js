'use server'

import { handleErrors } from "@/utils/helper"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { deleteFetch } from "@/utils/fetching"

async function createProduct(state,formData){
    const primary_image = formData.get('primary_image')
    const name = formData.get('name')
    const category_id = formData.get('category_id')
    const price = formData.get('price')
    const status = formData.get('status')
    const quantity = formData.get('quantity')
    const description = formData.get('description')
console.log(formData);

    if(primary_image.size == 0){
        return{
            status:'error',
            message:'تصویر اولیه الزامی است'
        }
    }
    if(name == ''){
        return{
            status:'error',
            message:'نام را وارد کنید'
        }
    }
    if(category_id == null){
        return{
            status:'error',
            message:'دسته مورد نظر را انتخاب کنید'
        }
    }
    if(price == ''){
        return{
            status:'error',
            message:'قیمت مورد نظر را وارد کنید'
        }
    }
    if(status == ''){
        return{
            status:'error',
            message:'وضعیت را وارد کنید'
        }
    }
    if(quantity == ''){
        return{
            status:'error',
            message:'تعداد را وارد کنید'
        }
    }
    if(description == ''){
        return{
            status:'error',
            message:'توضیحات را وارد کنید'
        }
    }
    

const token = (await cookies()).get('token')
const res = await fetch(`${process.env.API_URL}/products`,{
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
     revalidatePath('/products')
    return{
        status:data.status,
        message:'محصول مورد نظر ایجاد شد'
    }
 }else{
    return{
        status:data.status,
        message:handleErrors(data.message)
    }
 }
}

async function deleteProduct(state,formData){
    
    const id = formData.get('id')

    if(id === null || id === ''){
        return{
            status:'error',
            message:' شناسه کاربر الزامی است'
        }
    }
   
const data = await deleteFetch(`/products/${id}`) 
 
  if(data.status === 'success'){
    revalidatePath('/products')
    redirect('/products')
    return{
        status:data.status,
        message:'محصول مورد نظر با موفقیت حذف شد'
    }
 }else{
    return{
        status:data.status,
        message:handleErrors(data.message)
    }
 }
}

async function editProduct(state,formData){
    
    const id = formData.get('id')
    const primary_image = formData.get('primary_image')
    const images = formData.get('images[]')
    const name = formData.get('name')
    const category_id = formData.get('category_id')
    const price = formData.get('price')
    const quantity = formData.get('quantity')

    if(primary_image.size == 0){
        formData.delete('primary_image')
    }
    if(images.size == 0){
        formData.delete('images[]')
    }
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
    if(category_id == null){
        return{
            status:'error',
            message:'دسته مورد نظر را انتخاب کنید'
        }
    }
    if(price == ''){
        return{
            status:'error',
            message:'قیمت مورد نظر را وارد کنید'
        }
    }
    if(quantity == ''){
        return{
            status:'error',
            message:'تعداد را وارد کنید'
        }
    }
   

const token = (await cookies()).get('token')
const res = await fetch(`${process.env.API_URL}/products/${id}`,{
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
     revalidatePath('/products')
    return{
        status:data.status,
        message:'محصول مورد نظر ویرایش شد'
    }
 }else{
    return{
        status:data.status,
        message:handleErrors(data.message)
    }
 }
}

export {createProduct,deleteProduct,editProduct}