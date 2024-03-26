import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const prisma = new PrismaClient();
    const body = await req.json();
    const skill = body["skill"];
    const level = body["level"];

    const mainId = body["mainId"];
    const header = headers();
    const id = parseInt(header.get("id"));
    const create = await prisma.skills.create({
      data: {
        skill: skill,
        level: level,
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
    const skill = body["skill"];
    const level = body["level"];
    const id = body["id"];
    const mainId = body["mainId"];
    const data = await prisma.skills.update({
      where: {
        id: id,
        mainId:mainId
      },
      data: {
        skill: skill,
        level: level,
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
      const data = await prisma.skills.delete({
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
