import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.min.css"
import './globals.css'
import Bootstrap from '@/components/libreries/Bootstrap';
import NextProgressBar from '@/components/libreries/NextProgressBar';
import { ToastContainer } from 'react-toastify';
import Header from '@/components/layout/Header';
import SideBar from "@/components/layout/SideBar";
import { Suspense } from "react";
import AuthProvider from "@/context/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Suspense>
          <AuthProvider>
          <NextProgressBar>
            <Header />
            <div className="row w-100">
              <SideBar />
              <div className="col-md-9 me-auto col-lg-10 mt-5">
            {children}
              </div>
            </div>
          <Bootstrap />
          <ToastContainer />
          </NextProgressBar>
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
