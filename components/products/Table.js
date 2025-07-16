
import Pagination from "@/components/Pagination"
import { getFetch } from "@/utils/fetching"
import { getBlureDataUrl } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link"

export default async function Table({params}) {
const data = await getFetch(`/products?${params}`)

console.log(data,'ta');

  return (
    <>
        <div className="table-font table-responsive">
            <table className="table align-middle">
                <thead> 
                    <tr>
                        <th scope="col">تصویر </th>
                        <th scope="col">نام</th>
                        <th scope="col">دسته بندی </th>
                        <th scope="col"> قیمت  </th>
                        <th scope="col"> تعداد  </th>
                        <th scope="col">وضعیت</th>
                        <th scope="col">عملیات</th>
                        
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {data.data.products.map(product=>(
                       <tr key={product.id}>
                            <td scope="row">
                                <Image src={product.primary_image} alt="image-product"width={80} height={53} placeholder="blur" blurDataURL={getBlureDataUrl()}/>
                            </td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>{product.status}</td>
                            <td>
                                <Link href={`/products/${product.id}`} className="btn btn-outline-dark btn-sm ms-2">نمایش</Link>
                                <Link href={`/products/edit/${product.id}`} className="btn btn-dark btn-sm">ویرایش</Link>
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
