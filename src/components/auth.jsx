"use client";
import { FaFacebookF } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import Load from "./load";
import { error, success } from "@/utility/toast";
import { useRouter } from "next/navigation";
export default function Auth() {
  const regisRef = useRef();
  const loginRef = useRef();
  const mainRef = useRef();
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const router=useRouter()
  const [resObj, setResObj] = useState({
    name: "",
    email: "",
    password: "",
    confrim: "",
  });
  const [logObj, setLogObj] = useState({
    email: "",
    password: "",
  });
  async function login() {
    setLoading1(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(logObj),
      headers: { "content-type": "application/json" },
    });
    const data = await res.json();
    if (data["status"] === "success") {
      success('login success')
      router.push("/")
    } else {
      error("login fail")
    }
    setLoading1(false);
  }
  async function registration() {
    setLoading2(true);
    const res = await fetch("/api/auth/registration", {
      method: "POST",
      body: JSON.stringify(resObj),
      headers: { "content-type": "application/json" },
    });
    const data = await res.json();
    if (data["status"] === "success") {
      success("data create successfull")
      router.push('/')
    } else {
      error('data create fail')
    }
    setLoading2(false);
  }
  function changeRes(name, value) {
    setResObj((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  }
  function changeLog(name, value) {
    setLogObj((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  }

  useEffect(() => {
    mainRef.current.style.height = `${loginRef.current.clientHeight + 70}px`;
    loginRef.current.classList.replace("scale-0", "scale-1");
    mainRef.current.childNodes.forEach((item, i) => {
      item.style.left = `${mainRef.current.clientWidth * i}px`;
    });
  }, []);
  function scrollElement(i) {
    if(loading1 || loading2){
      return;
    }
    mainRef.current.scrollLeft = `${mainRef.current.clientWidth * i}`;
    if (i === 0) {
      mainRef.current.style.height = `${loginRef.current.clientHeight + 70}px`;
    } else {
      mainRef.current.style.height = `${regisRef.current.clientHeight + 70}px`;
    }
  }
  return (
    <div className=" rounded-md mx-auto md:mt-[10%] p-2 flex flex-col gap-2 md:flex-row w-[310px]  md:w-[620px] bg-red-200 ">
      <div className="w-full p-2 md:w-1/2 bg-white shadow-md shadow-gray-200 rounded-md">
        <div className="flex gap-2 w-full justify-center items-center  ">
          <img
            className=" object-cover w-[80px] h-[80px] rounded-full "
            src="/cv.webp"
          />
          <p className=" font-black  text-2xl">Create Your CV</p>
        </div>
        <div className=" text-balance px-4 py-2 mx-auto  italic  flex justify-center items-center font-bold w-full">
          Unlock your career potential with our intuitive CV creation web app.
          Craft polished resumes effortlessly, stand out from the crowd, and
          land your dream job with ease. Your journey to success starts here.
        </div>
        <div className=" w-[80%] flex flex-col gap-2 mx-auto">
          <Link href="#" className=" w-full rounded-md">
            <div className="  w-full rounded-md bg-green-600 flex justify-center items-center p-2 gap-2 text-white">
              <FaFacebookF />
              <p>Contact With Facebook</p>
            </div>
          </Link>
          <Link href="#" className=" w-full rounded-md">
            <div className=" w-full rounded-md  bg-cyan-500 flex justify-center items-center p-2 gap-2 text-white">
              <FaWhatsapp />
              <p>Contact With Whatsapp</p>
            </div>
          </Link>
          <Link href="#" className=" w-full rounded-md">
            <div className=" w-full rounded-md   bg-rose-400 flex justify-center items-center p-2 gap-2 text-white">
              <TfiEmail />
              <p>Contact With Email</p>
            </div>
          </Link>
        </div>
      </div>
      <div
        ref={mainRef}
        className=" shadow-md shadow-gray-400 overflow-hidden mx-auto flex relative w-full md:w-1/2 bg-gray-300  blur-0 rounded-md"
      >
        <div
          ref={loginRef}
          className=" transition-all scale-0 absolute top-2 w-full flex gap-3 justify-center items-center flex-col  "
        >
          <p className=" w-full text-center text-2xl font-black">Login</p>
          <input
            value={logObj["email"]}
            onChange={(e) => {
              changeLog("email", e.target.value);
            }}
            className="  placeholder:text-black placeholder:font-thin outline-none border rounded-md font-bold text-black focus:border focus:border-emerald-500 px-2 p-2 w-11/12 bg-purple-100"
            placeholder="Enter Email"
            type="email"
          />
          <input
            value={logObj["password"]}
            onChange={(e) => {
              changeLog("password", e.target.value);
            }}
            className="  placeholder:text-black placeholder:font-thin outline-none border rounded-md font-bold text-black focus:border focus:border-emerald-500 px-2 p-2 w-11/12 bg-purple-100"
            placeholder="Enter Password"
            type="password"
          />
          <div className="flex w-full justify-evenly">
            <p className=" font-bold ">Forgot Password?</p>
            <p
              onClick={() => {
                scrollElement(1);
              }}
              className=" font-bold underline cursor-pointer"
            >
              Sign Up
            </p>
          </div>
          {loading1 ? (
            <div className=" w-3/4 flex justify-center items-center bg-cyan-600 rounded-md h-[50px]">
              <Load />
            </div>
          ) : (
            <button
              onClick={login}
              className=" w-3/4  bg-cyan-300 py-1 rounded-md font-black px-2"
            >
              Sign In
            </button>
          )}
        </div>
        <div
          ref={regisRef}
          className=" absolute    top-2 left-0 w-full flex gap-3 justify-center items-center flex-col "
        >
          <p className=" w-full text-center text-2xl font-black">
            Registration
          </p>
          <input
            value={resObj["name"]}
            onChange={(e) => {
              changeRes("name", e.target.value);
            }}
            className="  placeholder:text-white placeholder:font-thin outline-none border rounded-md font-bold text-white focus:border focus:border-emerald-500 px-2 p-2 w-11/12 bg-gray-400"
            placeholder="Enter Name"
            type="text"
          />
          <input
            value={resObj["email"]}
            onChange={(e) => {
              changeRes("email", e.target.value);
            }}
            className="  placeholder:text-white placeholder:font-thin outline-none border rounded-md font-bold text-white focus:border focus:border-emerald-500 px-2 p-2 w-11/12 bg-gray-400"
            type="email"
            placeholder="Email Address"
          />
          <input
            value={resObj["password"]}
            onChange={(e) => {
              changeRes("password", e.target.value);
            }}
            className="  placeholder:text-white placeholder:font-thin outline-none border rounded-md font-bold text-white focus:border focus:border-emerald-500 px-2 p-2 w-11/12 bg-gray-400"
            placeholder="Password"
            type="password"
          />
          <input
            value={resObj["confrim"]}
            onChange={(e) => {
              changeRes("confrim", e.target.value);
            }}
            className="  placeholder:text-white placeholder:font-thin outline-none border rounded-md font-bold text-white focus:border focus:border-emerald-500 px-2 p-2 w-11/12 bg-gray-400"
            type="password"
            placeholder="Confrim Password"
          />

          {loading2 ? (
            <div className=" w-3/4 flex justify-center items-center bg-cyan-600 rounded-md h-[50px]">
              <Load />
            </div>
          ) : (
            <button onClick={registration} className=" w-3/4  bg-cyan-300 py-1 rounded-md font-bold px-2">
             Registartion
            </button>
          )}
          <div className=" font-bold text-sm ">
            Allready Have An Account?
            <span
              onClick={() => {
                scrollElement(0);
              }}
              className=" underline cursor-pointer"
            >
              Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
