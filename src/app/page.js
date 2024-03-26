
import Load from "@/components/load";
import Main from "@/components/main";
import { headers } from "next/headers";
import { Suspense } from "react";
async function getAllData(){
  const header= headers();
  const id=header.get("id");
const respon=await fetch( `${process.env.HOST}/api/all/alldata`,{method:"GET",mode:"cors",headers:{"content-type":"application/json",id:id},cache:"no-store"})
  const data=await respon.json();
  if(data['status']==="success"){
    return data['data']
  }else{
    return[]
  }
}

export default async function Home() {
  
  const all=await getAllData();
   return (
    <main className=" w-full" >
     <Suspense fallback={<Load />}>
     <Main data={all} />
     </Suspense>
    </main>
  );
}
