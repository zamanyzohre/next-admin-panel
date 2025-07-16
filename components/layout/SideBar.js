'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {

    const pathname = usePathname()

  return (
            <div id="navbarSupportedContent" className="col-md-3 col-lg-2 d-md-block sidebar bg-light collapse">
                <div className="position-sticky">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link href="/" className={pathname == "/"? "nav-link active":"nav-link"}>
                            <i className="bi bi-grid ms-2"></i>
                                داشبورد
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/users" className={pathname.includes("/users")? "nav-link active":"nav-link"}>
                            <i className="bi bi-people ms-2"></i>
                                کاربران
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/products" className={pathname.includes("/products")? "nav-link active":"nav-link"}>
                            <i className="bi bi-box-seam ms-2"></i>
                                محصولات
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/categories" className={pathname.includes("/categories")? "nav-link active":"nav-link"}>
                            <i className="bi bi-grid-3x3-gap ms-2"></i>
                                دسته بندی
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/orders" className={pathname.includes("/orders")? "nav-link active":"nav-link"}>
                            <i className="bi bi-basket ms-2"></i>
                                سفارشات
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/transactions" className={pathname.includes("/transactions")? "nav-link active":"nav-link"}>
                            <i className="bi bi-currency-dollar ms-2"></i>
                                تراکنش ها
                            </Link>
                        </li>
                        <li>
                                <Link href="/coupons" className={pathname.includes("/coupons")? "nav-link active":"nav-link"}>
                                    <i className="bi bi-percent ms-2"></i>
                                    تخفیف ها
                                </Link>
                            </li>
                    </ul>
                </div>
            </div>
  )
}
