import React, { useState, useEffect } from "react";
import HeadCategory from "./HeadCategory";
import BodyHomepage from "./BodyHomepage";
import LoadingPage from "../LoadingPage";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [Banner, setBanner] = useState([]);
  const [Promotion, setPromotion] = useState([]);
  const [isBannerHovered, setIsBannerHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getBanner = async () => {
    try {
      const Banner = collection(db, "HomePage");
      const dataBanner = await getDocs(Banner);
      const allBanner = dataBanner.docs.map((val) => ({ ...val.data(), id: val.id }));
      setBanner(allBanner);

      const promotionDataPromises = allBanner.map(async (elem) => {
        try {
          const BookPop = collection(db, `HomePage/${elem.id}/BodyPromo`);
          const DataBooks = await getDocs(BookPop);
          const BookData = DataBooks.docs.map((bookDoc) => ({
            ...bookDoc.data(),
            id: bookDoc.id,
          }));
          return BookData;
        } catch (error) {
          console.error(`Error fetching book data for ${elem.id}:`, error);
          return null;
        }
      });

      const bookData = await Promise.all(promotionDataPromises);
      setPromotion(bookData.flat());
    } catch (error) {
      console.error("Error fetching banner data:", error);
    } finally {
      setIsLoading(false); // Set loading to false when data fetching is complete
    }
  };
  useEffect(() => {
    getBanner();
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          {/* Banner */}
          <section id="Banner ">
            <main className="z-10 flex w-full h-[900px] bg-gray-100">
              {/* desktop mode */}
              {Banner.map((data, i) => (
                <div
                  key={i}
                  className="flex relative items-center justify-center w-[100%]"
                  onMouseEnter={() => setIsBannerHovered(true)}
                  onMouseLeave={() => setIsBannerHovered(false)}
                  onTouchStart={() => setIsBannerHovered(true)}
                  onTouchEnd={() => setIsBannerHovered(false)}
                >
                  <div
                    className={`absolute backdrop-blur-sm max-sm:px-2 max-sm:py-2 ${
                      isBannerHovered ? "opacity-150" : "opacity-0"
                    } transition-opacity duration-300 h-full w-[80%]`}
                  >
                    <div className="flex max-lg:px-5 max-md:px-5 items-center mt-[40%]">
                      <div className="text-cyan-600 text-center bg-shadow-sm px-5">
                        {data.title && (
                          <h1 className="mt-10 font-bold uppercase lg:text-6xl md:text-5xl sm:text-3xl xs:text=2xl 2xs:text-4xl">
                            {data.title}
                          </h1>
                        )}
                        {data.decs && <h2 className="lg:text-xl max-lg:text-xs ">{data.decs}</h2>}
                      </div>
                    </div>
                    <button className="m-2 h-12 w-18 px-4 py-2 bg-cyan-600 rounded-md lg:translate-y-52 md:translate-y-52 max-md:translate-y-52 max-sm:translate-y-52">
                      <h1 className="whitespace-nowrap text-gray-200 text-md">
                        <Link to={"/allgen"}>All Category</Link>
                      </h1>
                    </button>
                  </div>
                  {data.ImageBanner && (
                    <img
                      src={data.ImageBanner}
                      className="w-[80%] lg:h-[600px] max-md:h-[600px] max-sm:h-[500px]"
                      alt=""
                    />
                  )}
                </div>
              ))}
            </main>
            <HeadCategory />
          </section>

          <section id="body-header">
            <div className="Header">
              <BodyHomepage className="z-30" />
            </div>
          </section>

          <section id="body-popular">
            <div className="my-2">
              {Promotion.map((data, i) => (
                <div key={i} className="bg-rose-100 w-full h-[350px] flex">
                  <div className="text-left w-[50%] backdrop-blur-sm">
                    {data.title && (
                      <h1 className="lg:text-6xl md:text-3xl sm:text-2xl max-sm:text-2xl  font-mono font-bold text-end mt-20 text-gray-500 hover:text-cyan-700">
                        {data.title}
                      </h1>
                    )}
                    {data.decs && (
                      <h2 className="lg:text-xl max-sm:text-md mt-2 font-mono font-bold text-center text-gray-700 font-sans hover:text-cyan-800 hover:duration-200">
                        {data.decs}
                      </h2>
                    )}
                  </div>

                  <div className="flex w-[50%] items-center justify-center p-4">
                    <img
                      src={data.imagePromo}
                      className="flex w-[90%] h-[100%] max-sm:w-[80%] max-sm:h-[60%] hover:scale-105 duration-200 bg-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* <BodyHomepage className="z-30" />
          <BodyHomepage className="z-30" />
          <BodyHomepage className="z-30" /> */}
        </>
      )}
    </>
  );
};

export default HomePage;
