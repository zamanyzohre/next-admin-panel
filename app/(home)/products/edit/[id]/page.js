import EditProduct from "@/components/products/Edit";
import { getFetch } from "@/utils/fetching";

export default async function ({params}) {
   const { id } = await params
   const product = await getFetch(`/products/${id}`)
   const categories = await getFetch('/categories')
    console.log(product.data);

  return (
    <>
      <div className="container my-5">
        <h5 className="fw-bold mb-3"> ویرایش محصول : {product.data.name}</h5>
        <hr />
        <EditProduct categories={categories.data.categories} product={product.data}/>
      </div>
    </>
  );
}

