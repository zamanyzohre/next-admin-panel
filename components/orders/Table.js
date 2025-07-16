import Pagination from "@/components/Pagination"
import { getFetch } from "@/utils/fetching"
import { FormatNumber } from "@/utils/helper";
import Image from "next/image";

export default async function Table({params}) {

    const data = await getFetch(`/orders?${params}`)

  return (
    <>
        <div className="table-font table-responsive">
            <table className="table">
                <thead> 
                    <tr>
                        <th scope="col">شماره سفارش </th>
                        <th scope="col">وضعیت</th>
                        <th scope="col">وضعیت پرداخت </th>
                        <th scope="col">مبلغ پرداختی</th>
                        <th scope="col">تاریخ ایجاد</th>
                        <th scope="col">محصولات</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {data.data.orders.map(order=>(
                       <tr key={order.id}>
                            <td scope="row">{order.id}</td>
                            <td>{order.status}</td>
                            <td>{order.payment_status}</td>
                            <td>{FormatNumber(order.paying_amount)} تومان</td>
                            <td>{order.created_at}</td>
                            <td>
                                <button type="button" data-bs-target={`#Modal-${order.id}`} className="btn btn-dark" data-bs-toggle="modal">
                                نمایش
                                </button>

                                <div className="modal fade" id={`Modal-${order.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-lg">
                                        <div className="modal-content">
                                            <div className="modal-header ">
                                                <h5 className="modal-title " id="exampleModalLabel">محصولات سفارش شماره {order.id}</h5>
                                                <button type="button" className="btn-close me-auto ms-0" data-bs-dismiss="modal"></button>
                                            </div>
                                            <div className="modal-body">
                                                <table className="table">
                                                    <thead>
                                                    <tr>
                                                        <th scope="col"> محصول</th>
                                                        <th scope="col">نام</th>
                                                        <th scope="col">قیمت</th>
                                                        <th scope="col">تعداد </th>
                                                        <th scope="col">قیمت کل</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody className="table-group-divider align-middle">
                                                                {order.order_items.map(item=>(
                                                                <tr key={item.id}>
                                                                    <th scope="row">
                                                                    <Image src={item.product_primary_image} width={80} height={85} alt='product-image'
                                                                    placeholder="blur" blurDataURL="getBlureDataUrl"/>
                                                                    </th>
                                                                    <td>{item.product_name}</td>
                                                                    <td>{FormatNumber(item.price)} تومان</td>
                                                                    <td>{item.quantity}</td>
                                                                    <td>{FormatNumber(item.subtotal)} تومان</td>
                                                                    </tr>
                                                                ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
