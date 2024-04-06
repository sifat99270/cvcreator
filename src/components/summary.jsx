"use client";
import { error, success } from "@/utility/toast";
import { useEffect, useState } from "react";
import { CiLight } from "react-icons/ci";
import { FaSave } from "react-icons/fa";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import Load from "./load";
import { alldata } from "./store/allstore";
import { verifySummary } from "./regex";

export default function Summary({ scrollleft, pageno }) {
  const [obj, setObj] = useState({
    text: "",
  });
  const [updateDec, setUpdateDec] = useState(false);
  const { select, updateObject, cvdata, mode } = alldata(state => {
    return {
      updateObject: state.updateObject,
      select: state.select,
      cvdata: state.cvdata,
      mode: state.mode,
    };
  });
  useEffect(() => {
    if (select instanceof Array && select.length > 0 && select[0]["summary"]) {
      setObj(select[0]["summary"]);
      setUpdateDec(true);
    } else {
      setUpdateDec(false);
      setObj({
        text: "",
      });
    }
  }, [select]);

  const [load, setLoad] = useState(false);
  function change(name, value) {
    return setObj(pre => {
      return {
        ...pre,
        [name]: value,
      };
    });
  }
  async function submit() {
    setLoad(true);
    if (!verifySummary(obj["text"])) {
      error("summary must be 50 lettter");
    } else {
      obj.mainId = select[0]["id"];
      const res = await fetch("api/all/summary", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: { "content-type": "application/json" },
      });
      const data = await res.json();
      if (data["status"] === "success") {
        success("summary create");
        updateObject(data["data"], select[1], "summary");
        setUpdateDec(true);
      } else {
        error("summary create fail");
      }
    }
    setLoad(false);
  }
  async function update() {
    setLoad(true);
    if (!verifySummary(obj["text"])) {
      error("summary must be 50 lettter");
    } else {
      obj.mainId = select[0]["id"];
      const res = await fetch("api/all/summary", {
        method: "PUT",
        body: JSON.stringify(obj),
        headers: { "content-type": "application/json" },
        cache: "no-store",
      });
      const data = await res.json();

      if (data["status"] === "success") {
        success("summary uapdate");
        updateObject(data["data"], select[1], "summary");
        setUpdateDec(true);
      } else {
        error("summary update fail");
      }
    }
    setLoad(false);
  }
  return (
    <div
      className={`${
        mode === "dark"
          ? " bg-gray-900 shadow-slate-600"
          : " bg-white shadow-slate-300"
      } text-sky-400 p-2 shadow-md rounded-sm `}>
      <div
        className={`${
          mode === "dark"
            ? " bg-slate-400 text-gray-500"
            : "bg-cyan-400 text-white"
        } rounded-md mx-auto w-[90%] p-3 t flex justify-start gap-2 font-bold items-center`}>
        <div className=' text-2xl'>
          {" "}
          <CiLight />
        </div>
        <p className='text-xs md:text-base'>
          Write a career overview so that hiring managers can immediately see
          the value that you bring.
        </p>
      </div>
      <div className=' flex flex-wrap justify-center items-center'>
        <div className=' w-full p-2'>
          <p className=' py-2'>Summary</p>
          <textarea
            value={obj["text"]}
            onChange={e => {
              change("text", e.target.value);
            }}
            type='text'
            className={`${
              mode === "dark"
                ? " text-white bg-gray-700 border-zinc-600 focus:border-zinc-400"
                : "text-black border-indigo-400 focus:border-indigo-600 "
            }  border  p-[8px] outline-none rounded-md font-bold  w-[90%] min-h-[300px]`}
          />
        </div>
      </div>
      <div className='  flex justify-evenly  flex-row-reverse p-3'>
        <div className=' text-xs md:text-base p-2'>
          <button
            onClick={() => {
              scrollleft(6);
              pageno(6);
            }}
            className={`${
              mode === "dark" ? " bg-slate-400 text-gray-500" : "bg-rose-300"
            } flex  py-1 px-2 items-center justify-center gap-1 rounded-sm`}>
            NEXT
            <TbPlayerTrackNextFilled />
          </button>
        </div>
        <div className='text-xs md:text-base p-2 flex items-start justify-start'>
          {load ? (
            <div className='flex items-center   justify-center'>
              <Load />
            </div>
          ) : updateDec ? (
            <button
              onClick={update}
              className={`${
                mode === "dark" ? " bg-slate-400 text-gray-500" : "bg-rose-300"
              } flex  py-1 px-2 items-center justify-center gap-1 rounded-sm`}>
              <FaSave />
              Update
            </button>
          ) : (
            <button
              onClick={submit}
              className={`${
                mode === "dark" ? " bg-slate-400 text-gray-500" : "bg-rose-300"
              }  flex  py-1 px-2 items-center justify-center gap-1 rounded-sm`}>
              <FaSave />
              SAVE
            </button>
          )}
        </div>
        <div className='text-xs md:text-base p-2'>
          <button
            onClick={() => {
              scrollleft(4);
              pageno(4);
            }}
            className={`${
              mode === "dark" ? " bg-slate-400 text-gray-500" : "bg-rose-300"
            }  flex  py-1 px-2 items-center justify-center gap-1 rounded-sm`}>
            <TbPlayerTrackPrevFilled />
            Previous
          </button>
        </div>
      </div>
    </div>
  );
}
