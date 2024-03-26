
import { PrismaClient } from "@prisma/client";
import {  headers } from "next/headers";
import { NextResponse } from "next/server";

export  async function POST(req, res) {
  try {
    const prisma = new PrismaClient();
    const body = await req.json();

    const name=body['name'];
    const position=body['position'];
    const mobile=body['mobile'];
    const email=body['email'];
    const companyName=body['companyName'];
    const mainId=body['mainId'];
    const header = headers();
    const id = parseInt(header.get("id"));
  

    const create = await prisma.reference.create({
      data: {
     name:name,
     position:position,
     mobile:mobile,
     email:email,
     companyName:companyName,
       mainId:mainId
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
    const name=body['name'];
    const position=body['position'];
    const mobile=body['mobile'];
    const email=body['email'];
    const companyName=body['companyName'];
    const mainId=body['mainId'];
    const id=body['id'];
    const data = await prisma.reference.update({
      where: {
        id: id,
        mainId:mainId
      },
      data: {
        name:name,
     position:position,
     mobile:mobile,
     email:email,
     companyName:companyName,
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
    const data = await prisma.reference.delete({
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
