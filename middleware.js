import { NextResponse } from "next/server";

export default function middleware(req) {
    const token = req.cookies.get('token')

    if(!token){
        return NextResponse.redirect(new URL('/login',req.url))
    }

}
 export const config = {

     matcher:[
        '/',
        '/users/:path*',
        '/products/:path*',
        '/categories/:path*',
        '/orders/:path*',
        '/transactions/:path*',
        '/coupons/:path*'
    ]
 }