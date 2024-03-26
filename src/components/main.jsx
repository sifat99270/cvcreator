"use client";
import { FaBarsStaggered } from "react-icons/fa6";
import { AiFillProfile } from "react-icons/ai";
import { MdOutlineWork } from "react-icons/md";
import { FaFile } from "react-icons/fa";
import { GiSkills } from "react-icons/gi";
import { MdOutlineSummarize } from "react-icons/md";
import { FaMedal } from "react-icons/fa6";
import CV from "./cvtem";
import Profile from "./profile";
import Experience from "./experience";
import Education from "./education";
import Summary from "./summary";
import { useEffect, useRef, useState } from "react";
import Skills from "./skills";
import Hobbies from "./hobbies";
import Reference from "./reference";
import { FaUser } from "react-icons/fa6";
import { error, success } from "@/utility/toast";
import { alldata } from "./store/allstore";
import Load from "./load";
import { IoSettings } from "react-icons/io5";
import { BsGear } from "react-icons/bs";
import { FaXmark } from "react-icons/fa6"; 
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation";
export default function Main({ data }) {
  const allRef = useRef();
  const [manageScroll, setManageScroll] = useState(0);
  const [color, setColor] = useState(0);
  const [select, setSelect] = useState(false);
  const dontDisturb = useRef();
  const [load, setLoad] = useState(false);
  const [bgColor, setBgColor] = useState(null);
  const settingRef=useRef();
 const [sett,setSett]=useState(false);
 const bgBoxRef=useRef();
 const router=useRouter();
 const [logLoad,setLogLoad]=useState(false);
 const { addToCvData, cvdata } = alldata((state) => {
  return { addToCvData: state.addToCvData, cvdata: state.cvdata };
});
  function setting(){
    if(sett){
      setSett(false)
    }else{
      setSett(true)
    }
  }
  useEffect(()=>{
    if(sett){
      settingRef.current.classList.replace("-right-[250px]","-right-[0px]")
    }else{
      settingRef.current.classList.replace("-right-[0px]","-right-[250px]") 
    }
  },[sett])
  function resizeFun() {
    allRef.current.scrollLeft = allRef.current.clientWidth * manageScroll;
  }
  useEffect(() => {
    addToCvData(data);
  }, []);
  useEffect(()=>{
    window.addEventListener("resize", resizeFun);
    return () => {
      window.removeEventListener("resize", resizeFun);
    };
  },[])
 
  function scrollProfile(i) {
    allRef.current.scrollLeft = allRef.current.clientWidth * i;
    setColor(i);
  }
  function scrollLeft(i) {
    dontDisturb.current.style.pointerEvents = "none";
    if (!select) {
      error("please select an item");
      dontDisturb.current.style.pointerEvents = "auto";
      return;
    }
    allRef.current.scrollLeft = allRef.current.clientWidth * i;
    setColor(i);
    dontDisturb.current.style.pointerEvents = "auto";
  }
function bgBox(e){
bgBoxRef.current.childNodes.forEach((item)=>{
if(item.classList.contains("scale-50")){
  item.classList.replace("scale-50","scale-100")
}
})
e.target.classList.add("scale-50")
setSett(false)
}
async function logout(){
  setLogLoad(true)
  const res=await fetch('/api/all/logout',{method:"POST"});
  const data=await res.json();
  if(data['status']==='success'){
    success("logout success");
    router.push('/auth')
  }else{
    error("logout fail")
  }
  setLogLoad(false)
}
  return (
    <div
      ref={dontDisturb}
      className={` overflow-hidden relative w-full h-screen ${!bgColor ?'bg-teal-300':`${bgColor}`} flex-row flex`}
    >
      <div className=" fixed top-0 z-50 md:hidden  w-full">
        <div className=" w-full flex justify-center items-center bg-white ">
          <div className=" ml-4">
            <p className=" font-bold">CV MAKER</p>
          </div>
          <div
            onClick={() => {
              setManageScroll(0);
              scrollLeft(0);
              allRef.current.scrollTop=0;
            }}
            className={`${
              color === 0 ? "text-emerald-500" : null
            } ml-auto w-[75px] h-[60px]   flex justify-center items-center text-2xl   hover:cursor-pointer hover:text-emerald-500 transition-all`}
          >
            <FaBarsStaggered />
          </div>
        </div>
        <hr className="  bg-gray-200 w-full h-[1px]" />

        <div className=" flex justify-between">
          <div style={{"--i":1}}
            onClick={() => {
              setManageScroll(1);
              scrollLeft(1);
              allRef.current.scrollTop=0;
            }}
            className={`${
              color === 1 ? "text-emerald-500" : null
            } cal w-[14%px] h-[60px] bg-white flex flex-col justify-center items-center text-2xl  p-2 hover:cursor-pointer hover:text-emerald-500 transition-all`}
          >
            <AiFillProfile />
            <p style={{ fontSize: "10px" }} className=" text-xs font-bold p-1">
              profile
            </p>
          </div>
          <hr className="  w-[1px] h-[60px] bg-red-200" />
          <div
            onClick={() => {
              setManageScroll(2);
              scrollLeft(2);
              allRef.current.scrollTop=0;
            }}
            className={`${
              color === 2 ? "text-emerald-500" : null
            } w-[14%] h-[60px] bg-white flex flex-col justify-center items-center text-2xl  p-2 hover:cursor-pointer hover:text-emerald-500 transition-all`}
          >
            <MdOutlineWork />
            <p style={{ fontSize: "8px" }} className=" text-xs font-bold p-1">
              experience
            </p>
          </div>
          <hr className="  w-[1px] h-[60px] bg-red-200" />
          <div
            onClick={() => {
              setManageScroll(3);
              scrollLeft(3);
              allRef.current.scrollTop=0;
            }}
            className={`${
              color === 3 ? "text-emerald-500" : null
            } w-[14%] h-[60px] bg-white flex flex-col justify-center items-center text-2xl  p-2 hover:cursor-pointer hover:text-emerald-500 transition-all`}
          >
            <FaFile />

            <p style={{ fontSize: "8px" }} className=" text-xs font-bold p-1">
              education
            </p>
          </div>
          <hr className=" w-[1px] h-[60px] bg-red-200" />
          <div
            onClick={() => {
              setManageScroll(4);
              scrollLeft(4);
              allRef.current.scrollTop=0;
            }}
            className={`${
              color === 4 ? "text-emerald-500" : null
            } w-[14%] h-[60px] bg-white flex flex-col justify-center items-center text-2xl p-2 hover:cursor-pointer hover:text-emerald-500 transition-all`}
          >
            <GiSkills />
            <p style={{ fontSize: "10px" }} className=" text-xs font-bold p-1">
              skills
            </p>
          </div>
          <hr className="  w-[1px] h-[60px] bg-red-200" />
          <div
            onClick={() => {
              setManageScroll(5);
              scrollLeft(5);
              allRef.current.scrollTop=0;
            }}
            className={`${
              color === 5 ? "text-emerald-500" : null
            } w-[14%] h-[60px] bg-white flex flex-col justify-center items-center text-2xl p-2 hover:cursor-pointer hover:text-emerald-500 transition-all`}
          >
            <MdOutlineSummarize />
            <p style={{ fontSize: "10px" }} className=" text-xs font-bold p-1">
              summary
            </p>
          </div>
          <hr className="  w-[1px] h-[60px] bg-red-200" />
          <div
            onClick={() => {
              setManageScroll(6);
              scrollLeft(6);
              allRef.current.scrollTop=0;
            }}
            className={`${
              color === 6 ? "text-emerald-500" : null
            } w-[14%] h-[60px] bg-white flex flex-col justify-center items-center text-2xl  p-2 hover:cursor-pointer hover:text-emerald-500 transition-all`}
          >
            <FaMedal />
            <p style={{ fontSize: "10px" }} className=" text-xs font-bold p-1">
              hobbies
            </p>
          </div>
          <hr className=" w-[1px] h-[60px] bg-red-200" />
          <div
            onClick={() => {
              setManageScroll(7);
              scrollLeft(7);
              allRef.current.scrollTop=0;
            }}
            className={`${
              color === 7 ? "text-emerald-500" : null
            } w-[14%] h-[60px] bg-white flex flex-col justify-center items-center text-2xl  p-2 hover:cursor-pointer hover:text-emerald-500 transition-all`}
          >
            <FaUser />
            <p style={{ fontSize: "10px" }} className=" text-xs font-bold p-1">
              Reference
            </p>
          </div>
          <hr className=" w-[1px] h-[60px] bg-red-200" />
        </div>
      </div>

      <div className=" w-[75px] mt-10 ml-10 p-2 hidden md:block ">
        <div
          onClick={() => {
            setManageScroll(0);
            scrollLeft(0);
          }}
          className={`${
            color === 0 ? "text-emerald-500" : null
          } w-[75px] h-[75px] bg-white mb-3 flex justify-center items-center text-2xl rounded-sm p-2 hover:cursor-pointer hover:text-emerald-500 transition-all `}
        >
          <FaBarsStaggered />
        </div>
        <div
          onClick={() => {
            setManageScroll(1);
            scrollLeft(1);
          }}
          className={`${
            color === 1 ? "text-emerald-500" : null
          } w-[75px] h-[80px] bg-white flex flex-col justify-center items-center text-2xl rounded-sm p-2 hover:cursor-pointer hover:text-emerald-500 transition-all`}
        >
          <AiFillProfile />
          <p className=" text-xs font-bold p-1">profile</p>
        </div>
        <hr className=" w-[75px]" />
        <div
          onClick={() => {
            setManageScroll(2);
            scrollLeft(2);
          }}
          className={`${
            color === 2 ? "text-emerald-500" : null
          } w-[75px] h-[80px] bg-white flex flex-col justify-center items-center text-2xl rounded-sm p-2 hover:cursor-pointer hover:text-emerald-500 transition-all`}
        >
          <MdOutlineWork />
          <p className=" text-xs font-bold p-1">experience</p>
        </div>
        <hr className=" w-[75px]" />
        <div
          onClick={() => {
            setManageScroll(3);
            scrollLeft(3);
          }}
          className={`${
            color === 3 ? "text-emerald-500" : null
          } w-[75px] h-[80px] bg-white flex flex-col justify-center items-center text-2xl rounded-sm p-2 hover:cursor-pointer hover:text-emerald-500 transition-all`}
        >
          <FaFile />
          <p className=" text-xs font-bold p-1">education</p>
        </div>
        <hr className=" w-[75px]" />
        <div
          onClick={() => {
            setManageScroll(4);
            scrollLeft(4);
          }}
          className={`${
            color === 4 ? "text-emerald-500" : null
          } w-[75px] h-[80px] bg-white flex flex-col justify-center items-center text-2xl rounded-sm p-2 hover:cursor-pointer hover:text-emerald-500 transition-all`}
        >
          <GiSkills />
          <p className=" text-xs font-bold p-1">skills</p>
        </div>
        <hr className=" w-[75px]" />
        <div
          onClick={() => {
            setManageScroll(5);
            scrollLeft(5);
          }}
          className={`${
            color === 5 ? "text-emerald-500" : null
          } w-[75px] h-[75px] bg-white flex flex-col justify-center items-center text-2xl rounded-sm p-2 hover:cursor-pointer hover:text-emerald-500 transition-all`}
        >
          <MdOutlineSummarize />
          <p className=" text-xs font-bold p-1">summary</p>
        </div>
        <hr className=" w-[75px]" />
        <div
          onClick={() => {
            setManageScroll(6);
            scrollLeft(6);
          }}
          className={`${
            color === 6 ? "text-emerald-500" : null
          } w-[75px] h-[75px] bg-white flex flex-col justify-center items-center text-2xl rounded-sm p-2 hover:cursor-pointer hover:text-emerald-500 transition-all`}
        >
          <FaMedal />
          <p className=" text-xs font-bold p-1">hobbies</p>
        </div>
        <hr className=" w-[75px]" />
        <div
          onClick={() => {
            setManageScroll(7);
            scrollLeft(7);
          }}
          className={`${
            color === 7 ? "text-emerald-500" : null
          } w-[75px] h-[75px] bg-white flex flex-col justify-center items-center text-2xl rounded-sm p-2 hover:cursor-pointer hover:text-emerald-500 transition-all`}
        >
          <FaUser />
          <p className=" text-xs font-bold p-1">Reference</p>
        </div>
        <hr className=" w-[75px]" />
      </div>
      <div
        ref={allRef}
        className=" transition-all  bg-white  mt-2 md:mt-10  md:ml-4 relative h-screen  md:h-[85vh] top-[120px] md:top-[0px] left-0 overflow-x-hidden  rounded-md w-full md:w-[85%]"
      >
        {load ? <Load /> : null}
        <div style={{"--i":0}} className=" cal  absolute left-0  top-0   w-full  ">
          <CV pageno={setManageScroll} setSelect={setSelect} scrollLeft={scrollProfile} all={cvdata} />
        </div>
        <div  style={{"--i":1}}  className=" cal absolute   top-0 w-full  bg-white ">
          <Profile pageno={setManageScroll} scrollLeft={scrollLeft} />
        </div>
        <div style={{"--i":2}} className=" cal absolute  top-0   w-full bg-white ">
          <Experience
            index={select ? select[1] : null}
            pageno={setManageScroll}
            scrollLeft={scrollLeft}
          />
        </div>
        <div style={{"--i":3}} className="cal absolute  top-0   w-full bg-white ">
          <Education pageno={setManageScroll} scrollLeft={scrollLeft} />
        </div>
        <div style={{"--i":4}} className=" cal absolute  top-0   w-full bg-white ">
          <Skills pageno={setManageScroll} scrollleft={scrollLeft} />
        </div>
        <div style={{"--i":5}} className=" cal absolute  top-0   w-full bg-white">
          <Summary pageno={setManageScroll} scrollleft={scrollLeft} />
        </div>
        <div style={{"--i":6}} className=" cal absolute  top-0   w-full bg-white">
          <Hobbies pageno={setManageScroll} scrollLeft={scrollLeft} />
        </div>
        <div style={{"--i":7}} className=" cal absolute top-0  w-full bg-white ">
          <Reference pageno={setManageScroll} scrollLeft={scrollLeft} />
        </div>
      </div>
      <div  ref={settingRef} className=" transition-all  absolute   -right-[250px] top-[40%] w-[300px]  flex">
        <div onClick={setting} className="  shadow-md shadow-slate-500 rounded-sm  flex justify-center items-center text-2xl w-[50px] h-[50px] bg-white rounded-l-md cursor-pointer">
         {sett?<FaXmark className="animate-spin" />: <IoSettings className="animate-spin" />}
        </div>

        <div className=" w-[250px] bg-white shadow-md shadow-slate-500 rounded-sm p-2">
          <p className=" font-black p-2 text-center">SELECT DEMO: </p>
          <div className=" flex justify-evenly ">
            <img
              className=" cursor-pointer rounded-sm w-[45%]  h-[70px] object-cover"
              src="/cvtem.jpg"
            />
            <img
              className="cursor-pointer rounded-sm w-[45%]  h-[70px] object-cover"
              src="/cvtem.jpg"
            />
          </div>
          <div className="p-2">
            <p className="  text-center p-2 font-black">COLOR SWITCHER </p>
            <div ref={bgBoxRef} className=" flex gap-1 p-2 w-full justify-evenly items-center">
            <div
                onClick={(e) => {
                  setBgColor("bg-teal-300");
                  bgBox(e)
                }}
                className={`scale-50 cursor-pointer w-[30px] h-[30px] bg-teal-300`}
              ></div>
               <div
                onClick={(e) => {
                  setBgColor("bg-slate-200");
                  bgBox(e)
                }}
                className={` cursor-pointer w-[30px] h-[30px] bg-slate-200`}
              ></div>
              <div
                onClick={(e) => {
                  setBgColor("bg-pink-500");
                  bgBox(e)
                }}
                className=" cursor-pointer w-[30px] h-[30px] bg-pink-500"
              ></div>
             
              <div onClick={(e) => {
                  setBgColor("bg-cyan-500");
                  bgBox(e)
                }} className=" cursor-pointer w-[30px] h-[30px] bg-cyan-500"></div>
              <div  onClick={(e) => {
                  setBgColor("bg-violet-500");
                  bgBox(e)
                }}  className=" cursor-pointer w-[30px] h-[30px] bg-violet-500"></div>
              <div   onClick={(e) => {
                  setBgColor("bg-rose-500");
                  bgBox(e)
                }}  className=" cursor-pointer w-[30px] h-[30px]  bg-rose-500"></div>
              <div  onClick={(e) => {
                  setBgColor("bg-purple-500");
                  bgBox(e)
                }} className=" cursor-pointer w-[30px] h-[30px] bg-purple-500"></div>
            </div>
          </div>
          <div>
            <div>
              <p className="p-2 text-3xl"><CgProfile/></p>
              {logLoad?<Load/>:<div onClick={logout} className=" cursor-pointer font-bold text-center mx-auto rounded-md shadow-lg shadow-gray-300 p-2 bg-slate-300 w-11/12">LOG OUT</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
