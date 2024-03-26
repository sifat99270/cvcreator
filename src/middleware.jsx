import { NextResponse } from "next/server";
import { VerifyToken } from "./utility/token";

export default async function middleware(req, res) {
  const path = req.nextUrl.pathname;
  try {
    const token = req.cookies.get("token")['value']
    if(path==='/auth'){
      return NextResponse.redirect(new URL("/", req.url));
    }
      const decode = await VerifyToken(token);
      const header = new Headers(req.headers);
      header.set("id", decode["id"]);
      return NextResponse.next({request:{headers:header}});
      
  } catch (e) {
    if (path.startsWith("/api/all/alldata")) {
      return NextResponse.next();
    }
    if(path==='/'){
           return NextResponse.redirect(new URL("/auth", req.url));
    }
    return NextResponse.next();
  }
}
