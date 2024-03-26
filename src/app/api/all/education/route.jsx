
import { PrismaClient } from "@prisma/client";
import {  headers } from "next/headers";
import { NextResponse } from "next/server";

export  async function POST(req, res) {
  try {
    const prisma = new PrismaClient();
    const body = await req.json();

    const school=body['school'];
    const degree=body['degree'];
    const city=body['city'];
    const state=body['state'];
    const start=body['start'];
    const end=body['end'];
    const studyField=body['studyfield'];
    const mainId=body['mainId'];
    const header = headers();
    const id = parseInt(header.get("id"));
  

    const create = await prisma.education.create({
      data: {
     school:school,
       city:city,
       state:state,
       start:start,
       degree:degree,
       end:end,
       studyfield:studyField,
       mainId:mainId
      }
    }); 
    return NextResponse.json({ status: "success", data: create });
  } catch (e) {
    console.log(e)
    return NextResponse.json({ status: "fail", data: e });
  }
}

export async function DELETE(req, res) {
  try {
    const prisma = new PrismaClient();
    const body = await req.json();
    const id = body["id"];
    const mainId = body["mainId"];
    const data = await prisma.education.delete({
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
export async function PUT(req, res) {
  try {
    const prisma = new PrismaClient();
    const body=await req.json();
    const school=body['school'];
    const degree=body['degree'];
    const city=body['city'];
    const state=body['state'];
    const start=body['start'];
    const end=body['end'];
    const studyField=body['studyfield'];
    const mainId=body['mainId'];
    const id=body['id'];
    const data = await prisma.education.update({
      where: {
        id: id,
        mainId:mainId
      },
      data: {
        school:school,
        city:city,
        state:state,
        start:start,
        degree:degree,
        end:end,
        studyfield:studyField,
      },
    });
    return NextResponse.json({ status: "success", data: data });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}