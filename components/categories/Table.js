import Pagination from "@/components/Pagination"
import { getFetch } from "@/utils/fetching"
import Link from "next/link"

export default async function Table({params}) {
    const data = await getFetch(`/categories?${params}`)

  return (
    <>
        <div className="table-font table-responsive">
            <table className="table">
                <thead> 
                    <tr>
                        <th scope="col">نام </th>
                        <th scope="col">توضیحات</th>
                        <th scope="col">عملیات</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {data.data.categories.map(category=>(
                       <tr key={category.id}>
                            <td scope="row">{category.name}</td>
                            <td>{category.description}</td>
                            <td>
                                <Link href={`/categories/${category.id}`} className="btn btn-outline-dark btn-sm ms-2">نمایش</Link>
                                <Link href={`/categories/edit/${category.id}`} className="btn btn-dark btn-sm">ویرایش</Link>
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
