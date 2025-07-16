import Pagination from "@/components/Pagination"
import { getFetch } from "@/utils/fetching"
import Link from "next/link";

export default async function Table({params}) {

    const data = await getFetch(`/coupons?${params}`)
console.log(data)
  return (
    <>
        <div className="table-font table-responsive">
            <table className="table">
                <thead> 
                    <tr>
                        <th scope="col">کد</th>
                        <th scope="col">درصد</th>
                        <th scope="col">تاریخ انقضاء</th>
                        <th scope="col">تاریخ ایجاد</th>
                        <th scope="col">عملیات</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {data.data.coupons.map(coupon=>(
                       <tr key={coupon.id}>
                            <td scope="row">{coupon.code}</td>
                            <td >{coupon.percentage} %</td>
                            <td>{coupon.expired_at}</td>
                            <td>{coupon.created_at}</td>
                            <td>
                                <Link href={`/coupons/${coupon.id}`} className="btn btn-outline-dark btn-sm ms-2">نمایش</Link>
                                <Link href={`/coupons/edit/${coupon.id}`} className="btn btn-dark btn-sm">ویرایش</Link>
                            </td>
                        </tr>
                    ))}
                          
                </tbody>
            </table>

            <Pagination links={data.data.meta.links} />

        </div>
    </>
  )
}
