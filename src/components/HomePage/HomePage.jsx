import React, { useState, useEffect } from "react";
import HeadCategory from "./HeadCategory";
import BodyHomepage from "./BodyHomepage";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";

import Mymodal from "./Mymodal";

const HomePage = () => {
  const [Banner, setBanner] = useState([]);
  const [Book, setBook] = useState([]);
  const [isBannerHovered, setIsBannerHovered] = useState(false);
  // const [BookData, setBookData] = useState([]);
  // const [resume, setResume] = useState(null);
  const [showMymodal, setShowMyModal] = useState(false);

  const getBanner = async () => {
    const Banner = collection(db, "HomePage");
    const dataBanner = await getDocs(Banner);
    const allBanner = dataBanner.docs.map((val) => ({ ...val.data(), id: val.id }));
    setBanner(allBanner);
  };

  useEffect(() => {
    getBanner();
  }, []);

  return (
    <>
      {/* Banner */}
      <section id="Banner">
      <main className="z-10 flex">
          {/* desktop mode */}
          {Banner.map((data, i) => (
            <div
              key={i}
              className="w-full h-full flex items-center justify-center relative"
              onMouseEnter={() => setIsBannerHovered(true)}
              onMouseLeave={() => setIsBannerHovered(false)}
              onTouchStart={() => setIsBannerHovered(true)}
              onTouchEnd={() => setIsBannerHovered(false)}
            >
              <div
                className={`absolute w-full h-[80%] backdrop-blur-sm max-sm:px-2 max-sm:py-2 ${
                  isBannerHovered ? "opacity-100" : "opacity-0"
                } transition-opacity duration-300 items-center `}
              >
                <div className="flex items-center text-left max-lg:px-5 max-md:px-5 text-gray-100 h-full">
                  <div className="m-5 text-white shadow-sm">
                  {data.title && (
                    <h1 className="font-bold uppercase lg:text-6xl md:text-5xl sm:text-3xl xs:text=2xl 2xs:text-4xl">
                      {data.title}
                    </h1>
                  )}
                  {data.decs && <h2 className="font-bold lg:text-xl max-lg:text-xs lg:w-3/4">{data.decs} </h2>}
                  <button className="m-2 box-border h-12 w-18 p-2 bg-cyan-500 hover:bg-cyan-800 rounded-xl lg:translate-y-60 md:translate-y-52 max-sm:translate-y-16">
                    <h1 className="whitespace-nowrap text-gray-300 text-sm font-bold">
                      <Link to={"/allGen"}>
                        All Category
                      </Link>
                    </h1>
                  </button>
                  </div>
                </div>
              </div>
              {data.ImageBanner && (
                <img
                  src={data.ImageBanner}
                  className="object-cover flex lg:h-[900px] w-full max-md:h-[600px] max-sm:h-[500px]"
                  alt=""
                />
              )}
            </div>
          ))}
        </main>

        
          <HeadCategory />
       

      </section>

      <section>
        <div className="Header">
          <button>
            {Book.map((data, i) => (
              <div className="" key={i}>
                {data.container && (
                  <h1 className="text-3xl px-10 uppercase font-bold flex lg:py-3 hover:text-cyan-800">
                    {data.container}
                  </h1>
                )}
              </div>
            ))}
          </button>
        </div>

        <BodyHomepage onClick={() => setShowMyModal(true)} />

        <div className="Header">
          <button>
            {Book.map((data, i) => (
              <div className="" key={i}>
                {data.headCate && (
                  <h1 className="text-3xl px-10 uppercase font-bold flex lg:py-3">{data.headCate}</h1>
                )}
              </div>
            ))}
          </button>
        </div>
        {/* <button onClick={downloadPDF} disabled={!(loader === false)}>
          {loader ? <span>Downloading</span> : <span>Dowloaded</span>}
        </button> */}

        {/* <button
          className="bg-blue-400 bg-opacity-40 btn btn-primary btn-md"
          onClick={() => setShowMyModal(true)}
        >
          {" "}
          Open Modal
        </button>

        <Mymodal className="w-full h-full" visible={showMymodal} onClose={setShowMyModal} resume={resume} />
       */}
      </section>
    </>
  );
};

export default HomePage;
