'use client'

import { login } from "@/actions/auth"
import Submit from "@/components/Submit"
import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"

export default function page() {

  const [state,formAction] = useActionState(login,{})
  const router = useRouter()

  useEffect(()=>{
    toast(state?.message,{ type:`${state?.status}`})
    
    if(state?.status == 'success'){
      router.push('/')
    }
  },[state])

  return (
    <div className="row align-items-center justify-content-center login">
        <div className="col-md-4 ">
            <div className="card">
                <div className="card-body">
                  <div className="card-title">
                    <h5 className="text-center">ورود به پنل ادمین</h5>
                  </div>

                  <form action={formAction}>
                    <div>
                      <label htmlFor="email" className="col-sm-2 col-form-label">ایمیل</label>
                      <input name="email" type="email" className="form-control" id="email" />
                    </div>
                    <div>
                      <label htmlFor="inputPassword" className="col-sm-2 col-form-label">رمز عبور</label>
                      <input name="password" type="password" className="form-control" id="inputPassword"/>
                    </div>
                    <Submit title="ورود" style="btn btn-dark mt-4" />
                  </form>

                </div>
            </div>
        </div>
    </div>
  )
}
