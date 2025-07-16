import Edit from "@/components/categories/Edit"
import { getFetch } from "@/utils/fetching"

export default async function page({params}) {
    const {id} = await params
   const data = await getFetch(`/categories/${id}`)

  return (
     <>
          <div className="container my-5">
            <h5 className="fw-bold mb-3"> ویرایش دسته بندی : {data.data.name}</h5>
            <hr />
            <Edit category={data.data}/>
          </div>
        </>

  )
}