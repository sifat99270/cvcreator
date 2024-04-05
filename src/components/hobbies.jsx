"use client";
import { useEffect, useRef, useState } from "react";
import { CiLight } from "react-icons/ci";
import { FaSave } from "react-icons/fa";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { FaCirclePlus } from "react-icons/fa6";
import { MdBrowserUpdated } from "react-icons/md";
import { MdEdit } from "react-icons/md";

import Load from "./load";
import { error, success } from "@/utility/toast";
import { alldata } from "./store/allstore";
import { verifyName } from "./regex";
export default function Hobbies({ pageno, scrollLeft }) {
  const [obj, setObj] = useState({ name: "" });
  const [alldatas, setAllDatas] = useState([]);
  const [delIndex,setDelIndex]=useState(null);
  const scaleRef = useRef();
  function change(name, value) {
    setObj(pre => {
      return {
        ...pre,
        name: value,
      };
    });
  }
  const [load, setLoad] = useState(false);
  const [decition, setDecition] = useState(false);
  const [update, setUpdate] = useState(false);
  const { select, updateArray, deleteArray, dataUpdateArray, cvdata, mode } =
    alldata(state => {
      return {
        updateArray: state.updateArray,
        select: state.select,
        deleteArray: state.deleteArray,
        dataUpdateArray: state.dataUpdateArray,
        cvdata: state.cvdata,
        mode: state.mode,
      };
    });
  useEffect(() => {
    if (select instanceof Array && select.length > 0 && select[0]["hobbies"]) {
      setAllDatas(select[0]["hobbies"]);
    } else {
      setAllDatas([]);
    }
    setDecition(false)
    if(update){
      setUpdate(false);
     
     setObj({ name: "" })
    }
  }, [select]);
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
  function add() {
  
      setObj({name: "", });
      setDecition(true)
    setUpdate(false)
  }
  async function submit() {
    if (!load) {
      setLoad(true);
      obj.mainId = select[0]["id"];
      if (!verifyName(obj["name"])) {
        error("type a valid hobbie name");
      } else {
          const res = await fetch("api/all/hobbie", {
            method: "POST",
            body: JSON.stringify(obj),
            headers: { "content-type": "application/json" },
          });
          const data = await res.json();
          if (data["status"] === "success") {
            success("hobbie create");
            setDecition(false);
            updateArray(data["data"], select[1], "hobbies");
            setObj({name:""});
          } else {
            error("hobbie create fail");
          }
        }
      setLoad(false);
    } else {
      error("please click some times letter");
    }
  }
  async function del(i) {
    if (!load) {
      scaleRef.current.classList.replace("scale-1", "scale-0");
      setLoad(true);
      alldatas[i].mainId = select[0]["id"];
      const res = await fetch("api/all/hobbie", {
        method: "DELETE",
        body: JSON.stringify(alldatas[i]),
        headers: { "content-type": "application/json" },
        cache: "no-store",
      });
      const data = await res.json();
      if (data["status"] === "success") {
        success("hobbie deleted");
        deleteArray(select[1], "hobbies", i);
       setDecition(false)
       setObj({name:""});
       if(update){
        setUpdate(false)
      }
      } else {
        error("hobbie delete fail");
      }
      setLoad(false);
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
    const res = await fetch("api/all/hobbie", {
      method: "PUT",
      body: JSON.stringify(all),
      headers: { "content-type": "application/json" },
      cache: "no-store",
    });
    const data = await res.json();
    if (data["status"] === "success") {
      success("hobbie updated");
      dataUpdateArray(data["data"], select[1], "hobbies", track);
      setDecition(false);
      setUpdate(false);
      setObj({ name: "" })
    } else {
      error("hobbie update fail");
    }
    setLoad(false)
  }
  return (
    <div
      className={`${
        mode === "dark"
          ? " bg-gray-900 shadow-slate-600"
          : " bg-white shadow-slate-300"
      } text-sky-400 p-2 shadow-md rounded-sm  relative`}>
      <div
        className={`${
          mode === "dark"
            ? " bg-slate-400 text-gray-500"
            : "bg-cyan-400 text-white"
        } rounded-md mx-auto w-[90%] 0 p-3  flex justify-start gap-2 font-bold items-center`}>
        <div className=' text-2xl'>
          <CiLight />
        </div>
        <p className='text-xs md:text-base'>
          Hobbies / Interests
          <br />
          Showcase your Interests to an employer
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
                  <p className=' uppercase'>{item["name"]}</p>
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
      {decition && (
        <div className=' flex flex-wrap justify-center items-center'>
          <div className=' w-[300px] p-2 '>
            <p className=' py-2'>Hobbies</p>
            <div className=' flex justify-center items-center'>
              <input
                value={obj["name"]}
                onChange={e => {
                  change("name", e.target.value);
                }}
                type='text'
                className={`${
                  mode === "dark"
                    ? " text-white bg-gray-700 border-zinc-600 focus:border-zinc-400"
                    : "text-black border-indigo-400 focus:border-indigo-600 "
                } border  p-[8px] outline-none  rounded-md font-bold `}
              />
             
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
      )}
      {alldatas instanceof Array && alldatas.length < 3 && (
        <div
          onClick={add}
          className={`${
            mode === "dark"
              ? " bg-slate-400 text-gray-500"
              : "bg-slate-300 shadow-gray-200 "
          } mx-auto mt-3 cursor-pointer p-2 flex rounded-md shadow-md   w-[300px]  justify-center items-center gap-2`}>
          <FaCirclePlus />
          <p>Add More Hobbies</p>
        </div>
      )}
      <div className=' flex justify-evenly  flex-row-reverse p-3'>
        <div className=' text-xs md:text-base p-2'>
          <button
            onClick={() => {
              pageno(7);
              scrollLeft(7);
            }}
            className={`${
              mode === "dark" ? " bg-slate-400 text-gray-500" : "bg-rose-300"
            }  flex  py-1 px-2 items-center justify-center gap-1 rounded-sm`}>
            NEXT
            <TbPlayerTrackNextFilled />
          </button>
        </div>

        <div className='text-xs md:text-base p-2'>
          <button
            onClick={() => {
              pageno(5);
              scrollLeft(5);
            }}
            className={`${
              mode === "dark" ? " bg-slate-400 text-gray-500" : "bg-rose-300"
            } flex  py-1 px-2 items-center justify-center gap-1 rounded-sm`}>
            <TbPlayerTrackPrevFilled />
            Previous
          </button>
        </div>
      </div>
    </div>
  );
}
