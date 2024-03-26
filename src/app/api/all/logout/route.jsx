import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function POST(){
    try{
    const cookie= cookies().delete("token");
     return NextResponse.json({status:"success",data:cookie})
    }catch(e){
        return NextResponse.json({status:"fali",data:e})
    }
}