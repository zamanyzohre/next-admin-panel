'use client'

import { createUser } from "@/actions/users";
import Submit from "@/components/Submit";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export default function page(){
    const [state,formAction] = useActionState(createUser,{})
    const router = useRouter()
    useEffect(()=>{
        toast(state.message,{ type:`${state.status}`})
        if(state.status == 'success'){
            router.push('/users')
        }
    },[state])

    return(
        <>
            <div className="container my-5">
                <h5 className="fw-bold mb-3"> ایجاد کاربر </h5>
                <hr />
                <form action={formAction}>
                    <div className="row g-3 align-items-center">
                        <div className="col-auto">
                            <label htmlFor="input1" className="col-form-label">نام</label>
                            <input name="name" type="text" id="input1" className="form-control" aria-describedby="passwordHelpInline"/>
                        </div>
                        
                        <div className="col-auto">
                            <label htmlFor="input2" className="col-form-label">ایمیل</label>
                            <input name="email" type="email" id="input2" className="form-control" aria-describedby="passwordHelpInline"/>
                        </div>
                            
                        <div className="col-auto">
                            <label htmlFor="input3" className="col-form-label">شماره تماس</label>
                            <input name="cellphone" type="text" id="input3" className="form-control" aria-describedby="passwordHelpInline"/>
                        </div>

                        <div className="col-auto">
                            <label htmlFor="input4" className="col-form-label">رمز عبور </label>
                            <input name="password" type="password" id="input4" className="form-control" aria-describedby="passwordHelpInline"/>
                        </div>
                            
                    </div>
                    <Submit title="ایجاد کاربر" style="btn btn-outline-dark mt-4"/>
                </form>
            </div>
        </>
    )
}