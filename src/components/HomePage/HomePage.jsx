import React, { useState, useEffect } from "react";
import HeadCategory from "../HeaderCategory/HeadCategory";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Navbar from "../../Navbar/Navbar";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [book, setBook] = useState([]);
  const [BookData, setBookData] = useState([]);

  // how to import data from firebase
  const query = collection(db, "PopularSection/Container/BookPopular");
  const [loading] = useCollectionData(query);

  const getData = async () => {
    const valRef = collection(db, "HomePage");
    const dataDb = await getDocs(valRef);
    const allData = dataDb.docs.map((val) => ({ ...val.data(), id: val.id }));
    setData(allData);
  };
  useEffect(() => {
    getData();

    if (!book) {
      console.log("No user defined");
    } else {
      const getBooks = async () => {
        const contain = collection(db, "PopularSection");
        const snapshot = await getDocs(contain);
        const data = snapshot.docs.map((val) => ({
          ...val.data(),
          id: val.id,
        }));
        setBook(data);

        data.map(async (elem) => {
          const BookPop = collection(db, `PopularSection/${elem.id}/BookPopular`);
          const DataBooks = await getDocs(BookPop);
          const BookData = DataBooks.docs.map((val) => ({
            ...val.data(),
            id: val.id,
          }));

          setBookData(BookData);
        });
      };
      getBooks();
    }
  });

  return (
    <>
      <Navbar />
      {loading && "loading..."}
      {/* Banner */}
      <section>
        <main className="w-screen">
          <div className="">
            <Swiper pagination={{ clickable: true }} modules={[Pagination]} className="min-h-fit">
              <div className="Banner">
                {data.map((data) => (
                  <SwiperSlide className=" justify-center shadow-lg flex items-center h-100% ">
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

      <div className="my-0.25 ">
        <HeadCategory />
      </div>
      <section>
        <div className="Header mt-3">
          <button>
            {book.map((data) => (
              <div className="mt-10 text-3xl px-10 uppercase font-bold flex">{data.container}</div>
            ))}
          </button>
        </div>

        <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination]}
          slidesPerView={3}
          spaceBetween={5}
          className="min-h-fit"
        >
          {BookData.map((data) => (
            <div className="">
              <SwiperSlide>
                <div className="items-center justify-center grid mt-5">
                  <button
                    key={Math.random()}
                    className="flex-col items-center bg-gray-400 rounded-xl xs:rounded:md xs:w-[150px] sm:w-[150px] md:w-[250px] lg:w-[400px] "
                  >
                    <p>{data.decs}</p>
                    {data.title}
                    < img
                      src={data.ImageBook}
                      width={150}
                      height={150}
                      className="px-2 py-10 sm:w-[250px] lg:w-[350px] xs:w-[100px]"
                      onClick={this}
                    />
                  </button>
                </div>
              </SwiperSlide>
            </div>
          ))}
        </Swiper>
        <div>{book && <div></div>}</div>
      </section>
    </>
  );
};

export default HomePage;
