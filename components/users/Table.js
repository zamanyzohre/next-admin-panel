import Pagination from "@/components/Pagination"
import { getFetch } from "@/utils/fetching"
import Link from "next/link"

export default async function Table({params}) {
    const data = await getFetch(`/users?${params}`)

  return (
    <>
        <div className="table-font table-responsive">
            <table className="table">
                <thead> 
                    <tr>
                        <th scope="col">نام </th>
                        <th scope="col">ایمیل</th>
                        <th scope="col">شماره تلفن</th>
                        <th scope="col"> تاریخ عضویت </th>
                        <th scope="col">عملیات</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {data.data.users.map(user=>(
                       <tr key={user.id}>
                            <td scope="row">{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.cellphone}</td>
                            <td>{user.created_at}</td>
                            <td>
                                <Link href={`/users/${user.id}`} className="btn btn-outline-dark btn-sm ms-2">نمایش</Link>
                                <Link href={`/users/edit/${user.id}`} className="btn btn-dark btn-sm">ویرایش</Link>
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
