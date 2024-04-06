"use client";
import { error, success } from "@/utility/toast";
import { useEffect, useState } from "react";
import { CiLight } from "react-icons/ci";
import { FaSave } from "react-icons/fa";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import Load from "./load";
import { alldata } from "./store/allstore";
import { verifyDate, verifyEmail, verifyName, verifyNumber } from "./regex";
export default function Profile({ scrollLeft, pageno }) {
  const [obj, setObj] = useState({
    name: "",
    gender: "Male",
    birth: "",
    married: "Single",
    profession: "",
    address: "",
    city: "",
    state: "",
    nationality: "",
    phone: "",
    email: "",
  });
  const { select, updateObject, mode } = alldata(state => {
    return {
      select: state.select,
      updateObject: state.updateObject,
      mode: state.mode,
    };
  });

  useEffect(() => {
    if (select instanceof Array && select.length > 0 && select[0]["profile"]) {
      setObj({
        name: select[0]["profile"]["name"],
        gender: select[0]["profile"]["gender"],
        birth: select[0]["profile"]["birth"],
        married: select[0]["profile"]["married"],
        profession: select[0]["profile"]["profession"],
        address: select[0]["profile"]["address"],
        city: select[0]["profile"]["city"],
        state: select[0]["profile"]["state"],
        nationality: select[0]["profile"]["nationality"],
        phone: select[0]["profile"]["phone"],
        email: select[0]["profile"]["email"],
      });
    } else {
      setObj({
        name: "",
        gender: "Male",
        birth: "",
        married: "Single",
        profession: "",
        address: "",
        city: "",
        state: "",
        nationality: "",
        phone: "",
        email: "",
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
    if (!verifyName(obj["name"])) {
      error("name must be three letter or digit not excepted");
    } else if (!verifyDate(obj["birth"])) {
      error("set a valid date");
    } else if (!verifyName(obj["profession"])) {
      error("set a valid profession");
    } else if (!verifyName(obj["address"])) {
      error("set a valid address");
    } else if (!verifyName(obj["city"])) {
      error("set a valid city");
    } else if (!verifyName(obj["state"])) {
      error("set a valid state");
    } else if (!verifyName(obj["nationality"])) {
      error("set a valid nationality");
    } else if (!verifyNumber(obj["phone"])) {
      error("set a valid phone");
    } else if (!verifyEmail(obj["email"])) {
      error("set a valid email");
    } else {
      const all = {
        ...obj,
        mainId: select[0]["id"],
      };
      const res = await fetch("api/all/profile", {
        method: "POST",
        body: JSON.stringify(all),
        headers: { "content-type": "application/json" },
      });
      const data = await res.json();
      if (data["status"] === "success") {
        success("profile create");
        updateObject(data["data"], select[1], "profile");
      } else {
        error("profile create fail");
      }
    }
    setLoad(false);
  }
  async function updateProfile() {
    setLoad(true);
    if (!verifyName(obj["name"])) {
      error("name must be three letter or digit not excepted");
    } else if (!verifyDate(obj["birth"])) {
      error("set a valid date");
    } else if (!verifyName(obj["profession"])) {
      error("set a valid profession");
    } else if (!verifyName(obj["address"])) {
      error("set a valid address");
    } else if (!verifyName(obj["city"])) {
      error("set a valid city");
    } else if (!verifyName(obj["state"])) {
      error("set a valid state");
    } else if (!verifyName(obj["nationality"])) {
      error("set a valid nationality");
    } else if (!verifyNumber(obj["phone"])) {
      error("set a valid phone");
    } else if (!verifyEmail(obj["email"])) {
      error("set a valid email");
    } else {
      const all = {
        ...obj,
        mainId: select[0]["id"],
        id: select[0]["profile"]["id"],
      };
      const res = await fetch("api/all/profile", {
        method: "PUT",
        body: JSON.stringify(all),
        headers: { "content-type": "application/json" },
      });
      const data = await res.json();
      if (data["status"] === "success") {
        success("profile updated");
        updateObject(data["data"], select[1], "profile");
      } else {
        error("profile update fail");
      }
    }

    setLoad(false);
  }
  return (
    <div
      className={` ${
        mode === "dark"
          ? " bg-gray-900 shadow-slate-600"
          : " bg-white shadow-slate-300"
      } w-full text-sky-400 p-2 shadow-md rounded-sm `}>
      <div
        className={`${
          mode === "dark"
            ? " bg-slate-400 text-gray-500"
            : "bg-cyan-400 text-white"
        }  rounded-md mx-auto w-[90%]  p-3  flex justify-start gap-2 font-bold items-center `}>
        <div className=' text-2xl'>
          {" "}
          <CiLight />
        </div>
        <p className='text-xs md:text-base'>
          What&apos;s the best way for Employers to contact you?
          <br />
          We suggest including an email and phone number.
        </p>
      </div>
      <div className=' flex flex-wrap justify-center items-center'>
        <div className=' w-[300px] p-2'>
          <p className=' py-2'>Full Name</p>
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
            } border p-[8px] outline-none  rounded-md font-bold `}
          />
        </div>
        <div className=' w-[300px] p-2'>
          <p className=' py-2'>Gender (Optional)</p>
          <select
            value={obj["gender"]}
            onChange={e => {
              change("gender", e.target.value);
            }}
            className={`${
              mode === "dark"
                ? " text-white bg-gray-700 border-zinc-600 focus:border-zinc-400"
                : "text-black border-indigo-400 focus:border-indigo-600 "
            } w-full outline-none border p-[8px] rounded-md font-bold  `}>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
        <div className=' w-[300px] p-2'>
          <p className=' py-2'>Date of Birth (Optional)</p>
          <input
            value={obj["birth"]}
            onChange={e => {
              change("birth", e.target.value);
            }}
            type='date'
            className={`${
              mode === "dark"
                ? " text-white bg-gray-700 border-zinc-600 focus:border-zinc-400"
                : "text-black border-indigo-400 focus:border-indigo-600 "
            } border  p-[8px] outline-none  rounded-md font-bold  w-full`}
          />
        </div>
        <div className=' w-[300px] p-2'>
          <p className=' py-2'>Marital Status (Optional)</p>

          <select
            value={obj["married"]}
            onChange={e => {
              change("married", e.target.value);
            }}
            className={` ${
              mode === "dark"
                ? " text-white bg-gray-700 border-zinc-600 focus:border-zinc-400"
                : "text-black border-indigo-400 focus:border-indigo-600 "
            } w-full outline-none border  p-[8px] rounded-md font-bold  `}>
            <option>Single</option>
            <option>Married</option>
          </select>
        </div>
        <div className=' w-[300px] p-2'>
          <p className=' py-2'>Profession</p>
          <input
            value={obj["profession"]}
            onChange={e => {
              change("profession", e.target.value);
            }}
            type='text'
            className={`${
              mode === "dark"
                ? " text-white bg-gray-700 border-zinc-600 focus:border-zinc-400"
                : "text-black border-indigo-400 focus:border-indigo-600 "
            } border  p-[8px] outline-none  rounded-md font-bold `}
          />
        </div>
        <div className=' w-[300px] p-2'>
          <p className=' py-2'>Street Address</p>
          <input
            value={obj["address"]}
            onChange={e => {
              change("address", e.target.value);
            }}
            type='text'
            className={`${
              mode === "dark"
                ? " text-white bg-gray-700 border-zinc-600 focus:border-zinc-400"
                : "text-black border-indigo-400 focus:border-indigo-600 "
            } border  p-[8px] outline-none  rounded-md font-bold `}
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
            className={`${
              mode === "dark"
                ? " text-white bg-gray-700 border-zinc-600 focus:border-zinc-400"
                : "text-black border-indigo-400 focus:border-indigo-600 "
            } border  p-[8px] outline-none  rounded-md font-bold `}
          />
        </div>
        <div className=' w-[300px] p-2'>
          <p className=' py-2'>State/Province</p>
          <input
            value={obj["state"]}
            onChange={e => {
              change("state", e.target.value);
            }}
            type='text'
            className={`${
              mode === "dark"
                ? " text-white bg-gray-700 border-zinc-600 focus:border-zinc-400"
                : "text-black border-indigo-400 focus:border-indigo-600 "
            } border  p-[8px] outline-none  rounded-md font-bold `}
          />
        </div>
        <div className=' w-[300px] p-2'>
          <p className=' py-2'>Nationality (Optional)</p>
          <input
            value={obj["nationality"]}
            onChange={e => {
              change("nationality", e.target.value);
            }}
            type='text'
            className={`${
              mode === "dark"
                ? " text-white bg-gray-700 border-zinc-600 focus:border-zinc-400"
                : "text-black border-indigo-400 focus:border-indigo-600 "
            } border  p-[8px] outline-none  rounded-md font-bold `}
          />
        </div>
        <div className=' w-[300px] p-2'>
          <p className=' py-2'>Phone</p>
          <input
            value={obj["phone"]}
            onChange={e => {
              change("phone", e.target.value);
            }}
            type='number'
            className={`${
              mode === "dark"
                ? " text-white bg-gray-700 border-zinc-600 focus:border-zinc-400"
                : "text-black border-indigo-400 focus:border-indigo-600 "
            } border  p-[8px] outline-none  rounded-md font-bold `}
          />
        </div>
        <div className=' w-[300px] p-2'>
          <p className=' py-2'>Email</p>
          <input
            value={obj["email"]}
            onChange={e => {
              change("email", e.target.value);
            }}
            type='email'
            className={`${
              mode === "dark"
                ? " text-white bg-gray-700 border-zinc-600 focus:border-zinc-400"
                : "text-black border-indigo-400 focus:border-indigo-600 "
            } border  p-[8px] outline-none  rounded-md font-bold `}
          />
        </div>
      </div>
      <div className=' flex   justify-evenly md:justify-normal flex-row-reverse p-3'>
        <div className=' text-xs md:w-[300px] md:text-base p-2'>
          <button
            onClick={() => {
              scrollLeft(2);
              pageno(2);
            }}
            className={`${
              mode === "dark" ? " bg-slate-400 text-gray-500" : "bg-rose-300"
            }  flex  py-1 px-2 items-center justify-center gap-1 rounded-sm`}>
            NEXT
            <TbPlayerTrackNextFilled />
          </button>
        </div>
        <div className=' text-xs md:text-base md:w-[300px] p-2'>
          {load ? (
            <div
              className={`${
                mode === "dark" ? " bg-slate-400 text-gray-500" : "bg-rose-300"
              } w-[100px] flex justify-center items-center  h-[50px] rounded-md`}>
              {" "}
              <Load />
            </div>
          ) : select instanceof Array &&
            select.length > 0 &&
            select[0]["profile"] ? (
            <button
              onClick={updateProfile}
              className={`${
                mode === "dark" ? " bg-slate-400 text-gray-500" : "bg-rose-300"
              } text-xs md:text-base   flex  py-1 px-2 items-center justify-center gap-1 rounded-sm `}>
              <FaSave />
              UPDATE
            </button>
          ) : (
            <button
              onClick={submit}
              className=' bg-rose-300 flex  py-1 px-2 items-center justify-center gap-1 rounded-sm'>
              <FaSave />
              SAVE
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
