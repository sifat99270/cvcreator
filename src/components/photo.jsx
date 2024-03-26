"use client";
import { useState } from "react";
import { CiLight } from "react-icons/ci";
import { FaSave } from "react-icons/fa";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";

export default function Photo({pageno,scrollLeft}) {
  const [obj, setObj] = useState({
    photos: "",
  });
  function change(name, value) {
    return setObj((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  }
  console.dir(obj["photos"]);

  return (
    <div className=" text-sky-400 p-2 shadow-md rounded-sm shadow-slate-300">
      <div className=" rounded-md mx-auto w-[90%] bg-cyan-400 p-3 text-white flex justify-start gap-2 font-bold items-center">
        <div className=" text-2xl">
          {" "}
          <CiLight />
        </div>
        <p>
          What&apos;s the best way for Employers to contact you?
          <br />
          We suggest including an email and phone number.
        </p>
      </div>
      <div className=" flex flex-wrap justify-center items-center h-[500px]">
        <div className=" w-full p-2 h-[500px]">
          <p className=" py-2">upload a photo</p>
          <input
            value={obj["photos"]}
            onChange={(e) => {
              change("photos", e.target.value);
            }}
            type="file"
            className=" border border-gray-200 p-[8px] outline-none focus:border-indigo-600 rounded-md font-bold text-black  "
          />
          <p>
            Acceptable formats: .JPG, .GIF, .PNG. File size is limited to 2 MB
          </p>
          <div className=" w-[300px] p-2">
            <button className=" bg-rose-300 flex  py-1 px-2 items-center justify-center gap-1 rounded-sm">
              <FaSave />
              SAVE
            </button>
          </div>
        </div>
      </div>
      <div className=" flex  flex-row-reverse p-3">
        <div className=" w-[300px] p-2">
          <button className=" bg-rose-300 flex  py-1 px-2 items-center justify-center gap-1 rounded-sm">
            FINISH
            <TbPlayerTrackNextFilled />
          </button>
        </div>
        <div className=" w-[300px] p-2">
          <button onClick={()=>{
            pageno(6)
            scrollLeft(6)
          }} className=" bg-rose-300 flex  py-1 px-2 items-center justify-center gap-1 rounded-sm">
            <TbPlayerTrackPrevFilled />
            Previous
          </button>
        </div>
      </div>
    </div>
  );
}
