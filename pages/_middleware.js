import { decode, getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react"
import { NextResponse } from "next/server";

async function middleware(req,res){
  // const token = await getSession( { req });
  //next-auth.session-token
  const { cookies } = req;
  const token = cookies["next-auth.session-token"];
  // console.log(cookies["next-auth.session-token"])
  // const token = await getToken({ req, secret: 'vasea' });
  const decryptedtoken = await decode({ token, secret: 'vasea' })
  console.log(decryptedtoken?.name);
  const { pathname } = req.nextUrl;
  if( pathname === '/login' && token) return NextResponse.redirect("/");

  if( token || pathname.includes('/api/auth')) return NextResponse.next()
  
  if( !token && pathname !== '/login') return NextResponse.redirect("/login");
  
  return NextResponse.next()
}

export default middleware;