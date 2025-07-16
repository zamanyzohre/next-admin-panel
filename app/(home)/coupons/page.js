import Loading from "@/components/Loading";
import Table from "@/components/coupons/Table";
import Link from "next/link";
import { Suspense } from "react";

export default async function page({searchParams}) {
    
  const params = new URLSearchParams(await searchParams)

  return (
<div className="container">
      <div className="d-flex justify-content-between mt-5 mb-4">
        <h4 className="fw-bold">تخفیف ها</h4>
        <Link href='/coupons/create' className="btn btn-outline-dark">ایجاد تخفیف</Link>

      </div>

      <Suspense key={params.toString()} fallback={<Loading />}>
        <Table params={params.toString()}/>
      </Suspense>
    </div>    
  );
}
