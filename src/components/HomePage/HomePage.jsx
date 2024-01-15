import React, { useState, useEffect } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import HeadCategory from "./HeadCategory";
import BodyHomepage from "./BodyHomepage";
import LoadingPage from "../content/LoadingPage/LoadingPage";

const HomePage = () => {
  const [banner, setBanner] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [isBannerHovered, setIsBannerHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate();

  const getBanner = async () => {
    try {
      const bannerCollection = collection(db, "HomePage");
      const bannerSnapshot = await getDocs(bannerCollection);
      const banners = bannerSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setBanner(banners);
    } catch (error) {
      console.error("Error fetching banner data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const genreQueries = ["bacII", "Comics", "Comdy", "GeneralBook", "NovelBook", "KhmerBook"];
      const categoryQueries = genreQueries.map((genre) => query(collection(db, "Books", "All_Genre", genre)));
      const results = await Promise.all(categoryQueries.map((q) => getDocs(q)));
      const categoriesData = results.map((querySnapshot) =>
        querySnapshot.docs.map((doc) => ({ ...doc.data(), category: doc.id }))
      );
      const combinedBooks = categoriesData.flat();
      const sortedBooks = combinedBooks.sort((a, b) => a.title.localeCompare(b.title));
      setAllBooks(sortedBooks);
      console.log(allBooks)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getBanner();
    fetchData();
  }, []);

  const handleReadNowClick = (book) => {
    setSelectedBook(book);
    navigate("/allgen/see-all", { state: { selectedBook: book, allBooks } });
  };

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          {/* Banner */}
          <section id="Banner">
            <main className="z-20 flex w-full h-[900px] max-sm:h-[600px] bg-gray-100">
              {banner.map((data, i) => (
                <div
                  key={i}
                  className="flex relative items-center justify-center w-[100%]"
                  onMouseEnter={() => setIsBannerHovered(true)}
                  onMouseLeave={() => setIsBannerHovered(false)}
                  onTouchStart={() => setIsBannerHovered(true)}
                  onTouchEnd={() => setIsBannerHovered(false)}
                >
                  <div
                    className={`absolute backdrop-blur-sm max-sm:px-2 max-sm:py-2 ${isBannerHovered ? "opacity-300" : "opacity-0"
                      } transition-opacity duration-300 h-full w-[80%]`}
                  >
                    <div className="flex max-lg:px-5 max-md:px-5 items-center mt-[30%]">
                      <div className="text-blue-800 bg-shadow-sm px-5">
                        {data.title && (
                          <h1 className="font-bold uppercase lg:text-6xl md:text-5xl sm:text-3xl xs:text=2xl 2xs:text-4xl">
                            {data.title}
                          </h1>
                        )}
                        {data.decs && <h2 className="lg:text-xl max-lg:text-xs ">{data.decs}</h2>}
                      </div>
                    </div>
                    <button className="m-2 h-12 w-18 px-4 py-2 bg-gray-800 rounded-md lg:translate-y-52 md:translate-y-52 max-md:translate-y-52 max-sm:translate-y-52">
                      <h1 className="whitespace-nowrap text-gray-200 text-md">
                        <Link to="/allgen">ALL CATEGORY</Link>
                      </h1>
                    </button>
                  </div>
                  {data.ImageBanner && (
                    <img
                      src={data.ImageBanner}
                      className="w-[80%] lg:h-[600px] max-md:h-[600px] max-sm:h-[200px] rounded-xl shadow-lg"
                      alt=""
                    />
                  )}
                </div>
              ))}
            </main>
            <HeadCategory />
          </section>

          {/* Body Header */}
          <section id="body-header">
            <div className="Header">
              <BodyHomepage className="z-30" />
            </div>
          </section>

          {/* Lasted Update */}
          <section id="body-popular">
            <div className="px-4 py-1">
              <h1 className="p-5 w-full text-center text-3xl max-sm:text-lg font-bold hover:text-cyan-800 book-style">
                {"Lasted Release"}
              </h1>
              {allBooks.slice(0, 1).map((data, i) => (
                <div key={i} className="bg-rose-100 w-full h-[400px] max-sm:h-[200px] flex ">
                  <div className="w-[50%] text-end items-end flex flex-col mt-10">
                    {data.title && (
                      <h1 className="lg:text-4xl md:text-xl max-sm:text-xl book-style text-gray-700 hover:text-gray-900">
                        {data.title}
                      </h1>
                    )}
                    {data.price && (
                      <h2 className="lg:text-xl max-sm:text-md  book-style  text-green-800 font-sans hover:text-gray-900 hover:duration-200 max-sm:text-sm">
                        {data.price}
                      </h2>
                    )}
                    {data.decs && (
                      <h2 className="max-sm:line-clamp-3 lg:text-xl max-sm:text-sm book-style text-gray-800 font-sans hover:text-gray-900 hover:duration-200 ">
                        {data.decs}
                      </h2>
                    )}
                  </div>
                  <div className="flex w-[50%] items-center justify-center p-10 object-cover">
                    <img
                      src={data.img}
                      className="flex w-[250px] h-[300px] max-sm:w-[200px] max-sm:h-[150px] hover:scale-90 rounded-lg duration-300"
                      onClick={() => handleReadNowClick(data)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default HomePage;
