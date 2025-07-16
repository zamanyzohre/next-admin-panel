import Pagination from "@/components/Pagination"
import { getFetch } from "@/utils/fetching"
import { FormatNumber } from "@/utils/helper";
import Image from "next/image";

export default async function Table({params}) {

    const data = await getFetch(`/transactions?${params}`)
console.log(data)
  return (
    <>
        <div className="table-font table-responsive">
            <table className="table">
                <thead> 
                    <tr>
                        <th scope="col">شماره سفارش </th>
                        <th scope="col">وضعیت</th>
                        <th scope="col">مبلغ</th>
                        <th scope="col">تاریخ ایجاد</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {data.data.transactions.map(transaction=>(
                       <tr key={transaction.id}>
                            <td scope="row">{transaction.id}</td>
                            <td>{transaction.status}</td>
                            <td>{FormatNumber(transaction.amount)} تومان</td>
                            <td>{transaction.created_at}</td>

                        </tr>
                    ))}
                          
                </tbody>
            </table>

            <Pagination links={data.data.meta.links} />

        </div>
    </>
  )
}
