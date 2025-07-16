import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.min.css"
import './globals.css'
import Bootstrap from '@/components/libreries/Bootstrap';
import NextProgressBar from '@/components/libreries/NextProgressBar';
import { ToastContainer } from 'react-toastify';
import { Suspense } from "react";

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Suspense>
          <NextProgressBar>
          
            {children}
            
            <Bootstrap />
            <ToastContainer />
          </NextProgressBar>
        </Suspense>
      </body>
    </html>
  );
}
