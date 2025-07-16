import Loading from "@/components/Loading";
import Table from "@/components/transactions/Table";
import { Suspense } from "react";

export default async function page({searchParams}) {
    
  const params = new URLSearchParams(await searchParams)

  return (
<div className="container">
      <div className="d-flex justify-content-between mt-5 mb-4">
        <h4 className="fw-bold">تراکنش ها</h4>
      </div>

      <Suspense key={params.toString()} fallback={<Loading />}>
        <Table params={params.toString()}/>
      </Suspense>
    </div>    
  );
}
