"use client";
import { useEffect, useRef, useState } from "react";
import { CiLight } from "react-icons/ci";
import { FaSave } from "react-icons/fa";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { FaCirclePlus } from "react-icons/fa6";
import { MdBrowserUpdated } from "react-icons/md";
import Load from "./load";
import { error, success } from "@/utility/toast";
import { alldata } from "./store/allstore";
import { verifyName } from "./regex";
export default function Hobbies({ data, pageno, scrollLeft }) {
  const [obj, setObj] = useState([]);
  const loadRef=useRef();
  function change(name, value, i) {
    setObj((pre) => {
      const list = [...pre];
      list[i][name] = value;
      setObj(list);
    });
  }
  const [load,setLoad]=useState(false);
  const {select,updateArray,deleteArray,dataUpdateArray,cvdata}=alldata((state)=>{
    return{
      updateArray:state.updateArray,
      select:state.select,
      deleteArray:state.deleteArray,
      dataUpdateArray:state.dataUpdateArray,
      cvdata:state.cvdata
    }
  })
  useEffect(() => {
    if (select instanceof Array && select.length > 0 && select[0]['hobbies']) {
      setObj(select[0]['hobbies']);
    } else {
      setObj([{ name: "",decition:'add' }]);
    }
  }, [select]);

  function add() {
    if(obj instanceof Array && obj.length>0){
      setObj((pre) => {
          return [...pre, { name: "",decition:"add" }];
        })
    }else{
      setObj([{ name: "",decition:"add" }])
    }
  }
  async function submit(i){
    if(!load){
     setLoad(true)
     loadRef.current.classList.replace("scale-0","scale-1")
     obj[i].mainId=select[0]['id']
  if(!verifyName(obj[i]['name'])){
    error("type a valid hobbie name")
  }else{
    if(obj[i]['decition']==='add'){
      const res=await fetch('api/all/hobbie',{method:"POST",body:JSON.stringify(obj[i]),headers:{"content-type":"application/json"}})
    const data=await res.json();
    if(data['status']==="success"){
      success("hobbie create")
     
      
    
      updateArray(data['data'],select[1],'hobbies');
      setObj( cvdata[select[1]]['hobbies']);
    }else{
      error("hobbie create fail")
    }
    }else{
      const res=await fetch('api/all/hobbie',{method:"PUT",body:JSON.stringify(obj[i]),headers:{"content-type":"application/json"},cache:"no-store"})
      const data=await res.json();
      if(data['status']==="success"){
        success("hobbie updated")
       
        dataUpdateArray(data['data'],select[1],"hobbies",i);
      }else{
        error("hobbie update fail")
      }
    }
  }
     setLoad(false)
     loadRef.current.classList.replace("scale-1","scale-0")
    }else{
     error("please click some times letter");
    }
   }
// function remove(i){

// }
   async function del(i){
    if(!load){
      setLoad(true)
      loadRef.current.classList.replace("scale-0","scale-1")
      obj[i].mainId=select[0]['id']
      const res=await fetch('api/all/hobbie',{method:"DELETE",body:JSON.stringify(obj[i]),headers:{"content-type":"application/json"},cache:"no-store"})
        const data=await res.json();
        
        if(data['status']==="success"){
          success("hobbie deleted")
          deleteArray(select[1],"hobbies",i);
        }else{
          error("hobbie delete fail")
        }
        setLoad(false);
        loadRef.current.classList.replace("scale-1","scale-0")
    }else{
      error("please click some times letter");
    }
    }

  return (
    <div className=" text-sky-400 p-2 shadow-md rounded-sm shadow-slate-300 relative">

<div ref={loadRef} className=" scale-0 absolute top-1/2 left-1/2" ><Load/></div>
      <div className=" rounded-md mx-auto w-[90%] bg-cyan-400 p-3 text-white flex justify-start gap-2 font-bold items-center">
        <div className=" text-2xl">
          {" "}
          <CiLight />
        </div>
        <p className="text-xs md:text-base">
         
          Hobbies / Interests
          <br />
          Showcase your Interests to an employer
        </p>
      </div>
      {obj instanceof Array &&
        obj.length > 0 &&
        obj.map((item, index) => {
          return (
            <div
              key={item['id']?item['id']:index}
              className=" flex flex-wrap justify-center items-center"
            >
              <div className=" w-[300px] p-2 ">
                <p className=" py-2">Hobbies</p>
                <div className=" flex justify-center items-center">
                  <input
                    value={obj[index]["name"]}
                    onChange={(e) => {
                      change("name", e.target.value, index);
                    }}
                    type="text"
                    className=" border border-indigo-400 p-[8px] outline-none focus:border-indigo-600 rounded-md font-bold text-black"
                  />
                     {item['id'] &&  <div
                        onClick={() => {
                          del(index);
                        }}
                        className=" cursor-pointer ml-1 text-2xl"
                      >
                        <MdDelete />
                      </div>}
                  <div
                    onClick={() => {
             submit(index)
                    }}
                    className=" cursor-pointer ml-1 text-2xl"
                  >
                    <MdBrowserUpdated />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
     { obj instanceof Array && obj.length<3 &&  <div
        onClick={add}
        className=" mx-auto mt-3 cursor-pointer p-2 flex rounded-md shadow-md shadow-gray-200 bg-slate-300 w-[300px]  justify-center items-center gap-2"
      >
        <FaCirclePlus />
        <p>Add More Hobbies</p>
      </div>}
      <div className=" flex justify-evenly  flex-row-reverse p-3">
        <div className=" text-xs md:text-base p-2">
          <button
            onClick={() => {
              pageno(7);
              scrollLeft(7);
            }}
            className=" bg-rose-300 flex  py-1 px-2 items-center justify-center gap-1 rounded-sm"
          >
            NEXT
            <TbPlayerTrackNextFilled />
          </button>
        </div>
        
        <div className="text-xs md:text-base p-2">
          <button
            onClick={() => {
              pageno(5);
              scrollLeft(5);
            }}
            className=" bg-rose-300 flex  py-1 px-2 items-center justify-center gap-1 rounded-sm"
          >
            <TbPlayerTrackPrevFilled />
            Previous
          </button>
        </div>
      </div>
    </div>
  );
}
