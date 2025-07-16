import AmChart from "@/components/AmChart";
import { getFetch } from "@/utils/fetching";

export default async function Home() {
const chartData = await getFetch('/transactions/chart')

  return (
    <>
    <div className="container-fluid">
      <h4 className="fw-bold mt-5 mb-3">داشبورد</h4>
      <hr />
      <AmChart chartData={chartData.data}/>
    </div>
    </>
  );
}
