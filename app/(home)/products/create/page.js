import CreateProduct from "@/components/products/CreateProduct"
import { getFetch } from "@/utils/fetching"

export default async function page() {
    const data = await getFetch('/categories')
//    console.log(data);
   
  return (
            <>
                <div className="container my-5">
                    <h5 className="fw-bold mb-3"> ایجاد محصول </h5>
                    <hr />

                   <CreateProduct categories={data.data.categories}/>

                </div>
            </>
  )
}
