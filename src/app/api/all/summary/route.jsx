import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const prisma = new PrismaClient();
    const body = await req.json();
    const summary = body["text"];
    const mainId = body["mainId"];
    const header = headers();
    const id = parseInt(header.get("id"));
    const create = await prisma.summary.create({
      data: {
       text:summary,
        mainId: mainId,
      },
    });
    return NextResponse.json({ status: "success", data: create });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}

export async function PUT(req, res) {
  try {
    const prisma = new PrismaClient();
    const body = await req.json();
    const summary = body["text"];
    const id = body["id"];
    const mainId = body["mainId"];
    const data = await prisma.summary.update({
      where: {
        id: id,
        mainId:mainId
      },
      data: {
        text:summary
      },
    });
    return NextResponse.json({ status: "success", data: data });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ status: "fail", data: e });
  }
}