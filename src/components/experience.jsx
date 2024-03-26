"use client";
import { useEffect, useRef, useState } from "react";
import { CiLight } from "react-icons/ci";
import { FaSave } from "react-icons/fa";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import Load from "./load";
import { success, error } from "@/utility/toast";
import { alldata } from "./store/allstore";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { verifyDate, verifyName } from "./regex";
import { HiPlusSm } from "react-icons/hi";
import { MdBrowserUpdated } from "react-icons/md";
export default function Experience({
  scrollLeft,
  pageno,
  data,
}) {
  const [obj, setObj] = useState({
    title: "",
    employer: "",
    city: "",
    state: "",
    start: "",
    end: "",
  });
  const scaleRef=useRef()
  const [allDatas,setAllDatas]=useState([])
  const[update,setUpdate]=useState(false)
  const [load, setLoad] = useState(false);
  const [decition, setDecition] = useState(false);
  const [delIndex,setDelIndex]=useState(null);
  const loadRef=useRef();
  const {select,updateArray,deleteArray,dataUpdateArray}=alldata((state)=>{
    return{
      updateArray:state.updateArray,
      select:state.select,
      deleteArray:state.deleteArray,
      dataUpdateArray:state.dataUpdateArray
    }
  })
  useEffect(() => {
    if(select instanceof Array && select.length>0 && select[0]['experience']){
      setAllDatas(select[0]['experience'])
    }else{
      setAllDatas([]);
    }
    if(update){
      setObj({
        title: "",
        employer: "",
        city: "",
        state: "",
        start: "",
        end: "",
      })
    }
  }, [select]);
  async function submit() {
    if(!verifyName(obj['title'])){
      error("set a valid title")
    }else if(!verifyName(obj['employer'])){
      error("set a valid employer")
    }else if(!verifyName(obj['city'])){
      error("set a valid city")
    }else if(!verifyName(obj['state'])){
      error("set a valid state")
    }else if(!verifyDate(obj['start'])){
      error("set a valid start date")
    }else if(!verifyDate(obj['end'])){
      error("set a valid  end date")
    }else{
    setLoad(true);
    const all = {
      ...obj,
      mainId: select[0]['id'],
    };
    const res = await fetch("api/all/exprience", {
      method: "POST",
      body: JSON.stringify(all),
      headers: { "content-type": "application/json" },
    });
    const data = await res.json();
    if (data["status"] === "success") {
      success("exprience create");
      updateArray(data['data'],select[1],"experience")
      setObj({
        title: "",
        employer: "",
        city: "",
        state: "",
        start: "",
        end: "",
      })
      
    } else {
      error("exprience create fail");
    }
  }
    setLoad(false);
  }
  async function updates(track){
    setLoad(true);
    if(!verifyName(obj['title'])){
      error("set a valid title")
    }else if(!verifyName(obj['employer'])){
      error("set a valid employer")
    }else if(!verifyName(obj['city'])){
      error("set a valid city")
    }else if(!verifyName(obj['state'])){
      error("set a valid state")
    }else if(!verifyDate(obj['start'])){
      error("set a valid start date")
    }else if(!verifyDate(obj['end'])){
      error("set a valid  end date")
    }else{
    const all = {
      ...obj,
      mainId: select[0]["id"],
    };
    const res = await fetch("api/all/exprience", {
      method: "PUT",
      body: JSON.stringify(all),
      headers: { "content-type": "application/json" },
    });
    const data = await res.json();
    if (data["status"] === "success") {
      success("education created");
      dataUpdateArray(data['data'],select[1],'experience',track)
      setDecition(false);
      setUpdate(false);
      setObj({
        title: "",
        employer: "",
        city: "",
        state: "",
        start: "",
        end: "",
      })
    } else {
      error("education create fail");
    }
  }
    setLoad(false);
  }
  function change(name, value) {
    return setObj(pre => {
      return {
        ...pre,
        [name]: value,
      };
    });
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
  function editting(i){
    if(!decition){
      setDecition(true)
    }
    setObj({...allDatas[i],ind:i})
    setUpdate(true);
  }
  async function del(i){
    if(!load){
      scaleRef.current.classList.replace("scale-1", "scale-0");
      
     if(!load){
       setLoad(true)
       loadRef.current.classList.replace("scale-0","scale-1")
       allDatas[i].mainId=select[0]['id'];
       const res=await fetch('api/all/exprience',{method:"DELETE",body:JSON.stringify(allDatas[i]),headers:{"content-type":"application/json"},cache:"no-store"})
         const data=await res.json();
         
         if(data['status']==="success"){
           success("exprience create")
           deleteArray(select[1],"experience",i);
           setObj({
            title: "",
            employer: "",
            city: "",
            state: "",
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
  return (
    <div className=' text-sky-400 p-2 shadow-md rounded-sm shadow-slate-300 relative'>
       <div ref={loadRef} className=" scale-0 absolute top-1/2 left-1/2" ><Load /></div>
     <div
        ref={scaleRef}
        className="  absolute scale-0 flex flex-col justify-center items-center bg-sky-100 p-2 shadow-lg h-[100px] shadow-gray-300 rounded-md w-[300px]"
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
      {allDatas instanceof Array && allDatas.length>0 && allDatas.map((item,ind)=>{
        return(<div
           key={item["id"]}
          className=" mt-3 w-3/4 gap-2 mx-auto bg-white shadow-md shadow-gray-200 rounded-md p-2 flex justify-start items-center"
        >
          <div className=" w-1/2">
            <div className=" font-bold text-sm text-violet-500 ">
              <p className=" uppercase">{item['title']}</p>
              <p className=" font-light">
                {item['start']} -
                <span className="text-green-400"> {item['end']}</span>
              </p>
            </div>
          </div>
          <div className=" flex gap-3">
            <div onClick={()=>{editting(ind)}} className=" py-1 text-black cursor-pointer px-2  bg-indigo-400 rounded-sm">
              <MdEdit />
            </div>
            <div
              onClick={()=>{
                scaleUpDowns(ind)
              }}
              className=" py-1 text-black cursor-pointer px-2 bg-purple-300 rounded-sm"
            >
              <MdDelete />
            </div>
          </div>
        </div>)
      })}
      
      <div className=' rounded-md mx-auto w-[90%] bg-cyan-400 p-3 text-white flex justify-start gap-2 font-bold items-center'>
        <div className=' text-2xl'>
          {" "}
          <CiLight />
        </div>
        <p className='text-xs md:text-base'>
          Now, let&apos;s fill out your work history
          <br />
          We&apos;ll suggest bullet points that make a great impression
        </p>
      </div>
   {decition?   <div className=' flex flex-wrap justify-center items-center'>
        <div className=' w-[300px] p-2'>
          <p className=' py-2'>Job Title</p>
          <input
            value={obj["title"]}
            onChange={e => {
              change("title", e.target.value);
            }}
            type='text'
            className=' border border-indigo-400 p-[8px] outline-none focus:border-indigo-600 rounded-md font-bold text-black'
          />
        </div>
       
        <div className=' w-[300px] p-2'>
          <p className=' py-2'>City</p>
          <input
            value={obj["city"]}
            onChange={e => {
              change("city", e.target.value);
            }}
            type='text'
            className=' border border-indigo-400 p-[8px] outline-none focus:border-indigo-600 rounded-md font-bold text-black'
          />
        </div>
        <div className=' w-[300px] p-2'>
          <p className=' py-2'>State</p>
          <input
            value={obj["state"]}
            onChange={e => {
              change("state", e.target.value);
            }}
            type='text'
            className=' border border-indigo-400 p-[8px] outline-none focus:border-indigo-600 rounded-md font-bold text-black'
          />
        </div>
        <div className=' w-[300px] p-2'>
          <p className=' py-2'>Start Date:</p>
          <input value={obj['start']}
            onChange={e => {
              change("start", e.target.value);
            }}
            type='date'
            className=' border border-indigo-400 p-[8px] outline-none focus:border-indigo-600 rounded-md font-bold text-black w-full'
          />
        </div>
        <div className=' w-[300px] p-2'>
          <p className=' py-2'>End Date:</p>
          <input value={obj['end']}
            onChange={e => {
              change("end", e.target.value);
            }}
            type='date'
            className=' border border-indigo-400 p-[8px] outline-none focus:border-indigo-600 rounded-md font-bold text-black w-full'
          />
        </div>
        <div className=' min-w-[90%] p-2'>
          <p className=' py-2'>Description</p>
          <input
            value={obj["employer"]}
            onChange={e => {
              change("employer", e.target.value);
            }}
            type='text'
            className=' w-full border border-indigo-400 p-[8px] outline-none focus:border-indigo-600 rounded-md font-bold text-black'
          />
        </div>
      </div>:null}
      <div className=' flex-wrap flex justify-evenly md:justify-normal  flex-row-reverse p-3'>
        <div className=' text-xs md:w-[300px] md:text-base  p-2'>
          <button
            onClick={() => {
              scrollLeft(3);
              pageno(3);
            }}
            className=' bg-rose-300 flex  py-1 px-2 items-center justify-center gap-1 rounded-sm'>
            NEXT
            <TbPlayerTrackNextFilled />
          </button>
        </div>
        <div className=' text-xs md:text-base md:w-[300px] p-2'>
          {load ? (
            <div className=' w-[100px] flex justify-center items-center bg-rose-300 h-[50px] rounded-md'>
              {" "}
              <Load />
            </div>
          ) : (
            decition ? (
              <div onClick={() => {}} className=" text-xs md:text-base  p-2 flex justify-start items-start">
                {load ? (
                  <div><Load /></div>
                ) : (update?<div className=" flex gap-4"> <button onClick={()=>{updates(obj['ind'])}}  className=" bg-rose-300 flex  py-1 px-2 items-center justify-center gap-1 rounded-sm">
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
                 }}  className=" bg-rose-300 flex  py-1 px-2 items-center justify-center gap-1 rounded-sm">
               <HiPlusSm />
                 Add Section
               </button></div>: allDatas.length<2 && <button
                    onClick={submit}
                    className=" bg-rose-300 flex  py-1 px-2 items-center justify-center gap-1 rounded-sm"
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
                  className=" bg-cyan-400 text-white flex  py-1 px-2 items-center justify-center gap-1 rounded-sm"
                >
                  <HiPlusSm />
                  Add Secton
                </button>
              </div>
            )
          )}
        </div>
        <div className=' text-xs md:text-base md:w-[300px] p-2'>
          <button
            onClick={() => {
              scrollLeft(1);
              pageno(1);
            }}
            className=' bg-rose-300 flex  py-1 px-2 items-center justify-center gap-1 rounded-sm'>
            <TbPlayerTrackPrevFilled />
            Previous
          </button>
        </div>
      </div>
    </div>
  );
}
