import { getFetch } from "@/utils/fetching";
import Delete from "@/components/coupons/Delete";

export default async function page({ params }) {
  const { id } = await params;
  const coupon = await getFetch(`/coupons/${id}`);
  console.log(coupon);

  return (
    <>
      <div className="my-5">

        <div className="row mt-4">
          <div className="col-md-3">
            <label htmlFor="input3" className="col-form-label">
              کد
            </label>
            <input
              type="text"
              id="input3"
              className="form-control"
              aria-describedby="passwordHelpInline"
              disabled
              value={coupon.data.code}
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="input4" className="col-form-label">
               درصد
            </label>
            <div className="style">
              <input
                disabled
                value={coupon.data.percentage}
                className="form-control"
                id="input4"
              />
            </div>
          </div>

          <div className="col-md-3">
            <label htmlFor="input5" className="col-form-label">
              تاریخ انقضاء
            </label>
            <div className="">
              <input name="status" disabled value={coupon.data.expired_at} className="form-control" id="input5"/>
            </div>
          </div>

          <div className="col-md-3">
            <label htmlFor="input6" className="col-form-label">
              تاریخ ایجاد
            </label>
            <input
              type="text"
              id="input6"
              className="form-control"
              aria-describedby="passwordHelpInline"
              disabled
              value={coupon.data.created_at}
            />
          </div>
       </div>

        <Delete id={coupon.data.id} />
      </div>
    </>
  );
}
