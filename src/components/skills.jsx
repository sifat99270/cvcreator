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
export default function Skills({ pageno, scrollleft }) {
  const [obj, setObj] = useState([]);
  const loadRef = useRef();
  function change(name, value, i) {
    setObj((pre) => {
      const list = [...pre];
      list[i][name] = value;
      setObj(list);
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
      setObj(select[0]["skills"]);
    } else {
      setObj([{ skill: "", level: "Beginners", decition: "add" }]);
    }
  }, [select]);
  function add() {
    if (obj instanceof Array && obj.length > 0) {
      setObj((pre) => {
        return [...pre, { skill: "", level: "Beginners", decition: "add" }];
      });
    } else {
      setObj(() => [{ skill: "", level: "Beginners", decition: "add" }]);
    }
  }
  async function submit(i) {
    if (!load) {
      setLoad(true);
      loadRef.current.classList.replace("scale-0", "scale-1");
      if (!verifyName(obj[i]["skill"])) {
        error("set a valid skill name");
      } else {
        obj[i].mainId = select[0]["id"];
        if (obj[i]["decition"] === "add") {
          const res = await fetch("api/all/skill", {
            method: "POST",
            body: JSON.stringify(obj[i]),
            headers: { "content-type": "application/json" },
          });
          const data = await res.json();
          if (data["status"] === "success") {
            success("skill created");
            updateArray(data["data"], select[1], "skills");
            setObj(cvdata[select[1]]["skills"]);
          } else {
            error("skill create fail");
          }
        } else {
          const res = await fetch("api/all/skill", {
            method: "PUT",
            body: JSON.stringify(obj[i]),
            headers: { "content-type": "application/json" },
            cache: "no-store",
          });
          const data = await res.json();

          if (data["status"] === "success") {
            success("skill updated");
            dataUpdateArray(data["data"], select[1], "skills", i);
            setObj(cvdata[select[1]]["skills"]);
          } else {
            error("exprience update fail");
          }
        }
      }
      setLoad(false);
      loadRef.current.classList.replace("scale-1", "scale-0");
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
  return (
    <div className={`${mode==="dark"? " bg-gray-900 shadow-slate-600":" bg-white shadow-slate-300"} text-sky-400 p-2 shadow-md rounded-sm  relative `}>
      <div ref={loadRef} className=" scale-0 absolute top-1/2 left-1/2">
        <Load />
      </div>
      <div className={`${mode==="dark"?" bg-slate-400 text-gray-500":"bg-cyan-400 text-white"} rounded-md mx-auto w-[90%]  p-3  flex justify-start gap-2 font-bold items-center`}>
        <div className=" text-2xl">
          {" "}
          <CiLight />
        </div>
        <p className="text-xs md:text-base">
          Next, let&apos;s take care of your skills
          <br />
          Enter 2-3 skills that are most relevant to your desired job.
        </p>
      </div>
      {obj instanceof Array &&
        obj.length > 0 &&
        obj.map((item, index) => {
          return (
            <div
              key={index}
              className=" flex flex-wrap justify-center items-center"
            >
              <div className=" w-[300px] p-2">
                <p className=" py-2">Skills</p>
                <input
                  value={obj[index]["skill"]}
                  onChange={(e) => {
                    change("skill", e.target.value, index);
                  }}
                  type="text"
                  className={`${mode==="dark"?" text-white bg-gray-700 border-zinc-600 focus:border-zinc-400":"text-black border-indigo-400 focus:border-indigo-600 "} border  p-[8px] outline-none  rounded-md font-bold `}
                />
              </div>

              <div className=" w-[300px] p-2 ">
                <p className=" py-2">Level</p>
                <div className="flex justify-center items-center gap-2">
                  <select
                    value={obj[index]["level"]}
                    onChange={(e) => {
                      change("level", e.target.value, index);
                    }}
                    className={`${mode==="dark"?" text-white bg-gray-700 border-zinc-600 focus:border-zinc-400":"text-black border-indigo-400 focus:border-indigo-600 "} w-full outline-none border  p-[8px] rounded-md font-bold `}
                  >
                    <option>Beginners</option>
                    <option>Intermediate</option>
                    <option>Expert</option>
                  </select>
                 {item['id'] &&  <div
                    onClick={() => {
                      del(index);
                    }}
                    className=" cursor-pointer text-2xl"
                  >
                    <MdDelete />
                  </div>}
                  <div
                    onClick={() => {
                      submit(index);
                    }}
                    className=" cursor-pointer text-2xl"
                  >
                    <MdBrowserUpdated />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      {obj instanceof Array && obj.length<3 && <div
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
