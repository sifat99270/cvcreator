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
  const settingRef = useRef();
  const [sett, setSett] = useState(false);
  const bgBoxRef = useRef();
  const router = useRouter();
  const [logLoad, setLogLoad] = useState(false);
  const themeRef = useRef();
  const settIngImgRef = useRef();
  function theme() {
    if (themeRef.current.classList.contains("active")) {
      themeRef.current.classList.remove("active");
      setMode("light");
    } else {
      themeRef.current.classList.add("active");
      setMode("dark");
    }
  }
  const { addToCvData, cvdata, setMode, mode, setSelectCv } = alldata(state => {
    return {
      addToCvData: state.addToCvData,
      cvdata: state.cvdata,
      setMode: state.setMode,
      mode: state.mode,
      setSelectCv: state.setSelectCv,
    };
  });
  function setting() {
    if (sett) {
      setSett(false);
    } else {
      setSett(true);
    }
  }

  function resizeFun() {
    if (select) {
      allRef.current.childNodes.forEach(item => {
        item.style.minWidth = `${allRef.current.clientWidth}px`;
      });
      allRef.current.scrollLeft = allRef.current.clientWidth * manageScroll;
    } else {
      return;
    }
  }
  // useEffect(() => {
  // //   async function getData() {
  // //     const respon = await fetch(`/api/all/alldata`, {
  // //       method: "POST",
  // //       headers: { "content-type": "application/json" },
  // //       cache: "no-store",
  // //     });
  // //     const data = await respon.json();
  // //     if (data["status"] === "success") {
  // //       addToCvData(data["data"]);
  // //     } else {
  // //       return addToCvData([]);
  // //     }
  // //   }
  // //   getData();
  // // }, []);
  useEffect(() => {
    if (sett) {
      settingRef.current.classList.replace("-right-[250px]", "-right-[0px]");
    } else {
      settingRef.current.classList.replace("-right-[0px]", "-right-[250px]");
    }
  }, [sett]);

  useEffect(() => {
    addToCvData(data);
  }, []);
  useEffect(() => {
    window.addEventListener("resize", resizeFun);
    return () => {
      window.removeEventListener("resize", resizeFun);
    };
  });

  function scrollProfile(i) {
    allRef.current.scrollLeft = allRef.current.clientWidth * i;
    setColor(i);
  }
  function scrollLeft(i) {
    // dontDisturb.current.style.pointerEvents = "none";
    if (!select) {
      error("please select an item");
      dontDisturb.current.style.pointerEvents = "auto";
      return;
    }
    allRef.current.childNodes.forEach((item, index) => {
      
      item.style.minWidth = `${allRef.current.clientWidth}px`;
      if(i===index){
        allRef.current.style.minHeight=`${item['childNodes'][0].clientHeight}px` 
      }
    });
    allRef.current.scrollLeft = allRef.current.clientWidth * i;

    allRef.current.scrollTop = 0;
    setColor(i);
    // dontDisturb.current.style.pointerEvents = "auto";
  }

  function bgBox(e) {
    bgBoxRef.current.childNodes.forEach(item => {
      if (item.classList.contains("scale-50")) {
        item.classList.replace("scale-50", "scale-100");
      }
    });
    e.target.classList.add("scale-50");
    setSett(false);
  }
  async function logout() {
    setLogLoad(true);
    const res = await fetch("/api/all/logout", { method: "POST" });
    const data = await res.json();
    if (data["status"] === "success") {
      success("logout success");
      router.push("/auth");
    } else {
      error("logout fail");
    }
    setLogLoad(false);
  }
  function settingImgScale(e, i) {
    settIngImgRef.current.childNodes.forEach(item => {
      if (item.classList.contains("scale-50")) {
        item.classList.replace("scale-50", "scale-100");
      }
    });
    if (e.target.classList.contains("scale-100")) {
      e.target.classList.replace("scale-100", "scale-50");
    } else if (e.target.classList.contains("scale-50")) {
      return;
    } else {
      e.target.classList.add("scale-50");
    }

    setSelectCv(i);
  }
  return (
    <div
      ref={dontDisturb}
      className={` overflow-x-hidden  relative w-full  ${
        mode === "dark"
          ? " bg-zinc-700"
          : !bgColor
          ? "bg-teal-300"
          : `${bgColor}`
      }
      } flex-row flex`}>
      <div
        className={` ${
          mode === "dark" ? " bg-slate-600 text-white" : "bg-white"
        }  fixed top-0 z-50 md:hidden  w-full `}>
        <div className=' w-[100%]  flex justify-center items-center  '>
          <div className=' ml-4'>
            <p className=' font-bold'>CV MAKER</p>
          </div>
          <div
            onClick={() => {
              setManageScroll(0);
              scrollLeft(0);
              allRef.current.scrollTop = 0;
            }}
            className={`${
              color === 0 ? "text-emerald-500" : null
            }   w-[75px] h-[60px]  ${
              mode === "dark" ? " bg-slate-600 text-white " : "bg-white"
            }   flex justify-center items-center text-2xl   hover:cursor-pointer hover:text-emerald-500 transition-all`}>
            <FaBarsStaggered />
          </div>
        </div>
        <hr className='  bg-gray-200 w-full h-[1px]' />

        <div
          className={`${
            mode === "dark" ? " text-white" : " text-black"
          } flex justify-between`}>
          <div
          
            onClick={() => {
              allRef.current.scrollTop = 0;
              setManageScroll(1);
              scrollLeft(1);
             
            }}
            className={`${
              color === 1 ? "text-emerald-500" : null
            }  w-[14%] h-[60px]  ${
              mode === "dark" ? " bg-slate-600 " : "bg-white"
            }  flex flex-col justify-center items-center text-2xl  p-2 hover:cursor-pointer hover:text-emerald-500 transition-all`}>
            <AiFillProfile />
            <p style={{ fontSize: "8px" }} className=' text-xs font-bold p-1'>
              profile
            </p>
          </div>
          <hr className='  w-[1px] h-[60px] bg-red-200' />
          <div
            onClick={() => {
              allRef.current.scrollTop = 0;
              setManageScroll(2);
              scrollLeft(2);
              
            }}
            className={`${
              color === 2 ? "text-emerald-500" : null
            } w-[14%] h-[60px]  ${
              mode === "dark" ? " bg-slate-600 " : "bg-white"
            }  flex flex-col justify-center items-center text-2xl  p-2 hover:cursor-pointer hover:text-emerald-500 transition-all`}>
            <MdOutlineWork />
            <p style={{ fontSize: "8px" }} className=' text-xs font-bold p-1'>
              experience
            </p>
          </div>
          <hr className='  w-[1px] h-[60px] bg-red-200' />
          <div
            onClick={() => {
              allRef.current.scrollTop = 0;
              setManageScroll(3);
              scrollLeft(3);
            
            }}
            className={`${
              color === 3 ? "text-emerald-500" : null
            } w-[14%] h-[60px]  ${
              mode === "dark" ? " bg-slate-600 " : "bg-white"
            }  flex flex-col justify-center items-center text-2xl  p-2 hover:cursor-pointer hover:text-emerald-500 transition-all`}>
            <FaFile />

            <p style={{ fontSize: "8px" }} className=' text-xs font-bold p-1'>
              education
            </p>
          </div>
          <hr className=' w-[1px] h-[60px] bg-red-200' />
          <div
            onClick={() => {
              allRef.current.scrollTop = 0;
              setManageScroll(4);
              scrollLeft(4);
           
            }}
            className={`${
              color === 4 ? "text-emerald-500" : null
            } w-[14%] h-[60px]  ${
              mode === "dark" ? " bg-slate-600 " : "bg-white"
            }  flex flex-col justify-center items-center text-2xl p-2 hover:cursor-pointer hover:text-emerald-500 transition-all`}>
            <GiSkills />
            <p style={{ fontSize: "8px" }} className=' text-xs font-bold p-1'>
              skills
            </p>
          </div>
          <hr className='  w-[1px] h-[60px] bg-red-200' />
          <div
            onClick={() => {
              allRef.current.scrollTop = 0;
              setManageScroll(5);
              scrollLeft(5);
            
            }}
            className={`${
              color === 5 ? "text-emerald-500" : null
            } w-[14%] h-[60px]  ${
              mode === "dark" ? " bg-slate-600 " : "bg-white"
            }  flex flex-col justify-center items-center text-2xl p-2 hover:cursor-pointer hover:text-emerald-500 transition-all`}>
            <MdOutlineSummarize />
            <p style={{ fontSize: "8px" }} className=' text-xs font-bold p-1'>
              summary
            </p>
          </div>
          <hr className='  w-[1px] h-[60px] bg-red-200' />
          <div
            onClick={() => {
              allRef.current.scrollTop = 0;
              setManageScroll(6);
              scrollLeft(6);
         
            }}
            className={`${
              color === 6 ? "text-emerald-500" : null
            } w-[14%] h-[60px]  ${
              mode === "dark" ? " bg-slate-600 " : "bg-white"
            }  flex flex-col justify-center items-center text-2xl  p-2 hover:cursor-pointer hover:text-emerald-500 transition-all`}>
            <FaMedal />
            <p style={{ fontSize: "8px" }} className=' text-xs font-bold p-1'>
              hobbies
            </p>
          </div>
          <hr className=' w-[1px] h-[60px] bg-red-200' />
          <div
            onClick={() => {
              allRef.current.scrollTop = 0;
              setManageScroll(7);
              scrollLeft(7);
            
            }}
            className={`${
              color === 7 ? "text-emerald-500" : null
            } w-[14%] h-[60px]  ${
              mode === "dark" ? " bg-slate-600 " : "bg-white"
            }  flex flex-col justify-center items-center text-2xl  p-2 hover:cursor-pointer hover:text-emerald-500 transition-all`}>
            <FaUser />
            <p style={{ fontSize: "8px" }} className=' text-xs font-bold p-1'>
              Reference
            </p>
          </div>
          <hr className=' w-[1px] h-[60px] bg-red-200' />
        </div>
      </div>

      <div className=' w-[75px] mt-10 ml-10 p-2 hidden md:block '>
        <div
          onClick={() => {
            setManageScroll(0);
            scrollLeft(0);
          }}
          className={`${
            color === 0 ? "text-emerald-500" : null
          } w-[75px] h-[75px] ${
            mode === "dark" ? " bg-slate-600 " : "bg-white"
          }  mb-3 flex justify-center items-center text-2xl rounded-sm p-2 hover:cursor-pointer hover:text-emerald-500 transition-all `}>
          <FaBarsStaggered />
        </div>
        <div
          onClick={() => {
            setManageScroll(1);
            scrollLeft(1);
          }}
          className={`${
            color === 1 ? "text-emerald-500" : null
          } w-[75px] h-[80px]  ${
            mode === "dark" ? " bg-slate-600 " : "bg-white"
          } flex flex-col justify-center items-center text-2xl rounded-sm p-2 hover:cursor-pointer hover:text-emerald-500 transition-all`}>
          <AiFillProfile />
          <p className=' text-xs font-bold p-1'>profile</p>
        </div>
        <hr className=' w-[75px]' />
        <div
          onClick={() => {
            setManageScroll(2);
            scrollLeft(2);
          }}
          className={`${
            color === 2 ? "text-emerald-500" : null
          } w-[75px] h-[80px]  ${
            mode === "dark" ? " bg-slate-600 " : "bg-white"
          } flex flex-col justify-center items-center text-2xl rounded-sm p-2 hover:cursor-pointer hover:text-emerald-500 transition-all`}>
          <MdOutlineWork />
          <p className=' text-xs font-bold p-1'>experience</p>
        </div>
        <hr className=' w-[75px]' />
        <div
          onClick={() => {
            setManageScroll(3);
            scrollLeft(3);
          }}
          className={`${
            color === 3 ? "text-emerald-500" : null
          } w-[75px] h-[80px]  ${
            mode === "dark" ? " bg-slate-600  " : "bg-white"
          } flex flex-col justify-center items-center text-2xl rounded-sm p-2 hover:cursor-pointer hover:text-emerald-500 transition-all`}>
          <FaFile />
          <p className=' text-xs font-bold p-1'>education</p>
        </div>
        <hr className=' w-[75px]' />
        <div
          onClick={() => {
            setManageScroll(4);
            scrollLeft(4);
          }}
          className={`${
            color === 4 ? "text-emerald-500" : null
          } w-[75px] h-[80px]  ${
            mode === "dark" ? " bg-slate-600 " : "bg-white"
          } flex flex-col justify-center items-center text-2xl rounded-sm p-2 hover:cursor-pointer hover:text-emerald-500 transition-all`}>
          <GiSkills />
          <p className=' text-xs font-bold p-1'>skills</p>
        </div>
        <hr className=' w-[75px]' />
        <div
          onClick={() => {
            setManageScroll(5);
            scrollLeft(5);
          }}
          className={`${
            color === 5 ? "text-emerald-500" : null
          } w-[75px] h-[75px]  ${
            mode === "dark" ? " bg-slate-600 " : "bg-white"
          } flex flex-col justify-center items-center text-2xl rounded-sm p-2 hover:cursor-pointer hover:text-emerald-500 transition-all`}>
          <MdOutlineSummarize />
          <p className=' text-xs font-bold p-1'>summary</p>
        </div>
        <hr className=' w-[75px]' />
        <div
          onClick={() => {
            setManageScroll(6);
            scrollLeft(6);
          }}
          className={`${
            color === 6 ? "text-emerald-500" : null
          } w-[75px] h-[75px]  ${
            mode === "dark" ? " bg-slate-600 " : "bg-white"
          } flex flex-col justify-center items-center text-2xl rounded-sm p-2 hover:cursor-pointer hover:text-emerald-500 transition-all`}>
          <FaMedal />
          <p className=' text-xs font-bold p-1'>hobbies</p>
        </div>
        <hr className=' w-[75px]' />
        <div
          onClick={() => {
            setManageScroll(7);
            scrollLeft(7);
          }}
          className={`${
            color === 7 ? "text-emerald-500" : null
          } w-[75px] h-[75px]  ${
            mode === "dark" ? " bg-slate-600 " : "bg-white"
          } flex flex-col justify-center items-center text-2xl rounded-sm p-2 hover:cursor-pointer hover:text-emerald-500 transition-all`}>
          <FaUser />
          <p className=' text-xs font-bold p-1'>Reference</p>
        </div>
        <hr className=' w-[75px]' />
      </div>
      <div
        ref={allRef}
        className={`${
          mode === "dark" ? " bg-gray-900" : " bg-white"
        } flex    transition-all    mt-2 md:mt-10  md:ml-4 relative  top-[120px] md:top-[0px] left-0 overflow-x-hidden  rounded-md w-full md:w-[85%]`}>
        {load ? <Load /> : null}
        <div className='  min-w-[100%]  '>
          <CV
            pageno={setManageScroll}
            setSelect={setSelect}
            scrollLeft={scrollProfile}
            all={cvdata}
          />
        </div>
        <div className='  min-w-[100%]     '>
          <Profile pageno={setManageScroll} scrollLeft={scrollLeft} />
        </div>
        <div className=' min-w-[100%]   '>
          <Experience
            index={select ? select[1] : null}
            pageno={setManageScroll}
            scrollLeft={scrollLeft}
          />
        </div>
        <div className=' min-w-[100%]   '>
          <Education pageno={setManageScroll} scrollLeft={scrollLeft} />
        </div>
        <div className='  min-w-[100%]   '>
          <Skills pageno={setManageScroll} scrollleft={scrollLeft} />
        </div>
        <div className='  min-w-[100%]   '>
          <Summary pageno={setManageScroll} scrollleft={scrollLeft} />
        </div>
        <div className=' min-w-[100%]  '>
          <Hobbies pageno={setManageScroll} scrollLeft={scrollLeft} />
        </div>
        <div className='  min-w-[100%]   '>
          <Reference pageno={setManageScroll} scrollLeft={scrollLeft} />
        </div>
      </div>
      <div
        ref={settingRef}
        className=' pointer-events-none transition-all    fixed top-0 z-50  -right-[250px] md:top-[180px] w-[300px]  flex'>
        <div
          onClick={setting}
          className={`${
            mode === "dark"
              ? " bg-slate-900 shadow-gray-600 text-white"
              : "shadow-slate-500 bg-white"
          }  pointer-events-auto shadow-md  rounded-sm  flex justify-center items-center text-2xl w-[50px] h-[50px]  rounded-l-md cursor-pointer`}>
          {sett ? (
            <FaXmark className='animate-spin' />
          ) : (
            <IoSettings className='animate-spin' />
          )}
        </div>

        <div
          className={`${
            mode === "dark"
              ? "bg-slate-900 shadow-gray-600"
              : "bg-white shadow-slate-500"
          } w-[250px] shadow-md  pointer-events-auto  rounded-sm p-2`}>
          <p
            className={`${
              mode === "dark" ? " text-white" : "text-black"
            } font-black  p-2 text-center`}>
            SELECT DEMO:{" "}
          </p>
          <div ref={settIngImgRef} className=' flex justify-evenly '>
            <img
              onClick={e => {
                settingImgScale(e, 1);
              }}
              className=' scale-50 cursor-pointer rounded-sm w-[45%]  shadow-md shadow-gray-600  object-cover'
              src='/jspdf2.png'
            />
            <img
              onClick={e => {
                settingImgScale(e, 2);
              }}
              className=' cursor-pointer rounded-sm w-[45%]  shadow-md shadow-gray-600  object-cover'
              src='/cvtem.jpg'
            />
          </div>
          <div className='p-2'>
            <p
              className={`${
                mode === "dark" ? " text-white" : " text-black"
              } text-center p-2 font-black`}>
              COLOR SWITCHER{" "}
            </p>
            <div
              ref={bgBoxRef}
              className=' flex gap-1 p-2 w-full justify-evenly items-center'>
              <div
                onClick={e => {
                  setBgColor("bg-teal-300");
                  bgBox(e);
                }}
                className={`scale-50 cursor-pointer w-[30px] h-[30px] bg-teal-300`}></div>
              <div
                onClick={e => {
                  setBgColor("bg-slate-200");
                  bgBox(e);
                }}
                className={` cursor-pointer w-[30px] h-[30px] bg-slate-200`}></div>
              <div
                onClick={e => {
                  setBgColor("bg-pink-500");
                  bgBox(e);
                }}
                className=' cursor-pointer w-[30px] h-[30px] bg-pink-500'></div>

              <div
                onClick={e => {
                  setBgColor("bg-cyan-500");
                  bgBox(e);
                }}
                className=' cursor-pointer w-[30px] h-[30px] bg-cyan-500'></div>
              <div
                onClick={e => {
                  setBgColor("bg-violet-500");
                  bgBox(e);
                }}
                className=' cursor-pointer w-[30px] h-[30px] bg-violet-500'></div>
              <div
                onClick={e => {
                  setBgColor("bg-rose-500");
                  bgBox(e);
                }}
                className=' cursor-pointer w-[30px] h-[30px]  bg-rose-500'></div>
              <div
                onClick={e => {
                  setBgColor("bg-purple-500");
                  bgBox(e);
                }}
                className=' cursor-pointer w-[30px] h-[30px] bg-purple-500'></div>
            </div>
          </div>
          <div ref={themeRef} className=' w-full p-2 parentShadow'>
            <p
              className={`${
                mode === "dark" ? " text-white" : " text-black"
              } font-bold p-2`}>
              CHANGE THEME
            </p>
            <div className='  shadow  w-[70px] h-[30px] rounded-full  relative flex justify-center items-center'>
              <i
                onClick={theme}
                className='   absolute w-[25px] h-[25px] rounded-full childShadow  '></i>
            </div>
          </div>
          <div>
            <div>
              <p className={` ${mode==="dark"?"text-white":"text-black"} p-2 text-3xl`}>
                <CgProfile />
              </p>
              {logLoad ? (
                <Load />
              ) : (
                <div
                  onClick={logout}
                  className={`${
                    mode === "dark"
                      ? " bg-slate-700 shadow-gray-500 text-white"
                      : "bg-slate-300 shadow-gray-300 "
                  } cursor-pointer font-bold text-center mx-auto rounded-md shadow-lg  p-2  w-11/12`}>
                  LOG OUT
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
