import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const prisma = new PrismaClient();
    const header = headers();
    const id = parseInt(header.get("id"));
    const find = await prisma.main.findMany({
      where: {
        useId: id,
      },
      include:{
        profile:true,
        experience:true,
        education:true,
        skills:true,
        summary:true,
        hobbies:true,
        reference:true
      }
    });
    return NextResponse.json({ status: "success", data: find });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}
