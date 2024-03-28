"use client";

import { useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaXmark } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { error, success } from "@/utility/toast";
import Load from "./load";
import { alldata } from "./store/allstore";
import { verifyName } from "./regex";
function CV({ all, scrollLeft, setSelect, pageno }) {
  const { addToSelect, mode } = alldata(state => {
    return { addToSelect: state.addToSelect, mode: state.mode };
  });
  const scaleRef = useRef();
  const [load, setLoad] = useState(false);
  const [name, setName] = useState("");
  const [track, setTrack] = useState(null);
  function scaleOpen() {
    if (scaleRef.current.classList.contains("scale-0")) {
      scaleRef.current.classList.replace("scale-0", "scale-1");
    } else {
      scaleRef.current.classList.replace("scale-1", "scale-0");
    }
  }
  function scaleClose() {
    if (scaleRef.current.classList.contains("scale-1")) {
      scaleRef.current.classList.replace("scale-1", "scale-0");
    }
  }
  function select(i) {
    addToSelect([all[i], i]);
    setSelect(true);
    scrollLeft(1);
    pageno(1);
  }
  async function create() {
    setLoad(true);
    if (!verifyName(name)) {
      error("type a valid name");
    } else {
      const res = await fetch("api/all/cv", {
        method: "POST",
        body: JSON.stringify({ name: name }),
        headers: { "content-type": "application/json" },
      });
      const data = await res.json();
      if (data["status"] === "success") {
        setName("");
        success("data create");
        all.push(data["data"]);
      } else {
        error("data create fail");
      }
    }

    setLoad(false);
  }

  return (
    <div className={` ${mode==="dark"?" bg-gray-900":"bg-white"} w-full flex justify-evenly relative gap-4 flex-wrap  p-2`}>
      <div
        onClick={scaleOpen}
        className={` w-[300px] h-36 p-2 rounded-md cursor-pointer flex items-center shadow-md justify-evenly ${mode==='dark' ? "shadow-slate-600 " :" bg-white  shadow-slate-200"} `}>
        <div className={`${mode==='dark'? "text-white":"text-black"} text-2xl`}>
          <AiOutlinePlus />
        </div>
        <p className={` ${mode==="dark"?"text-white":"text-black"} font-bold p-2 text-center `}>
          create new <br></br>resume
        </p>
      </div>
      <div
        ref={scaleRef}
        className=' transition-all absolute scale-0  z-50 bg-white top-[25%] flex justify-evenly items-center flex-col gap-2 w-[300px] p-2 shadow-md shadow-gray-400 rounded-md'>
        <div className=' flex justify-evenly'>
          <div>
            <p className=' font-black  text-xl text-center'>
              Enter Your Cv Title
            </p>
            <p className=' font-thin text-sm'>
              This name will be use to save your cv
            </p>
          </div>
          <div
            onClick={scaleClose}
            className={`${
              load ? "hidden" : null
            } cursor-pointer  bg-slate-500 w-4 h-4 rounded-full`}>
            <FaXmark />
          </div>
        </div>
        <input
          value={name}
          onChange={e => {
            setName(e.target.value);
          }}
          className=' w-11/12  outline-none font-bold bg-violet-100 p-2 rounded-md border'
          type='text'
          placeholder=' Enter a Name'
        />
        {load ? (
          <div className=' h-[50px] w-[75px] mt-2'>
            {" "}
            <Load />
          </div>
        ) : (
          <div className='flex justify-between gap-2'>
            <button
              onClick={scaleClose}
              className='px-2 py-1 rounded-md font-bold  bg-rose-700'>
              Close
            </button>
            <button
              onClick={create}
              className='px-2 py-1 rounded-md font-bold bg-pink-500'>
              Create
            </button>
          </div>
        )}
      </div>
      {all &&
        all instanceof Array &&
        all.map((item, i) => {
          return (
            <div
              key={item["id"]}
              className={` ${
                track === i ? "scale-50" : "scale-100"
              } ${mode==="dark" ? "shadow-slate-600":"shadow-gray-400"} h-[120px] w-[300px] shadow-md  rounded-md flex  `}>
              <div className=' w-[50%] h-full flex justify-center items-center'>
                <img
                  className={` ${mode==="dark"?"shadow-slate-400":"shadow-slate-300"} w-full h-full object-cover rounded-md shadow-md  p-2`}
                  src='/cvtem.jpg'
                />
              </div>
              <div className='flex gap-4 flex-col justify-center items-center w-full'>
                <p className=' w-full  font-bold text-emerald-400'>
                  {item["name"]}
                </p>
                <div className=' flex w-full justify-evenly'>
                  <div
                    onClick={() => {
                      select(i);
                      setTrack(i);
                    }}
                    className={` ${mode==="dark"? " shadow-gray-800 border-neutral-700":"shadow-slate-400"}  flex gap-1 rounded-md shadow-md   text-emerald-400 border p-1 justify-center items-center cursor-pointer`}>
                    <p>Edit</p>
                    <MdEdit />
                  </div>
                  <div className={`${mode==="dark"? " shadow-gray-800 border-neutral-700":"shadow-slate-400"} flex gap-1 rounded-md shadow-md  text-emerald-400 border p-1 justify-center items-center cursor-pointer`}>
                    <FaCloudDownloadAlt />
                  </div>
                  <div className={` ${mode==="dark"? " shadow-gray-800 border-neutral-700":"shadow-slate-400"} flex gap-1 rounded-md shadow-md shadow-slate-400 text-emerald-400 border p-1 justify-center items-center cursor-pointer`}>
                    <BsThreeDotsVertical />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default CV;
