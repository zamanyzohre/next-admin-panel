import { getFetch } from "@/utils/fetching";
import { FormatNumber, getBlureDataUrl } from "@/utils/helper";
import Delete from "@/components/products/Delete";
import Image from "next/image";

export default async function page({ params }) {
  const { id } = await params;
  const product = await getFetch(`/products/${id}`);
  // console.log(product.data.id);

  return (
    <>
      <div className="my-5">

        <div className="row">
          <div className="col-md-4 offset-md-4 ">
            <Image
              src={product.data.primary_image}
              priority
              width={350}
              height={200}
              placeholder="blur"
              blurDataURL={getBlureDataUrl()}
              alt="image-primary"
              className="rounded"
            />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-3">
            <label htmlFor="input3" className="col-form-label">
              نام
            </label>
            <input
              type="text"
              id="input3"
              className="form-control"
              aria-describedby="passwordHelpInline"
              disabled
              value={product.data.name}
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="input4" className="col-form-label">
              دسته بندی
            </label>
            <div className="style">
              <input
                disabled
                value={product.data.category}
                className="form-control"
                id="input4"
              />
            </div>
          </div>

          <div className="col-md-3">
            <label htmlFor="input5" className="col-form-label">
              وضعیت
            </label>
            <div className="">
              <input name="status" disabled value={product.data.status} className="form-control" id="input5"/>
            </div>
          </div>

          <div className="col-md-3">
            <label htmlFor="input6" className="col-form-label">
              قیمت
            </label>
            <input
              type="text"
              id="input6"
              className="form-control"
              aria-describedby="passwordHelpInline"
              disabled
              value={FormatNumber(product.data.price)}
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="input7" className="col-form-label">
              تعداد
            </label>
            <input
              type="text"
              id="input7"
              className="form-control"
              aria-describedby="passwordHelpInline"
              disabled
                value={product.data.quantity}
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="input8" className="col-form-label">
              قیمت حراجی
            </label>
            <input
              type="text"
              id="input8"
              className="form-control"
              aria-describedby="passwordHelpInline"
              disabled
              value={FormatNumber(product.data.quantity)}
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="input9" className="col-form-label">
              تاریخ شروع حراجی
            </label>

            <input
              type="text"
              className="form-control"
              id="input10"
              disabled
              value={product.data.date_on_sale_from}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="input9" className="col-form-label">
              تاریخ پایان حراجی
            </label>
            <input 
            type="text" 
            className="form-control"
            disabled
            value={product.data.date_on_sale_to}
             />
          </div>

          <div>
            <label htmlFor="input10" className="col-form-label">
              توضیحات
            </label>
            <textarea
              className="form-control"
              id="input10"
              rows="5"
              disabled
              value={product.data.description}
            />
          </div>
        </div>

        <div className="row mt-4">
            {product.data.images.length > 0 ?product.data.images.map((image)=>(
                <div className="col-md-3" key={image.id}>
                <Image
                  src={image.image}
                  priority
                  width={220}
                  height={150}
                  placeholder="blur"
                  blurDataURL={getBlureDataUrl()}
                  alt="image-secondery"
                  className="rounded"
                />
              </div>
            ))
            :
            null
            }
        </div>

        <Delete id={product.data.id} />
      </div>
    </>
  );
}
