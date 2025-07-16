'use client'

import { editUser } from "@/actions/users"
import { useActionState, useEffect } from "react"
import Submit from "../Submit"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

export default  function Edit({user}) {

const [state,formDataEdit] = useActionState(editUser,{})
const router = useRouter()

useEffect(()=>{
  toast(state?.message,{ type:`${state?.status}`})
  if(state?.status == 'success'){
    router.push('/users')
    }
},[state])

  return (
    <form action={formDataEdit}>
          <div className="row g-3 align-items-center">
            <div className="col-auto">
              <label htmlFor="input1" className="col-form-label">
                نام
              </label>
              <input
                name="name"
                type="text"
                defaultValue={user.name}
                id="input1"
                className="form-control"
                aria-describedby="passwordHelpInline"
              />
            </div>

            <div className="col-auto">
              <label htmlFor="input2" className="col-form-label">
                ایمیل
              </label>
              <input
                name="email"
                type="email"
                defaultValue={user.email}
                id="input2"
                className="form-control"
                aria-describedby="passwordHelpInline"
              />
            </div>

            <div className="col-auto">
              <label htmlFor="input3" className="col-form-label">
                شماره تماس
              </label>
              <input
                name="cellphone"
                type="text"
                defaultValue={user.cellphone}
                id="input3"
                className="form-control"
                aria-describedby="passwordHelpInline"
              />
            </div>

            <div className="col-auto">
              <label htmlFor="input4" className="col-form-label">
                رمز عبور
              </label>
              <input
                name="password"
                type="password"
                id="input4"
                className="form-control"
                aria-describedby="passwordHelpInline"
              />
            </div>
            <input type="hidden" name="id" value={user.id} />
          </div>
          <Submit title="ویرایش کاربر" style="btn btn-outline-dark mt-4" />
        </form>
  )
}
