'use client'

import { useActionState, useEffect, useState } from "react"
import { editCoupons } from "@/actions/coupons"
import { useRouter } from "next/navigation"
import Submit from "@/components/Submit"
import { toast } from "react-toastify"

import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";

export default function page({coupon}) {
    const [state,formAction] = useActionState(editCoupons,{})
    const router = useRouter()
    const [dateExpired,setDateExpired] = useState({
      'persian':coupon.expired_at,
      'gregorian':coupon.expired_at_gregorian
    })

    useEffect(()=>{
        toast(state?.message,{ type:`${state?.status}`})
        if(state.status == 'success'){
            router.push('/coupons')
        }
    },[state])

     function changeDateOnExpired(value){
            setDateExpired({
              'persian':value,
              'gregorian':value.convert(gregorian, gregorian_en).format("YYYY-MM-DD HH:mm:ss")
            })
        }

  return (
            <>
                <div className="container my-5">

                  <form action={formAction}>
                      <div className="row g-3 mt-2">

                          <div className="col-md-3">
                              <label htmlFor="input3" className="col-form-label">کد</label>
                              <input name="code" defaultValue={coupon.code} type="text" id="input3" className="form-control" aria-describedby="passwordHelpInline"/>
                          </div>
                                      
                          <div className="col-md-3">
                              <label htmlFor="input4" className="col-form-label">درصد</label>
                              <input name="percentage" defaultValue={coupon.percentage} type="text" id="input4" className="form-control" aria-describedby="passwordHelpInline"/>
                          </div>
                                          
                          <div className="col-md-3">
                              <label htmlFor="input5" className="col-form-label">تاریخ انقضاء </label>
                              <DatePicker 
                              value={dateExpired.persian}
                              onChange={changeDateOnExpired}
                              inputClass="form-control"
                              calendar={persian}
                              locale={persian_fa}
                              format="YYYY/MM/DD HH:mm:ss"
                              />
                          </div>

                          <input type="hidden" name="expired_at" defaultValue={dateExpired.gregorian} id="input10" />
                          <input type="hidden" name="id" value={coupon.id} />

                      </div>
                      <Submit title="ویرایش تخفیف" style="btn btn-outline-dark mt-4"/>
                  </form>

                </div>
            </>
  )
}
