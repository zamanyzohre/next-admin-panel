'use client'

import { useRouter } from 'next/navigation'
import Submit from "@/components/Submit"
import { toast } from "react-toastify"
import { useActionState, useEffect } from "react"
import { editCategories } from "@/actions/categories"

export default function Edit({category}) {
    const [state,formAction] = useActionState(editCategories,{})
     const router = useRouter()
    

    useEffect(()=>{
        toast(state?.message,{ type:`${state?.status}`})
        if(state.status == 'success'){
            router.push('/categories')
        }
    },[state])

  return (
            <form action={formAction}>
            
            <div className="row g-3 mt-2">

                <div className="col-md-3">
                    <label htmlFor="input3" className="col-form-label">نام</label>
                    <input name="name" defaultValue={category.name} type="text" id="input3" className="form-control" aria-describedby="passwordHelpInline"/>
                </div>
                  
                <div className="col-md-6">
                    <label htmlFor="input10" className="col-form-label"> توضیحات </label>
                    <textarea name="description" defaultValue={category.description} className="form-control" rows="1" id="input10" />
                </div>
                                
            </div>
            <input type="hidden" name='id' value={category.id} />
            <Submit title="ویرایش دسته بندی" style="btn btn-outline-dark mt-4"/>
        </form>
  )
}
