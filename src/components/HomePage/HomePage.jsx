import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { txtDB } from "../../firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [header, setHeader] = useState([]);

  // how to import data from firebase
  const getData = async () => {
    const valRef = collection(txtDB, `HomePage`);
    const dataDb = await getDocs(valRef);
    // const listing = [];
    // dataDb.forEach((val) => listing.push({ id: val.id, data: val.data() }));
    const allData = dataDb.docs.map((val) => ({ ...val.data(), id: val.id }));
    setData(allData);
  };
  const getHeader = async () => {
    const header = await getDocs(collection(txtDB, "Header"));
    const allHeader = header.docs.map((val) => ({ ...val.data() }));
    setHeader(allHeader);
  };

  useEffect(() => {
    getData();
    getHeader();
  }, []);

  console.log(data, "datadata");
  console.log(header, "header");

  return (
    <>
    {/* Banner */}
      <section>
        <main>
          <div className="">
            <Swiper pagination={{ clickable: true}} modules={[Pagination]} className="min-h-fit">
              <div className="Banner">
                      {data.map((data) => (
                  <SwiperSlide className=" justify-center shadow-lg flex items-center h-100%">
                   
                      <div className="absolute ">
                        <h1 className="text-4xl relative font-bold">{data.title}</h1>
                        <span className="relative">{data.decs} </span>
                      </div>
                      <img
                        src={data.ImageBanner}
                        className="bg-center "
                        alt="Banner"
                        onClick={this}
                        height="100%"
                        width="100%"
                        />
                    
                  </SwiperSlide>
                        ))}
              </div>
            </Swiper>
          </div>
          
        </main>
      </section>

      <section>
      <div className="Header">
            {header.map((header) => (
              <span key={header.id} className="mt-10 text-2xl px-10 uppercase font-bold ">
                {header.container}
              </span>
            ))}
          </div>
          <div></div>
      </section>
    </>
  );
};

export default HomePage;
