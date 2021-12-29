// import { decode, getToken } from "next-auth/jwt";
import { getToken } from "../lib/token";
import { NextResponse } from "next/server";

// const decryptedtoken = await decode({ token, secret: 'vasea' })
// console.log(decryptedtoken?.name);

async function middleware(req,res){
  console.log(process.env.NEXTAUTH_URL);
  // const token = await getToken({ req, secret: 'vasea' });
  const token = await getToken({req, secret: 'vasea'});
  const { pathname } = req.nextUrl;
  console.log(token)
  if( pathname === '/login' && token) return NextResponse.redirect("/");

  if( token || pathname.includes('/api/auth')) return NextResponse.next()
  
  if( !token && pathname !== '/login') return NextResponse.redirect("/login");
  
  return NextResponse.next()
}

export default middleware;

