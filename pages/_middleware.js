import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

async function middleware(req,res){

  const token = await getToken({ req,secret: process.env.JWT_SECRET });

  const pathname = req.nextUrl;
  console.log(token,pathname)
  if( pathname === '/login' && token) return NextResponse.redirect("/");

  if( token || pathname.includes('/api/auth')) return NextResponse.next()
  
  if( !token && pathname !== '/login') return NextResponse.redirect("/login");
  
  return NextResponse.next()
}

export default middleware;