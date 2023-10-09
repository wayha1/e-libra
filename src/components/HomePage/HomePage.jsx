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
  const slides = Array.from({ length: 1000 }).map((el, index) => `Slide ${index + 1}`);

  console.log(data, "datadata");
  console.log(header, "header");

  return (
    <>
    {/* Banner */}
      <section>
        <main>
          <div>
            <Swiper
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              <div className="Banner">
                {data.map((data, index) => (
                  <div className="bg-white-to-r from-gray-800 bg-cover bg-center w-full h-50% justify-center shadow-lg h-50%">
                    <SwiperSlide className="flex justify-center items-center">
                      <div className=" absolute backdrop-saturate-50 bg-white/30">
                        <h1 className="text-4xl relative font-bold">{data.title}</h1>
                        <span className="relative">{data.decs} </span>
                      </div>
                      <img
                        src={data.ImageBanner}
                        className="bg-center "
                        alt="Banner"
                        onClick={this}
                        height="50%"
                        width="50%"
                      />
                    </SwiperSlide>
                  </div>
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
