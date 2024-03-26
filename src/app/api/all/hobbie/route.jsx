import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const prisma = new PrismaClient();
    const body = await req.json();
    const name = body["name"];
    const mainId = body["mainId"];
    const header = headers();
    const id = parseInt(header.get("id"));
    const create = await prisma.hobbies.create({
      data: {
        name: name,
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
    const name = body["name"];
    const id = body["id"];
    const mainId = body["mainId"];
    const data = await prisma.hobbies.update({
      where: {
        id: id,
        mainId:mainId
      },
      data: {
        name: name,
      },
    });
    return NextResponse.json({ status: "success", data: data });
  } catch (e) {
    
    return NextResponse.json({ status: "fail", data: e });
  }
}
export async function DELETE(req, res) {
    try {
      const prisma = new PrismaClient();
      const body = await req.json();
      const id = body["id"];
      const mainId = body["mainId"];
      const data = await prisma.hobbies.delete({
        where: {
          id: id,
          mainId:mainId

        },
       
      });
      return NextResponse.json({ status: "success", data: data });
    } catch (e) {
      return NextResponse.json({ status: "fail", data: e });
    }
  }
