import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { AiOutlineClose, AiOutlineDoubleRight } from "react-icons/ai";

const HeadCategory = () => {
  const [cate, setNav] = useState(true);
  const handleNav = () => {
    setNav(!cate);
  };

  const [head, setHead] = useState([]);
  const getHead = async () => {
    const head = await getDocs(collection(db, "HeadCategory"));
    const allHead = head.docs.map((val) => ({ ...val.data(), id: val.id }));
    setHead(allHead);
  };
  useEffect(() => {
    getHead();
  }, []);

  return (
    <section>
      <div className="bg-white w-100% h-full lg:px-5 lg:space-y-3 max-sm:w-100% lg:hover:bg-gray-100 lg:items-cennter lg:justify-center">
        {head.map((link, index) => {
          return (
            <div className="flex justify-center items-center hover:scale-125 hover:duration-300" key={index}>
              {/* desktop mode */}
              <ul className="flex hover:text-gray-300 max-lg:hidden">
                <Link
                  to={link.Url}
                  className="hover:duration-200 hover:underline hover:text-cyan-800 whitespace-nowrap text-gray-500"
                >
                  {link.headCategory && (
                    <h1 className="mt-2 xl:text-4xl lg:text-3xl md:text-2xl sm:text-md xs:text-md font-bold ">
                      {link.headCategory}
                    </h1>
                  )}
                  <div className="my-3 xl:text-xl lg:text-xl md:text-md sm:text-sm xs:text-sm font-medium font-sans line-clamp-6 grid-cols-6 ">
                    {link.header && <a className="text-center lg:flex">{link.header}</a>}
                  </div>
                </Link>
              </ul>
            </div>
          );
        })}

        {/* Mobile Mode */}

        <div className="flex md:w-full max-sm:w-100% h-fit lg:hidden ">
          <div onClick={handleNav} className="md:block lg:hidden relative m-2 items-center flex">
            {cate ? (
              <AiOutlineDoubleRight size={30} className="relative items-center" />
            ) : (
              <AiOutlineClose size={30} className="relative items-center " />
            )}
          </div>
          <div
            className={
              cate
                ? "fixed left-[100%]"
                : "fixed left-[5%] md:flex whitespace-nowrap duration-200 relative \
                md:w-100% md:justify-between sm:w-fit max-sm:w-fit"
            }
          >
            <ul className="flex font-bold lg:hidden max-sm:w-fit text-center">
              <Link to={"/allGen"} className="text-2xl hover:underline hover:text-cyan-800 text-gray-500 ">
                All Category &nbsp;
              </Link>
            </ul>
            <ul className="text- mt-1 space-x-3 max-sm:w-fit max-sm:flex max-sm:flex-wrap relative">
              <Link
                to={"/bacII"}
                className="sm:text-sm md:text-md sm:text-sm xs:text-sm rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"
              >
                BacII Exam
              </Link>
              <Link
                to={"/comdy"}
                className=" md:text-md sm:text-sm xs:text-sm  hover:shadow-full hover:scale-110 rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"
              >
                Comdy
              </Link>
              <Link
                to={"/comic"}
                className=" md:text-md sm:text-sm xs:text-sm hover:shadow-full hover:scale-110 rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"
              >
                Comic Books
              </Link>
              <Link
                to={"/novel"}
                className=" md:text-md sm:text-sm xs:text-sm hover:shadow-full hover:scale-110 rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"
              >
                Novel Books
              </Link>
              <Link
                to={"/study"}
                className=" md:text-md sm:text-sm xs:text-sm hover:shadow-full hover:scale-110 rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"
              >
                Learning Book
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeadCategory;
