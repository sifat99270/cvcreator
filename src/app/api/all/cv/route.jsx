import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const prisma = new PrismaClient();
    const body = await req.json();
    const name = body["name"];
    const header = headers();
    const id = parseInt(header.get("id"));
    const create = await prisma.main.create({
      data: {
        name: name,
        useId: id,
      },
      include: {
        profile: true,
        experience: true,
        education: true,
        skills: true,
        summary: true,
        hobbies: true,
        reference: true,
      },
    });
    return NextResponse.json({ status: "success", data: create });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ status: "fail", data: e });
  }
}
