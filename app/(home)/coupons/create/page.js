'use client'

import { useActionState, useEffect, useState } from "react"
import { createCoupons } from "@/actions/coupons"
import { useRouter } from "next/navigation"
import Submit from "@/components/Submit"
import { toast } from "react-toastify"

import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";

export default function page() {
    const [state,formAction] = useActionState(createCoupons,{})
    const router = useRouter()
    const [dateExpired,setDateExpired] = useState('')

    useEffect(()=>{
        toast(state?.message,{ type:`${state?.status}`})
        if(state.status == 'success'){
            router.push('/coupons')
        }
    },[state])

     function changeDateOnExpired(value){
            setDateExpired(value.convert(gregorian, gregorian_en).format("YYYY-MM-DD HH:mm:ss"))
        }

  return (
            <>
                <div className="container my-5">
                    <h5 className="fw-bold mb-3"> ایجاد تخفیف </h5>
                    <hr />

                <form action={formAction}>
                    <div className="row g-3 mt-2">

                        <div className="col-md-3">
                            <label htmlFor="input3" className="col-form-label">کد</label>
                            <input name="code" type="text" id="input3" className="form-control" aria-describedby="passwordHelpInline"/>
                        </div>
                                    
                        <div className="col-md-3">
                            <label htmlFor="input4" className="col-form-label">درصد</label>
                            <input name="percentage" type="text" id="input4" className="form-control" aria-describedby="passwordHelpInline"/>
                        </div>
                                        
                        <div className="col-md-3">
                            <label htmlFor="input5" className="col-form-label">تاریخ انقضاء </label>
                            <DatePicker 
                            onChange={changeDateOnExpired}
                            inputClass="form-control"
                            style={{"zIndex":"500"}}
                            calendar={persian}
                            locale={persian_fa}
                            format="YYYY/MM/DD HH:mm:ss"
                            />
                        </div>

                        <input type="hidden" name="expired_at" defaultValue={dateExpired} id="input10" />

                    </div>
                    <Submit title="ایجاد تخفیف" style="btn btn-outline-dark mt-4"/>
                </form>

                </div>
            </>
  )
}
