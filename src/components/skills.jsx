"use client";
import { useEffect, useRef, useState } from "react";
import { CiLight } from "react-icons/ci";
import { FaSave } from "react-icons/fa";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { FaCirclePlus } from "react-icons/fa6";
import { MdBrowserUpdated } from "react-icons/md";
import { error, success } from "@/utility/toast";
import Load from "./load";
import { alldata } from "./store/allstore";
import { verifyName } from "./regex";
import { MdEdit } from "react-icons/md";
export default function Skills({ pageno, scrollleft }) {
  const [obj, setObj] = useState({ skill: "", level: "Beginners" });
  const loadRef = useRef();
  const [alldatas, setAllDatas] = useState([]);
  const [delIndex,setDelIndex]=useState(null);
  const scaleRef = useRef();
  const [decition, setDecition] = useState(false);
  const [update, setUpdate] = useState(false);
  function change(name, value) {
    setObj((pre) => {
    pre[name]=value
    return{
      ...pre
    }
    });
  }
  const { select, updateArray, deleteArray, dataUpdateArray, cvdata ,mode} = alldata(
    (state) => {
      return {
        updateArray: state.updateArray,
        select: state.select,
        deleteArray: state.deleteArray,
        dataUpdateArray: state.dataUpdateArray,
        cvdata: state.cvdata,
        mode:state.mode
      };
    }
  );
  const [load, setLoad] = useState(false);
  useEffect(() => {
    if (select instanceof Array && select.length > 0 && select[0]["skills"]) {
      setAllDatas(select[0]["skills"]);
    } else {
      setAllDatas([]);
    }
    setDecition(false)
    if(update){
      setUpdate(false);
     
     setObj({ name: "" })
    }
  }, [select]);
  function add() {
      setObj({ skill: "", level: "Beginners", })
      setDecition(true)
      setUpdate(false)
  }
  async function submit(i) {
    if (!load) {
      setLoad(true);
      if (!verifyName(obj["skill"])) {
        error("set a valid skill name");
      } else {
        obj.mainId = select[0]["id"];
          const res = await fetch("api/all/skill", {
            method: "POST",
            body: JSON.stringify(obj),
            headers: { "content-type": "application/json" },
          });
          const data = await res.json();
          if (data["status"] === "success") {
            success("skill created");
            updateArray(data["data"], select[1], "skills");
            setDecition(false)
            setObj({ skill: "", level: "Beginners" })
          } else {
            error("skill create fail");
          }
      }
      setLoad(false);
    } else {
      error("please click some times letter");
    }
  }
  async function del(i) {
    if (!load) {
      setLoad(true);
      loadRef.current.classList.replace("scale-0", "scale-1");
      obj[i].mainId = select[0]["id"];
      const res = await fetch("api/all/skill", {
        method: "DELETE",
        body: JSON.stringify(obj[i]),
        headers: { "content-type": "application/json" },
        cache: "no-store",
      });
      const data = await res.json();

      if (data["status"] === "success") {
        success("skill deleted");
        deleteArray(select[1], "skills", i);
      } else {
        error("skill delete fail");
      }
      setLoad(false);
      loadRef.current.classList.replace("scale-1", "scale-0");
    } else {
      error("please click some times letter");
    }
  }
  function scaleUpDowns(i) {
    if (!load) {
      if (scaleRef.current.classList.contains("scale-0")) {
        setDelIndex(i);
        scaleRef.current.classList.replace("scale-0", "scale-1");
      } else {
        setDelIndex(null);
        scaleRef.current.classList.replace("scale-1", "scale-0");
      }
    } else {
      error("please click some times letter");
    }
  }
  function editting(i) {
    if (!decition) {
      setDecition(true);
    }
    setObj({ ...alldatas[i], ind: i });
    setUpdate(true);
  }
  async function Update(track){
    setLoad(true)
    const all = {
      ...obj,
      mainId: select[0]["id"],
    };
    const res = await fetch("api/all/skill", {
      method: "PUT",
      body: JSON.stringify(all),
      headers: { "content-type": "application/json" },
      cache: "no-store",
    });
    const data = await res.json();
    if (data["status"] === "success") {
      success("hobbie updated");
      dataUpdateArray(data["data"], select[1], "skills", track);
      setDecition(false);
      setUpdate(false);
      setObj({ skill: "", level: "Beginners" })
    } else {
      error("hobbie update fail");
    }
    setLoad(false)
  }
  async function del(i) {
    if (!load) {
      scaleRef.current.classList.replace("scale-1", "scale-0");
      setLoad(true);
      alldatas[i].mainId = select[0]["id"];
      const res = await fetch("api/all/skill", {
        method: "DELETE",
        body: JSON.stringify(alldatas[i]),
        headers: { "content-type": "application/json" },
        cache: "no-store",
      });
      const data = await res.json();
      if (data["status"] === "success") {
        success("hobbie deleted");
        deleteArray(select[1], "skills", i);
      } else {
        error("hobbie delete fail");
      }
      setLoad(false);
    } else {
      error("please click some times letter");
    }
  }
  return (
    <div className={`${mode==="dark"? " bg-gray-900 shadow-slate-600":" bg-white shadow-slate-300"} text-sky-400 p-2 shadow-md rounded-sm  relative `}>
      
      <div className={`${mode==="dark"?" bg-slate-400 text-gray-500":"bg-cyan-400 text-white"} rounded-md mx-auto w-[90%]  p-3  flex justify-start gap-2 font-bold items-center`}>
        <div className=" text-2xl">
          <CiLight />
        </div>
        <p className="text-xs md:text-base">
          Next, let&apos;s take care of your skills
          <br />
          Enter 2-3 skills that are most relevant to your desired job.
        </p>
      </div>
      <div
        ref={scaleRef}
        className={`${
          mode === "dark"
            ? " bg-neutral-500 shadow-gray-600"
            : "bg-sky-100 shadow-gray-300"
        }  absolute scale-0 flex flex-col justify-center items-center  p-2 shadow-lg h-[100px]  rounded-md w-[300px]`}>
        <p>Do You Want To Delete This Item</p>
        <div className='  mt-3 flex justify-evenly items-center gap-4'>
          <div
            onClick={() => {
              del(delIndex);
            }}
            className=' cursor-pointer rounded-md py-1 px-2 bg-lime-200'>
            YES
          </div>
          <div
            onClick={scaleUpDowns}
            className=' cursor-pointer rounded-md py-1 px-2 bg-teal-200'>
            NO
          </div>
        </div>
      </div>
      {alldatas instanceof Array &&
        alldatas.length > 0 &&
        alldatas.map((item, index) => {
          return (
            <div
              key={item["id"]}
              className={`${
                mode === "dark" ? " bg-gray-600" : "bg-white shadow-gray-200 "
              } mt-3 w-3/4 gap-2 mx-auto  shadow-md  rounded-md p-2 flex justify-start items-center`}>
              <div className=' w-1/2'>
                <div
                  className={`${
                    mode === "dark" ? " text-gray-400" : "text-violet-500"
                  } font-bold text-sm `}>
                  <p className=' uppercase'>{item["skill"]}</p>
                </div>
              </div>
              <div className=' flex gap-3'>
                <div
                  onClick={() => {
                    editting(index);
                  }}
                  className={`${
                    mode === "dark"
                      ? " bg-slate-900 text-gray-300"
                      : "bg-indigo-400 text-black"
                  } py-1 cursor-pointer px-2   rounded-sm`}>
                  <MdEdit />
                </div>
                <div
                  onClick={() => {
                    scaleUpDowns(index);
                  }}
                  className={`${
                    mode === "dark"
                      ? " bg-neutral-800 text-gray-400"
                      : "text-black bg-purple-300"
                  } py-1  cursor-pointer px-2  rounded-sm`}>
                  <MdDelete />
                </div>
              </div>
            </div>
          );
        })}
      {decition &&
            <div
              className=" flex flex-wrap justify-center items-center"
            >
              <div className=" w-[300px] p-2">
                <p className=" py-2">Skills</p>
                <input
                  value={obj["skill"]}
                  onChange={(e) => {
                    change("skill", e.target.value);
                  }}
                  type="text"
                  className={`${mode==="dark"?" text-white bg-gray-700 border-zinc-600 focus:border-zinc-400":"text-black border-indigo-400 focus:border-indigo-600 "} border  p-[8px] outline-none  rounded-md font-bold `}
                />
              </div>

              <div className=" w-[300px] p-2 ">
                <p className=" py-2">Level</p>
                <div className="flex justify-center items-center gap-2">
                  <select
                    value={obj["level"]}
                    onChange={(e) => {
                      change("level", e.target.value);
                    }}
                    className={`${mode==="dark"?" text-white bg-gray-700 border-zinc-600 focus:border-zinc-400":"text-black border-indigo-400 focus:border-indigo-600 "} w-full outline-none border  p-[8px] rounded-md font-bold `}
                  >
                    <option>Beginners</option>
                    <option>Intermediate</option>
                    <option>Expert</option>
                  </select>
                  {load ?<div className=" p-2"><Load/></div>:update ? <div
             onClick={()=>{Update(obj['ind'])}}
              className=' cursor-pointer ml-1  border border-stone-300 rounded-md py-[2px]  px-1 '>
              Update
            </div>: <div
                onClick={() => {
                  submit();
                }}
                className=' cursor-pointer ml-1  border border-stone-300 rounded-md px-2 '>
                  Add
              </div> }
                </div>
              </div>
            </div>
          }
      {alldatas instanceof Array && alldatas.length<3 && <div
        onClick={add}
        className={`${mode==="dark"?" bg-slate-400 text-gray-500":"bg-slate-300 shadow-gray-200 "} mx-auto mt-3 cursor-pointer p-2 flex shadow-md  w-[300px] rounded-md  justify-center items-center gap-2`}
      >
        <FaCirclePlus />
        <p>Add More Skills</p>
      </div>}
      <div className=" flex justify-evenly flex-row-reverse p-3">
        <div className=" text-xs md:text-base p-2">
          <button
            onClick={() => {
              pageno(5);
              scrollleft(5);
            }}
            className={`${mode==="dark"?" bg-slate-400 text-gray-500":"bg-rose-300"}  flex  py-1 px-2 items-center justify-center gap-1 rounded-sm`}
          >
            NEXT
            <TbPlayerTrackNextFilled />
          </button>
        </div>
        <div className=" text-xs md:text-base p-2">
          <button
            onClick={() => {
              scrollleft(3);
              pageno(3);
            }}
            className= {`${mode==="dark"?" bg-slate-400 text-gray-500":"bg-rose-300"} flex  py-1 px-2 items-center justify-center gap-1 rounded-sm`}
          >
            <TbPlayerTrackPrevFilled />
            Previous
          </button>
        </div>
      </div>
    </div>
  );
}
