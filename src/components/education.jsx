"use client";
import { useEffect, useRef, useState } from "react";
import { CiLight } from "react-icons/ci";
import { FaSave } from "react-icons/fa";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { HiPlusSm } from "react-icons/hi";
import Load from "./load";
import { error, success } from "@/utility/toast";
import { MdBrowserUpdated } from "react-icons/md";
import { alldata } from "./store/allstore";
import { verifyDate, verifyDegree, verifyName, verifySchool } from "./regex";
export default function Education({
  scrollLeft,
  pageno,
}) {
  const {select,updateArray,deleteArray,dataUpdateArray,mode}=alldata((state)=>{
    return{
      updateArray:state.updateArray,
      select:state.select,
      deleteArray:state.deleteArray,
      dataUpdateArray:state.dataUpdateArray,
      mode:state.mode
    }
  })
  const [obj, setObj] = useState({
    school: "",
    degree: "",
    city: "",
    state: "",
    studyfield: "",
    start: "",
    end: "",
  });
  const [load, setLoad] = useState(false);
  const [delIndex,setDelIndex]=useState(null);
  const [allDatas,setAllDatas]=useState([])

  const loadRef=useRef();
  const[update,setUpdate]=useState(false)
  useEffect(() => {
    if(select instanceof Array && select.length>0 && select[0]['education']){
    setAllDatas(select[0]['education'])
    }else{
      setAllDatas([]);
    }
    if(update){
      setUpdate(false);
     setObj({school: "",
     degree: "",
     city: "",
     state: "",
     studyfield: "",
     start: "",
     end: ""})
    }
  }, [select]);

  const [decition, setDecition] = useState(false);
  const scaleRef = useRef();
  function change(name, value) {
    return setObj((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  }
  function editting(i){
    if(!decition){
      setDecition(true)
    }
    setObj({...allDatas[i],ind:i})
    setUpdate(true);
  }
  function scaleUpDowns(i){
   
    if(!load){
      if (scaleRef.current.classList.contains('scale-0')) {
        setDelIndex(i)
        scaleRef.current.classList.replace("scale-0",'scale-1')
      } else {
        setDelIndex(null)
        scaleRef.current.classList.replace("scale-1", "scale-0");
      }
    }else{
      error("please click some times letter")
    }
  }
  async function submit() {
    setLoad(true);
    if(!verifySchool(obj['school'])){
      error("set a valid school name")
    }else if(!verifyDegree(obj['degree'])){
      error("set a valid degree")
    }else if(!verifyName(obj['city'])){
      error("set a valid city")
    }else if(!verifyName(obj['state'])){
      error("set a valid state")
    }else if(!verifyName(obj['studyfield'])){
      error("set a valid studyfield")
    }else if(!verifyDate(obj['start'])){
      error("set a valid start date")
    }else if(!verifyDate(obj['end'])){
      error("set a valid  end date")
    }else{
      const all = {
        ...obj,
        mainId: select[0]['id'],
      };
      const res = await fetch("api/all/education", {
        method: "POST",
        body: JSON.stringify(all),
        headers: { "content-type": "application/json" },
      });
      const data = await res.json();
      if (data["status"] === "success") {
        success("education create");
        updateArray(data['data'],select[1],"education")
        setObj({
          school: "",
          degree: "",
          city: "",
          state: "",
          studyfield: "",
          start: "",
          end: "",
        })
        setDecition(false)
      } else {
        error("education create fail");
      }
    }

    setLoad(false);

  }
  async function del(i){
   if(!load){
     scaleRef.current.classList.replace("scale-1", "scale-0");
     
    if(!load){
      setLoad(true)
      loadRef.current.classList.replace("scale-0","scale-1")
      allDatas[i].mainId=select[0]['id'];
      const res=await fetch('api/all/education',{method:"DELETE",body:JSON.stringify(allDatas[i]),headers:{"content-type":"application/json"},cache:"no-store"})
        const data=await res.json();
        
        if(data['status']==="success"){
          success("exprience create")
          deleteArray(select[1],"education",i);
    setObj({
      school: "",
      degree: "",
      city: "",
      state: "",
      studyfield: "",
      start: "",
      end: "",
    })
    if(update){
      setUpdate(false);
    }
        }else{
          error("exprience create fail")
        }
        setLoad(false);
        loadRef.current.classList.replace("scale-1","scale-0")
        
    }else{
      error("please click some times letter");
    }
   }else{
    error("please click some times letter")
   }
  }
  async function updates(track){
    setLoad(true);
    if(!verifySchool(obj['school'])){
      error("set a valid school name")
    }else if(!verifyDegree(obj['degree'])){
      error("set a valid degree")
    }else if(!verifyName(obj['city'])){
      error("set a valid city")
    }else if(!verifyName(obj['state'])){
      error("set a valid state")
    }else if(!verifyName(obj['studyfield'])){
      error("set a valid studyfield")
    }else if(!verifyDate(obj['start'])){
      error("set a valid start date")
    }else if(!verifyDate(obj['end'])){
      error("set a valid  end date")
    }else{
    const all = {
      ...obj,
      mainId: select[0]["id"],
    };
    const res = await fetch("api/all/education", {
      method: "PUT",
      body: JSON.stringify(all),
      headers: { "content-type": "application/json" },
    });
    const data = await res.json();
    if (data["status"] === "success") {
      success("education created");
      dataUpdateArray(data['data'],select[1],'education',track)
      setDecition(false);
      setUpdate(false);
      setObj({school: "",
      degree: "",
      city: "",
      state: "",
      studyfield: "",
      start: "",
      end: ""})
    } else {
      error("education create fail");
    }
  }
    setLoad(false);
  }
  return (
    <div className={`${mode==="dark"? " bg-gray-900 shadow-slate-600":" bg-white shadow-slate-300"} flex flex-col justify-center items-center relative text-sky-400 p-2 shadow-md rounded-sm `}>
            <div ref={loadRef} className=" scale-0 absolute top-1/2 left-1/2" ><Load /></div>
      <div
        ref={scaleRef}
        className={`${mode==="dark"? " bg-neutral-500 shadow-gray-600":"bg-sky-100 shadow-gray-300"}  absolute scale-0 flex flex-col justify-center items-center  p-2 shadow-lg h-[100px]  rounded-md w-[300px]`}
      >
        <p>Do You Want To Delete This Item</p>
        <div className="  mt-3 flex justify-evenly items-center gap-4">
          <div onClick={()=>{
            del(delIndex)
          }} className=" cursor-pointer rounded-md py-1 px-2 bg-lime-200">
            YES
          </div>
          <div
            onClick={scaleUpDowns}
            className=" cursor-pointer rounded-md py-1 px-2 bg-teal-200"
          >
            NO
          </div>
        </div>
      </div>
      <div className={`${mode==="dark"?" bg-slate-400 text-gray-500":"bg-cyan-400 text-white"} rounded-md mx-auto w-[90%]  p-3  flex justify-start gap-2 font-bold items-center`}>
        <div className=" text-2xl">
          <CiLight />
        </div>
        <p className="text-xs md:text-base">
        What&apos;s the best way for Employers to contact you?
          <br />
          Include every school, even if you&apos;re still there or didn&apos;t graduate.
        </p>
      </div>
      {allDatas instanceof Array &&
        allDatas.length > 0 &&
        allDatas.map((item, ind) => {
          return (
            <div
              key={item["id"]}
              className={`${mode==='dark'?" bg-gray-600":"bg-white shadow-gray-200 "} mt-3 w-3/4 gap-2 mx-auto  shadow-md  rounded-md p-2 flex justify-start items-center`}
            >
              <div className=" w-1/2">
                <div className= {`${mode==="dark"?" text-gray-400":"text-violet-500"} font-bold text-sm `}>
                  <p className=" uppercase">{item['school']}</p>
                  <p className=" font-light">
                   {item['start']}-
                    <span className={`${mode==="dark"?" text-slate-800":"text-green-400"}`}> {item['end']}</span>
                  </p>
                </div>
              </div>
              <div className=" flex gap-3">
                <div onClick={()=>{editting(ind)}} className={`${mode==="dark"?" bg-slate-900 text-gray-300":"bg-indigo-400 text-black"} py-1 cursor-pointer px-2   rounded-sm`}>
                  <MdEdit />
                </div>
                <div
                  onClick={()=>{
                    scaleUpDowns(ind)
                  }}
                  className={`${mode==="dark"?" bg-neutral-800 text-gray-400":"text-black bg-purple-300"} py-1  cursor-pointer px-2  rounded-sm`}
                >
                  <MdDelete />
                </div>
              </div>
            </div>
          );
        })}
      {decition ? (
        <div className=" flex flex-wrap justify-center items-center">
          <div className=" w-[300px] p-2">
            <p className=" py-2">School Name</p>
            <input
              value={obj["school"]}
              onChange={(e) => {
                change("school", e.target.value);
              }}
              type="text"
              className={`${mode==="dark"?" text-white bg-gray-700 border-zinc-600 focus:border-zinc-400":"text-black border-indigo-400 focus:border-indigo-600 "}  border  p-[8px] outline-none rounded-md font-bold `}
            />
          </div>

          <div className=" w-[300px] p-2">
            <p className=" py-2">City</p>
            <input
              value={obj["city"]}
              onChange={(e) => {
                change("city", e.target.value);
              }}
              type="text"
              className={`${mode==="dark"?" text-white bg-gray-700 border-zinc-600 focus:border-zinc-400":"text-black border-indigo-400 focus:border-indigo-600 "}  border  p-[8px] outline-none  rounded-md font-bold `}
            />
          </div>
          <div className=" w-[300px] p-2">
            <p className=" py-2">State</p>
            <input
              value={obj["state"]}
              onChange={(e) => {
                change("state", e.target.value);
              }}
              type="text"
              className={`${mode==="dark"?" text-white bg-gray-700 border-zinc-600 focus:border-zinc-400":"text-black border-indigo-400 focus:border-indigo-600 "}  border  p-[8px] outline-none  rounded-md font-bold `}
            />
          </div>
          <div className=" w-[300px] p-2">
            <p className=" py-2">Select a degree</p>
            <input
              value={obj["degree"]}
              onChange={(e) => {
                change("degree", e.target.value);
              }}
              type="text"
              className={`${mode==="dark"?" text-white bg-gray-700 border-zinc-600 focus:border-zinc-400":"text-black border-indigo-400 focus:border-indigo-600 "}  border  p-[8px] outline-none  rounded-md font-bold `}
            />
          </div>
          <div className=" w-[300px] p-2">
            <p className=" py-2">Field of Study</p>
            <input
              value={obj["studyfield"]}
              onChange={(e) => {
                change("studyfield", e.target.value);
              }}
              type="text"
              className={`${mode==="dark"?" text-white bg-gray-700 border-zinc-600 focus:border-zinc-400":"text-black border-indigo-400 focus:border-indigo-600 "}  border  p-[8px] outline-none  rounded-md font-bold `}
            />
          </div>
          <div className=" w-[300px] p-2">
            <p className=" py-2">Graduation Start:</p>
            <input value={obj['start']}
              onChange={(e) => {
                change("start", e.target.value);
              }}
              type="date"
              className={`${mode==="dark"?" text-white bg-gray-700 border-zinc-600 focus:border-zinc-400":"text-black border-indigo-400 focus:border-indigo-600 "}  border  p-[8px] outline-none  rounded-md font-bold  w-full`}
            />
          </div>
          <div className=" w-[300px] p-2">
            <p className=" py-2">Graduation End Date:</p>
            <input  value={obj['end']}
              onChange={(e) => {
                
                change("end", e.target.value);
              }}
              type="date"
              className={`${mode==="dark"?" text-white bg-gray-700 border-zinc-600 focus:border-zinc-400":"text-black border-indigo-400 focus:border-indigo-600 "}  border  p-[8px] outline-none  rounded-md font-bold  w-full`}
            />
          </div>
        </div>
      ) : null}
      <div className="  w-full flex-wrap flex justify-evenly   flex-row-reverse p-3">
        <div className=" text-xs md:text-base  p-2">
          <button
            onClick={() => {
              scrollLeft(4);
              pageno(4);
            }}
            className={`${mode==="dark"?" bg-slate-400 text-gray-500":"bg-rose-300"} flex  py-1 px-2 items-center justify-center gap-1 rounded-sm`}
          >
            NEXT
            <TbPlayerTrackNextFilled />
          </button>
        </div>

        {decition ? (
          <div onClick={() => {}} className=" text-xs md:text-base  p-2 flex justify-start items-start">
            {load ? (
              <div><Load /></div>
            ) : (update?<div className=" flex gap-4"> <button onClick={()=>{updates(obj['ind'])}}  className={`${mode==="dark"?" bg-slate-400 text-gray-500":"bg-rose-300"} flex  py-1 px-2 items-center justify-center gap-1 rounded-sm`}>
            <MdBrowserUpdated />
             Update
           </button> <button onClick={() => {
             setUpdate(false)
               setDecition(true);
               setObj({ school: "",
               degree: "",
               city: "",
               state: "",
               studyfield: "",
               start: "",
               end: "",})
             }}  className={`${mode==="dark"?" bg-slate-400 text-gray-500":"bg-rose-300"} flex  py-1 px-2 items-center justify-center gap-1 rounded-sm`}>
           <HiPlusSm />
             Add Section
           </button></div>: allDatas.length<2 && <button
                onClick={submit}
                className={`${mode==="dark"?" bg-slate-400 text-gray-500":"bg-rose-300"} flex  py-1 px-2 items-center justify-center gap-1 rounded-sm`}
              >
                <FaSave />
                SAVE
              </button>
             
            )}
          </div>
        ) : (
          <div className=" text-xs md:text-base p-2">
            <button
              onClick={() => {
                setDecition(true);
              }}
              className={`${mode==="dark"?" bg-slate-400 text-gray-500":"bg-cyan-400 text-white"} flex  py-1 px-2 items-center justify-center gap-1 rounded-sm`}
            >
              <HiPlusSm />
              Add Secton
            </button>
          </div>
        )}
        <div className=" text-xs md:text-base  p-2">
          <button
            onClick={() => {
              scrollLeft(2);
              pageno(2);
            }}
            className={`${mode==="dark"?" bg-slate-400 text-gray-500":"bg-rose-300"}  flex  py-1 px-2 items-center justify-center gap-1 rounded-sm`}
          >
            <TbPlayerTrackPrevFilled />
            Previous
          </button>
        </div>
      </div>
    </div>
  );
}
