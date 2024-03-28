
import { PrismaClient } from "@prisma/client";
import {  headers } from "next/headers";
import { NextResponse } from "next/server";

export  async function POST(req, res) {
  try {
    const prisma = new PrismaClient();
    const body = await req.json();
    const name = body["name"];
    const gender = body["gender"];
    const birth = body["birth"];
    const married = body["married"];
    const profession = body["profession"];
    const address = body["address"];
    const city = body["city"];
    const state = body["state"];
    const nationality = body["nationality"];
    const phone = body["phone"];
    const email = body["email"];
    const mainId=body['mainId'];
    const header = headers();
    const id = parseInt(header.get("id"));
  

    const create = await prisma.profile.create({
      data: {
        name: name,
        gender: gender,
        birth: birth,
        married: married,
        profession: profession,
        address: address,
        city: city,
        state: state,
        nationality: nationality,
        phone: phone,
        email: email,
        mainId: mainId,
      },
    }); 
    return NextResponse.json({ status: "success", data: create });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}


export  async function PUT(req, res) {
  try {
    const prisma = new PrismaClient();
    const body = await req.json();
    const name = body["name"];
    const gender = body["gender"];
    const birth = body["birth"];
    const married = body["married"];
    const profession = body["profession"];
    const address = body["address"];
    const city = body["city"];
    const state = body["state"];
    const nationality = body["nationality"];
    const phone = body["phone"];
    const email = body["email"];
    const mainId=body['mainId'];
    const id = body['id']
  

    const create = await prisma.profile.update({
      where:{
        mainId:mainId,
        id:id
      },
      data: {
        name: name,
        gender: gender,
        birth: birth,
        married: married,
        profession: profession,
        address: address,
        city: city,
        state: state,
        nationality: nationality,
        phone: phone,
        email:email
      },
    }); 
    return NextResponse.json({ status: "success", data: create });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}