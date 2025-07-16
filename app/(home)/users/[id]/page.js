import Delete from "@/components/users/Delete"
import { getFetch } from "@/utils/fetching"

export default async function page({params}){
    const { id } = await params
    const data = await getFetch(`/users/${id}`)

    return(
        <>
            <div className="container my-5">
                <h5 className="fw-bold mb-3">
                      کاربر: 
                    <span className="me-2">{data.data.name}</span>
                </h5>
                <hr />
                    <div className="row g-3 align-items-center">
                        <div className="col-auto">
                            <label htmlFor="input1" className="col-form-label">نام</label>
                            <input disabled type="text" placeholder={data.data.name} id="input1" className="form-control" aria-describedby="passwordHelpInline"/>
                        </div>
                        
                        <div className="col-auto">
                            <label htmlFor="input2" className="col-form-label">ایمیل</label>
                            <input disabled type="email" placeholder={data.data.email} id="input2" className="form-control" aria-describedby="passwordHelpInline"/>
                        </div>
                            
                        <div className="col-auto">
                            <label htmlFor="input3" className="col-form-label">شماره تماس</label>
                            <input disabled type="text" placeholder={data.data.cellphone} id="input3" className="form-control" aria-describedby="passwordHelpInline" />
                        </div>

                    </div>
                    <Delete id={data.data.id}/>
            </div>
        </>
    )
}