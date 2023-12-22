import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineDoubleRight } from "react-icons/ai";

const HeadCategory = () => {
  const [cate, setNav] = useState(true);
  const handleNav = () => {
    setNav(!cate);
  };

  return (
    <section>
      <div className="flex w-[100%] bg-gray-200 py-2">
        <div className="flex w-[100%] hover:duration-200 max-lg:hidden justify-evenly book-style">
          {/* desktop mode */}
          <div className="uppercase">
            <ul className="flex hover:text-gray-300 flex hover:shadow-xl =">
              <Link
                to={"/allgen"}
                className="border-2 border-[#AAACA6] whitespace-nowrap bg-white rounded-xl shadow-xl px-1 py-1 text-gray-500 font-bold lg:text-3xl hover:text-cyan-700 "
              >
                <h1 className="xl:text-2xl lg:text-xl">មាតិកាទាំងអស់</h1>
              </Link>
            </ul>
          </div>
          <div className="flex jusify-center items-center">
            <ul className="space-x-4 w-fit items-center ">
              <Link
                to={"/allgen/bacII"}
                className="border-2 border-[#AAACA6] text-xl px-1 py-1 hover:scale-110 rounded-xl hover:text-cyan-700 whitespace-nowrap text-gray-500 font-bold bg-white shadow-md"
              >
                បាក់ឌុប
              </Link>
              <Link
                to={"/allgen/comdy"}
                className="border-2 border-[#AAACA6] text-xl px-1 py-1 hover:scale-110 rounded-xl hover:text-cyan-700 whitespace-nowrap text-gray-500 font-bold bg-white shadow-md"
              >
                កំប្លែង
              </Link>
              <Link
                to={"/allgen/comic"}
                className="border-2 border-[#AAACA6] text-xl px-1 py-1 hover:scale-110 rounded-xl hover:text-cyan-700 whitespace-nowrap text-gray-500 font-bold bg-white shadow-md"
              >
                គំនូរជិវចល
              </Link>
              <Link
                to={"/allgen/novel"}
                className="border-2 border-[#AAACA6] text-xl px-1 py-1 hover:scale-110 rounded-xl hover:text-cyan-700 whitespace-nowrap text-gray-500 font-bold bg-white shadow-md"
              >
                ប្រលោមលោក
              </Link>
              <Link
                to={"/allgen/study"}
                className="border-2 border-[#AAACA6] text-xl px-1 py-1 hover:scale-110 rounded-xl hover:text-cyan-700 whitespace-nowrap text-gray-500 font-bold bg-white shadow-md"
              >
                ចំណេះដឹងទូទៅ
              </Link>
            </ul>
          </div>
        </div>

        {/* Mobile Mode */}

        <div className="flex md:w-full max-sm:w-100% h-fit lg:hidden ">
          <div onClick={handleNav} className="md:block lg:hidden relative m-2 items-center flex">
            {cate ? (
              <AiOutlineDoubleRight size={30} className="relative items-center " />
            ) : (
              <AiOutlineClose size={30} className="relative items-center" />
            )}
          </div>
          <div
            className={
              cate
                ? "fixed left-[100%] "
                : "fixed left-[5%] md:flex whitespace-nowrap duration-300 relative \
                md:w-[80%] md:justify-between sm:w-[80%] max-sm:w-[80%]"
            }
          >
            <ul className="flex font-bold lg:hidden max-sm:w-fit ">
              <Link to={"/allgen"} className="text-2xl hover:text-cyan-800 text-gray-500 ">
                មាតិកាទាំងអស់ &nbsp;
              </Link>
            </ul>
            <ul className="mt-1 space-x-3 max-sm:w-fit max-sm:flex max-sm:flex-wrap relative">
              <Link
                to={"/allgen/bacII"}
                className="sm:text-sm md:text-md sm:text-sm xs:text-sm rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"
              >
                បាក់ឌុប
              </Link>
              <Link
                to={"/allgen/comdy"}
                className=" md:text-md sm:text-sm xs:text-sm  hover:shadow-full hover:scale-110 rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"
              >
                កំប្លែង
              </Link>
              <Link
                to={"/allgen/comic"}
                className=" md:text-md sm:text-sm xs:text-sm hover:shadow-full hover:scale-110 rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"
              >
                គំនូរជិវចល
              </Link>
              <Link
                to={"/allgen/novel"}
                className=" md:text-md sm:text-sm xs:text-sm hover:shadow-full hover:scale-110 rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"
              >
                ប្រលោមលោក
              </Link>
              <Link
                to={"/allgen/study"}
                className=" md:text-md sm:text-sm xs:text-sm hover:shadow-full hover:scale-110 rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"
              >
                ចំណេះដឹងទូទៅ
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeadCategory;
