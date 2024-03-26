import { CreateToken } from "@/utility/token";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export  async function POST(req, res) {
  try {
    const prisma = new PrismaClient();
    const body = await req.json();
    const email=body['email'];
    const password=body['password'];
    const find=await prisma.user.findUnique({
        where:{
            email:email,
            password:password
        }
    })

    const token=await CreateToken(email,find['id']);
    const threeDay = 72 * 60 * 60 * 1000
    const cookiee=cookies().set("token",token,{httpOnly:true,expires:Date.now()+threeDay});
    return NextResponse.json({status:"success",data:token})
  } catch (e) {

    return NextResponse.json({ status: "fail", data: e });
  }
}
