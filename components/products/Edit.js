'use client'

import { useActionState, useEffect, useRef, useState } from "react"
import { editProduct } from "@/actions/products"
import { useRouter } from "next/navigation"
import Submit from "@/components/Submit"
import { toast } from "react-toastify"

import DatePicker  from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import Image from "next/image";
import { FormatNumber, getBlureDataUrl } from "@/utils/helper";


export default function EditProduct({categories,product}) {
    const [state,formAction] = useActionState(editProduct,{})
    const [image,setImage] = useState(null)
    const router = useRouter()
    const primaryImageRef = useRef()
    const [dateOnSale,setDateOnSale] = useState([])
    

    useEffect(()=>{
        if(product.is_sale){
            setDateOnSale([
                {
                    'persian':product.date_on_sale_from,
                    'gregorian':product.date_on_sale_from_gregorian
                },
                {
                    'persian':product.date_on_sale_to,
                    'gregorian':product.date_on_sale_to_gregorian
                }
            ])
        }

        toast(state?.message,{ type:`${state?.status}`})
        if(state.status == 'success'){
            router.push('/products')
        }
    },[state])

    function handlePrimaryImage(e){
        const file = e.target.files[0]
        const render = new FileReader()

        render.readAsDataURL(file)

        render.onloadend = ()=>{

            setImage(render.result.toString());
        }
        
    }

    function changeDateToSale(value){
        
         if (value.length == 2) {
                    setDateOnSale([
                        {
                            'persian':value[0],
                            'gregorian': value[0].convert(gregorian, gregorian_en).format("YYYY-MM-DD HH:mm:ss")
                        },
                        {
                            'persian':value[1],
                            'gregorian': value[1].convert(gregorian, gregorian_en).format("YYYY-MM-DD HH:mm:ss")
                        }
                    ])
                }
        
    }

  return (
        <form action={formAction}>

            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <label htmlFor="input1" className="col-form-label">تصویر اصلی</label>
                    <div className="input-group mb-3">
                        <div className={image === null? "":"d-none"}>
                            <Image src={product.primary_image} width={350} height={220} className="rounded" placeholder="blur" blurDataURL={getBlureDataUrl()} alt="primary-image"/>
                            <input name="primary_image" className="form-control mt-3" onChange={handlePrimaryImage} id="input1" ref={primaryImageRef} type="file"/>
                        </div>

                        <div className={image? "d-block position-relative":"d-none"}>
                            <img src={image} className="rounded" width={350} height={220} alt="primary_image"/>
                            <i onClick={()=>{primaryImageRef.current.value = '';setImage(null);}} className="bi bi-x text-danger cursor-pointer fs-4 fw-bold position-absolute" style={{top:'5px',right:'15px'}}></i>
                        </div>
                        
                    </div>
                </div>
            </div>

            <div className="row g-3 mt-2">

                <div className="col-md-3">
                                <label htmlFor="input2" className="col-form-label">تصاویر</label>
                                <div className="input-group mb-3">
                                    <input type="file" multiple name="images[]" className="form-control" placeholder="" id="input2"/>
                                </div>
                </div>

                <div className="col-md-3">
                                <label htmlFor="input3" className="col-form-label">نام</label>
                                <input name="name" defaultValue={product.name} type="text" id="input3" className="form-control" aria-describedby="passwordHelpInline"/>
                </div>
                            
                <div className="col-md-3">
                    <label htmlFor="input4" className="col-form-label">دسته بندی</label>
                        <div className="style">
                            <select name="category_id" defaultValue={product.category_id} className="form-select " id="input4">
                                <option value="" disabled>انتخاب دسته بندی</option>
                                {categories && categories.map(categorie=>(
                                <option key={categorie.id} value={categorie.id}>{categorie.name}</option>
                                ))}
                            </select>
                        </div>
                </div>
                                
                <div className="col-md-3">
                                <label htmlFor="input5" className="col-form-label">وضعیت </label>
                                <div className="">
                                    <select name="status" defaultValue={product.status_value} className="form-select style" id="input5">
                                        <option value="1">فعال</option>
                                        <option value="0">غیر فعال </option>
                                    </select>
                                </div>
                </div>

                <div className="col-md-3">
                                <label htmlFor="input6" className="col-form-label">قیمت </label>
                                <input name="price" type="text" defaultValue={FormatNumber(product.price)} id="input6" className="form-control" aria-describedby="passwordHelpInline"/>
                </div>

                <div className="col-md-3">
                                <label htmlFor="input7" className="col-form-label">تعداد </label>
                                <input name="quantity" type="text" defaultValue={product.quantity} id="input7" className="form-control" aria-describedby="passwordHelpInline"/>
                </div>

                <div className="col-md-3">
                                <label htmlFor="input8" className="col-form-label">قیمت حراجی </label>
                                <input name="sale_price" type="text" defaultValue={FormatNumber(product.sale_price)} id="input8" className="form-control" aria-describedby="passwordHelpInline"/>
                </div>

                <div className="col-md-3">
                    <label htmlFor="input9" className="col-form-label">تاریخ شروع و پایان حراجی  </label>
                        <DatePicker 
                            value={dateOnSale.map(date=>date.persian)}
                            onChange={changeDateToSale}
                            inputClass="form-control"
                            range 
                            dateSeparator=" تا " 
                            calendar={persian}
                            locale={persian_fa}
                            format="YYYY/MM/DD HH:mm:ss"
                            plugins={[
                                <TimePicker position="bottom" />,
                                <DatePanel markFocused />
                            ]}
                        />
                        
                        <input type="hidden" name="date_on_sale_from" value={dateOnSale.length > 0 && dateOnSale[0].gregorian} id="input10" />
                        <input type="hidden" name="date_on_sale_to" value={dateOnSale.length > 0 && dateOnSale[1].gregorian} />
                </div>
    
                <div>
                    <label htmlFor="input10" className="col-form-label"> توضیحات </label>
                    <textarea name="description" defaultValue={product.description} className="form-control" id="input10" rows='5'/>
                </div>
                                
            </div>

            <input type="hidden" name="id" defaultValue={product.id}/>
            <input type="hidden"  name="_method" defaultValue="put"/>

            <Submit title="ویرایش محصول" style="btn btn-outline-dark mt-4"/>

        </form>
  )
}