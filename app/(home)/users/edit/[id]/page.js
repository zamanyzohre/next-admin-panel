import Edit from "@/components/users/Edit";
import { getFetch } from "@/utils/fetching";

export default async function ({params}) {
   const { id } = await params
   const data = await getFetch(`/users/${id}`)

  return (
    <>
      <div className="container my-5">
        <h5 className="fw-bold mb-3"> ویرایش کاربر : {data.data.name}</h5>
        <hr />
        <Edit user={data.data}/>
      </div>
    </>
  );
}
