import Edit from "@/components/coupons/Edit"
import { getFetch } from "@/utils/fetching"

export default async function page({params}) {
  const {id} = await params
    const coupon = await getFetch(`/coupons/${id}`)
  return (
            <>
                <div className="container my-5">

                  <h5 className="fw-bold mb-3"> ویرایش تخفیف :{coupon.data.code}</h5>
                  <hr />
                  
                  <Edit coupon={coupon.data}/>
                </div>
            </>
  )
}
