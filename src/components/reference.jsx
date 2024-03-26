"use client";
import { useEffect, useRef, useState } from "react";
import { CiLight } from "react-icons/ci";
import { FaSave } from "react-icons/fa";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { HiPlusSm } from "react-icons/hi";
import { error, success } from "@/utility/toast";
import Load from "./load";
import { MdBrowserUpdated } from "react-icons/md";
import { alldata } from "./store/allstore";
import ReactPdf from "./jspdf";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { verifyEmail, verifyName, verifyNumber } from "./regex";
export default function Reference({ scrollLeft, data, pageno }) {
  const [obj, setObj] = useState({
    name: "",
    position: "",
    mobile: "",
    email: "",
    companyName: "",
  });
  const [load, setLoad] = useState(false);
  const [decition, setDecition] = useState(false);
  const scaleRef = useRef();
  const [allDatas, setAllData] = useState([]);
  const [update, setUpdate] = useState(false);
  const loadRef = useRef();
  const [delIndex, setDelIndex] = useState(null);
  const [test, setTest] = useState(false);
  const [generateCvData,setGenerateCvData]=useState({});
  const { select, updateArray, deleteArray, dataUpdateArray, cvdata } = alldata(
    (state) => {
      return {
        updateArray: state.updateArray,
        select: state.select,
        deleteArray: state.deleteArray,
        dataUpdateArray: state.dataUpdateArray,
        cvdata: state.cvdata,
      };
    }
  );
  useEffect(() => {
    setTest(false);
    if (
      select instanceof Array &&
      select.length > 0 &&
      select[0]["reference"]
    ) {
      setAllData(select[0]["reference"]);
      setObj({
        name: "",
        position: "",
        mobile: "",
        email: "",
        companyName: "",
      });
      setUpdate(false);
    } else {
      setUpdate(false);
      setAllData([]);
      setObj({
        name: "",
        position: "",
        mobile: "",
        email: "",
        companyName: "",
      });
    }
  }, [select]);
  function change(name, value) {
    return setObj((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  }
  function scaleUpDown(i) {
    if (scaleRef.current.classList.contains("scale-0")) {
      setDelIndex(i);
      scaleRef.current.classList.replace("scale-0", "scale-1");
    } else {
      setDelIndex(null);
      scaleRef.current.classList.replace("scale-1", "scale-0");
    }
  }
  async function submit() {
    setLoad(true);
    if (!verifyName(obj["name"])) {
      error("type a valid name");
    } else if (!verifyName(obj["position"])) {
      error("type a valid position");
    } else if (!verifyNumber(obj["mobile"])) {
      error("type a valid bangladeshi phone number");
    } else if (!verifyEmail(obj["email"])) {
      error("type a valid email");
    } else if (!verifyName(obj["companyName"])) {
      error("type a valid companyName");
    } else {
      const all = {
        ...obj,
        mainId: select[0]["id"],
      };
      const res = await fetch("api/all/reference", {
        method: "POST",
        body: JSON.stringify(all),
        headers: { "content-type": "application/json" },
      });
      const data = await res.json();
      if (data["status"] === "success") {
        success("reference created");
        updateArray(data["data"], select[1], "reference");
        setAllData(cvdata[select[1]]["reference"]);
        setObj({
          name: "",
          position: "",
          mobile: "",
          email: "",
          companyName: "",
        });
        setDecition(false);
      } else {
        error("reference create fail");
      }
    }

    setLoad(false);
  }
  async function updates(track) {
    setLoad(true);
    if (!verifyName(obj["name"])) {
      error("type a valid name");
    } else if (!verifyName(obj["position"])) {
      error("type a valid position");
    } else if (!verifyNumber(obj["mobile"])) {
      error("type a valid bangladeshi phone number");
    } else if (!verifyEmail(obj["email"])) {
      error("type a valid email");
    } else if (!verifyName(obj["companyName"])) {
      error("type a valid companyName");
    } else {
      const all = {
        ...obj,
        mainId: select[0]["id"],
      };
      const res = await fetch("api/all/reference", {
        method: "PUT",
        body: JSON.stringify(all),
        headers: { "content-type": "application/json" },
      });
      const data = await res.json();
      if (data["status"] === "success") {
        success("reference updated");
        dataUpdateArray(data["data"], select[1], "reference", track);
        setObj({
          name: "",
          position: "",
          mobile: "",
          email: "",
          companyName: "",
        });
        setDecition(false);
      } else {
        error("reference update fail");
      }
    }
    setLoad(false);
  }
  function editting(i) {
    if (!decition) {
      setDecition(true);
    }
    setObj({ ...allDatas[i], ind: i });
    setUpdate(true);
  }
  async function del(i) {
    scaleRef.current.classList.replace("scale-1", "scale-0");
    if (!load) {
      setLoad(true);
      loadRef.current.classList.replace("scale-0", "scale-1");
      allDatas[i].mainId = select[0]["id"];
      const res = await fetch("api/all/reference", {
        method: "DELETE",
        body: JSON.stringify(allDatas[i]),
        headers: { "content-type": "application/json" },
        cache: "no-store",
      });
      const data = await res.json();

      if (data["status"] === "success") {
        success("reference deleted");
        deleteArray(select[1], "reference", i);
        setObj({
          name: "",
          position: "",
          mobile: "",
          email: "",
          companyName: "",
        });
        if (update) {
          setUpdate(false);
        }
      } else {
        error("reference delete fail");
      }
      setLoad(false);
      loadRef.current.classList.replace("scale-1", "scale-0");
    } else {
      error("please click some times letter");
    }
  }

  function genaratePdf() {
  setTest(true);
  }
  return (
    <div className=" flex flex-col justify-center items-center relative text-sky-400 p-2 shadow-md rounded-sm shadow-slate-300">
      <div ref={loadRef} className=" scale-0 absolute top-1/2 left-1/2">
        <Load />
      </div>
      <div
        ref={scaleRef}
        className="  absolute scale-0 flex flex-col justify-center items-center bg-sky-100 p-2 shadow-lg h-[100px] shadow-gray-300 rounded-md w-[300px]"
      >
        <p>Do You Want To Delete This Item</p>
        <div className="  mt-3 flex justify-evenly items-center gap-4">
          <div
            onClick={() => {
              del(delIndex);
            }}
            className=" cursor-pointer rounded-md py-1 px-2 bg-lime-200"
          >
            YES
          </div>
          <div
            onClick={scaleUpDown}
            className=" cursor-pointer rounded-md py-1 px-2 bg-teal-200"
          >
            NO
          </div>
        </div>
      </div>
      <div className=" rounded-md mx-auto w-[90%] bg-cyan-400 p-3 text-white flex justify-start gap-2 font-bold items-center">
        <div className=" text-2xl">
          {" "}
          <CiLight />
        </div>
        <p className="text-xs md:text-base">
          Referees
          <br />
          Showcase your Referees to an employer
        </p>
      </div>
      {allDatas instanceof Array &&
        allDatas.length > 0 &&
        allDatas.map((item, i) => {
          return (
            <div
              key={item["id"] ? item["id"] : i}
              className=" mt-3 w-3/4 gap-2 mx-auto bg-white shadow-md shadow-gray-200 rounded-md p-2 flex justify-start items-center"
            >
              <div className=" w-1/2">
                <div className=" font-bold text-sm text-violet-500 ">
                  <p className=" font-bold uppercase ">{item['name']}</p>
                  <p className=" font-light">
                    {item['companyName']}<span className="text-green-400"> {item['position']}</span>
                  </p>
                </div>
              </div>
              <div className=" flex gap-3">
                <div
                  onClick={() => {
                    editting(i);
                  }}
                  className=" py-1 text-black cursor-pointer px-2  bg-indigo-400 rounded-sm"
                >
                  <MdEdit />
                </div>
                <div
                  onClick={() => {
                    scaleUpDown(i);
                  }}
                  className=" py-1 text-black cursor-pointer px-2 bg-purple-300 rounded-sm"
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
            <p className=" py-2">Full Name</p>
            <input
              value={obj["name"]}
              onChange={(e) => {
                change("name", e.target.value);
              }}
              type="text"
              className=" border border-indigo-400 p-[8px] outline-none focus:border-indigo-600 rounded-md font-bold text-black"
            />
          </div>

          <div className=" w-[300px] p-2">
            <p className=" py-2">Position</p>
            <input
              value={obj["position"]}
              onChange={(e) => {
                change("position", e.target.value);
              }}
              type="text"
              className=" border border-indigo-400 p-[8px] outline-none focus:border-indigo-600 rounded-md font-bold text-black"
            />
          </div>
          <div className=" w-[300px] p-2">
            <p className=" py-2">Mobile</p>
            <input
              value={obj["mobile"]}
              onChange={(e) => {
                change("mobile", e.target.value);
              }}
              type="text"
              className=" border border-indigo-400 p-[8px] outline-none focus:border-indigo-600 rounded-md font-bold text-black"
            />
          </div>
          <div className=" w-[300px] p-2">
            <p className=" py-2">Email</p>
            <input
              value={obj["email"]}
              onChange={(e) => {
                change("email", e.target.value);
              }}
              type="text"
              className=" border border-indigo-400 p-[8px] outline-none focus:border-indigo-600 rounded-md font-bold text-black"
            />
          </div>
          <div className=" w-[300px] p-2">
            <p className=" py-2">Company Name</p>
            <input
              value={obj["companyName"]}
              onChange={(e) => {
                change("companyName", e.target.value);
              }}
              type="text"
              className=" border border-indigo-400 p-[8px] outline-none focus:border-indigo-600 rounded-md font-bold text-black"
            />
          </div>
        </div>
      ) : null}
      <div className="  flex-wrap flex justify-evenly w-full  flex-row p-3">
        <div className="text-xs md:text-base p-2">
          <button
            onClick={() => {
              pageno(6);
              scrollLeft(6);
            }}
            className=" bg-rose-300 flex  py-1 px-2 items-center justify-center gap-1 rounded-sm"
          >
            <TbPlayerTrackPrevFilled />
            Previous
          </button>
        </div>

        {decition ? (
          <div className=" text-xs md:text-base p-2 justify-end items-end">
            {load ? (
              <div className=" flex">
                <Load />
              </div>
            ) : update ? (
              <div className=" text-xs md:text-base flex-wrap flex gap-4">
                {" "}
                <button
                  onClick={() => {
                    updates(obj["ind"]);
                  }}
                  className=" bg-rose-300 flex  py-1 px-2 items-center justify-center gap-1 rounded-sm"
                >
                  <MdBrowserUpdated />
                  Update
                </button>{" "}
                <button
                  onClick={() => {
                    setUpdate(false);
                    setDecition(true);
                    setObj({
                      name: "",
                      position: "",
                      mobile: "",
                      email: "",
                      companyName: "",
                    });
                  }}
                  className=" bg-rose-300 flex  py-1 px-2 items-center justify-center gap-1 rounded-sm"
                >
                  <HiPlusSm />
                  Add Section
                </button>
              </div>
            ) : (
              <div className=" text-xs md:text-base flex gap-4">
                {" "}
                {allDatas.length<2 && <button
                  onClick={submit}
                  className=" bg-rose-300 flex  py-1 px-2 items-center justify-center gap-1 rounded-sm"
                >
                  <FaSave />
                  Save
                </button>}
              </div>
            )}
          </div>
        ) : (
          <div className="text-xs md:text-base p-2">
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
        )}
        <div className="  text-xs md:text-base p-2">
          <button
            onClick={genaratePdf}
            className=" bg-rose-300 flex  py-1 px-2 items-center justify-center gap-1 rounded-sm"
          >
            FINISH
            <TbPlayerTrackNextFilled />
          </button>
        </div>
      </div>
      {test &&  <PDFDownloadLink document={<ReactPdf data={select && cvdata instanceof Array && cvdata.length>0?cvdata[select[1]]:null} />} > download</PDFDownloadLink>}
    </div>
  );
}
