"use server"

import { deleteFetch, editFetch, postFetch } from "@/utils/fetching"
import { handleErrors } from "@/utils/helper"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

async function createUser(state,formData) {
    const name = formData.get('name')
    const email = formData.get('email')
    const cellphone = formData.get('cellphone')
    const password = formData.get('password')
   
    if(name == ""){
        return{
            status:"error",
            message:"فیلد نام الزامی است"
        }
    }
    if(email == ""){
        return{
            status:"error",
            message:"فیلد ایمیل الزامی است"
        }
    }

    const pattern = /^(\+98|0)?9\d{9}$/;
    if(cellphone == "" || !pattern.test(cellphone)){
        return{
            status:"error",
            message:"فرمت شماره موبایل معتبر نمی باشد"
        }
    }
     if(password == ""){
        return{
            status:"error",
            message:"فیلد پسورد الزامی است"
        }
    }

    const data = await postFetch('/users',{name,email,cellphone,password})
    
     if(data.status == 'success'){
           revalidatePath('/users')
            return{
                status:data.status,
                message:'کاربر با موفقیت ایجاد شد',
            }
        }else{
            return{
                status:data.status,
                message:handleErrors(data.message)
            }
        }
}

async function editUser(state,formData) {
    const name = formData.get('name')
    const email = formData.get('email')
    const cellphone = formData.get('cellphone')
    const password = formData.get('password')
    const id = formData.get('id')
   
    if(id == "" || id == null){
        return{
            status:"error",
            message:" شناسه کاربر الزامی است"
        }
    }
    if(name == ""){
        return{
            status:"error",
            message:"فیلد نام الزامی است"
        }
    }
    if(email == ""){
        return{
            status:"error",
            message:"فیلد ایمیل الزامی است"
        }
    }

    const pattern = /^(\+98|0)?9\d{9}$/;
    if(cellphone == "" || !pattern.test(cellphone)){
        return{
            status:"error",
            message:"فرمت شماره موبایل معتبر نمی باشد"
        }
    }
    

    const data = await editFetch(`/users/${id}`,{name,email,cellphone,password})
    
     if(data.status == 'success'){
           revalidatePath('/users');
            return{
                status:data.status,
                message:'کاربر با موفقیت ویرایش شد',
            }
        }else{
            return{
                status:data.status,
                message:handleErrors(data.message)
            }
        }
}

async function deleteUser(state,formData) {
    const id = formData.get('id')
   
    if(id === "" || id === null){
        return{
            status:"error",
            message:" شناسه کاربری الزامی است"
        }
    }
   

    const data = await deleteFetch(`/users/${id}`)
    
     if(data.status == 'success'){
           revalidatePath('/users')
           redirect('/users')
            return{
                status:data.status,
                message:'کاربر با موفقیت حذف شد',
            }
        }else{
            return{
                status:data.status,
                message:handleErrors(data.message)
            }
        }
}



export {createUser,deleteUser,editUser}