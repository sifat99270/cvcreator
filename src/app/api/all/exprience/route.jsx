
import { PrismaClient } from "@prisma/client";
import {  headers } from "next/headers";
import { NextResponse } from "next/server";

export  async function POST(req, res) {
  try {
    const prisma = new PrismaClient();
    const body = await req.json();
    const jobTitle=body['title'];
    const employer=body['employer'];
    const city=body['city'];
    const state=body['state'];
    const startDate=body['start'];
    const endDate=body['end'];
    const mainId=body['mainId'];
    const header = headers();
    const id = parseInt(header.get("id"));
  

    const create = await prisma.experience.create({
      data: {
       title:jobTitle,
       employer:employer,
       city:city,
       state:state,
       start:startDate,
       end:endDate,
       mainId:mainId
      },
    }); 
    return NextResponse.json({ status: "success", data: create });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ status: "fail", data: e });
  }
}

export async function PUT(req, res) {
  try {
    const prisma = new PrismaClient();
    const body=await req.json();
   
    const jobTitle=body['title'];
    const employer=body['employer'];
    const city=body['city'];
    const state=body['state'];
    const startDate=body['start'];
    const endDate=body['end'];
    const mainId=body['mainId'];
    const id=body['id'];
    const data = await prisma.experience.update({
      where: {
        id: id,
        mainId:mainId
      },
      data: {
        title:jobTitle,
       employer:employer,
       city:city,
       state:state,
       start:startDate,
       end:endDate,
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
    const data = await prisma.experience.delete({
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