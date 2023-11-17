import React, { useState, useEffect } from "react";
import HeadCategory from "./HeadCategory";
import BodyHomepage from "./BodyHomepage";
import "./HomePage.css";
import "./Body.css";
import { collection, getDocs } from "firebase/firestore";
import { db, imgDB } from "../../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Mymodal from "./Mymodal";


const HomePage = () => {
  const [Banner, setBanner] = useState([]);
  const [Book, setBook] = useState([]);
  // const [BookData, setBookData] = useState([]);

  const [showMymodal , setShowMyModal] = useState(false)
  const [resume, setResume] = useState(null);

  const [loader, setLaoder] = useState(false);
  const downloadPDF =() => {
    setLaoder(true);
    
  }

  const handleClose = () => setShowMyModal(false);
  // how to import data from firebase
  const getBanner = async () => {
    const Banner = collection(db, "HomePage");
    const dataBanner = await getDocs(Banner);
    const allBanner = dataBanner.docs.map((val) => ({ ...val.data(), id: val.id }));
    setBanner(allBanner);
  };

  useEffect(() => {
    getDownloadURL(ref(imgDB, 'ប្រធានប្រឡងឆមាសលើកទី១.pdf')).then((url) => 
    {
      setResume(url);
      console.log(url)
    })
    getBanner();
    // if (!Book) {
    // } else {
    //   const getBooks = async () => {
    //     try {
    //       const contain = collection(db, "PopularSection");
    //       const snapshot = await getDocs(contain);
    //       const data = snapshot.docs.map((val) => ({ ...val.data(), id: val.id }));
    //       setBook(data);
    //       const bookDataPromises = data.map(async (elem) => {
    //         try {
    //           const BookPop = collection(db, `PopularSection/${elem.id}/BookPopular`);
    //           const DataBooks = await getDocs(BookPop);
    //           const BookData = DataBooks.docs.map((val) => ({
    //             ...val.data(),
    //             id: val.id,
    //           }));
    //           return BookData;
    //         } catch (error) {
    //           console.error(`Error fetching book data for ${elem.id}:`, error);
    //           return null; // or some default value
    //         }
    //       });

    //       const bookData = await Promise.all(bookDataPromises);
    //       setBookData(bookData.flat()); // flatten the array
    //     } catch (error) {
    //       console.error("Error fetching popular section data:", error);
    //     }
    //   };
    //   getBooks();
    // }
  }, []);

  return (
    <>
      {/* Banner */}
      <section>
        <main className="w-screen flex h-fit bg-gray-200 bg-scroll ">
          {/* desktop mode */}
          <div className="flex max-lg:hidden">
            <HeadCategory />
          </div>
          <Swiper
            scrollbar={true}
            navigation={true}
            modules={[Keyboard, Scrollbar, Navigation, Pagination]}
            className="mySwiper "
          >
            <div className="Banner w-fit h-full">
              {Banner.map((data, i) => (
                <SwiperSlide className="justify-center shadow-lg flex items-center z-10" key={i}>
                  <div className="absolute lg:backdrop-blur-sm max-sm:backdrop-blur-sm md:backdrop-blur-md lg:py-10 lg:px-10 max-sm:py-8 max-sm:px-12 text-white">
                    {data.title && (
                      <h1 className="text-4xl relative font-bold max-sm:text-xl">{data.title}</h1>
                    )}
                    {data.decs && <span className="relative max-sm:text-sm">{data.decs} </span>}
                  </div>

                  <img
                    src={data.ImageBanner}
                    className="lg:h-[500px] w-100% object-cover max-sm:h-[300px] sm:h-[400px] "
                    alt="ImageBanner"
                    onClick={this}
                  />
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </main>
        <div className="flex lg:hidden w-screen bg-white shadow-md">
          <HeadCategory />
        </div>
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

        {/* <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div class="md:flex">
            <div class="md:shrink-0"></div>
            <div class="p-8">
              <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                Company retreats
              </div>
              <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                Incredible accommodation for your team
              </a>
              <p class="mt-2 text-slate-500">
                Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine?
                We have a list of places to do just that.
              </p>
            </div>
          </div>
        </div> */}
        <BodyHomepage onClick={() => setShowMyModal(true)}/>
        {/* <Swiper slidesPerView={3} spaceBetween={10} className="min-h-fit">
          {BookData.map((data) => (
            <SwiperSlide>
              <div class="max-w-md mx-auto bg-gray-200 rounded-xl shadow-md overflow-hidden md:max-w-2xl ml-20 ">
                <div class="md:flex">
                  <div class="md:shrink-0">
                    <img
                      src={data.ImageBook}
                      alt="Book That Popular"
                      className="h-48 w-full object-cover md:h-full md:w-48 bg-cover bg-center"
                      onClick={this}
                    />
                  </div>
                  <div class="p-8">
                    <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                      <p>{data.title}</p>
                    </div>
                    <a
                      href="#"
                      class="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
                    >
                      {data.decs}
                    </a>
                    <p class="mt-2 text-slate-500 ">{data.title}</p>
                    <div className="flex mt-10">
                    <button className="border-solid border-2 border-indigo-600 rounded-full shadow-lg bg-blue-300">Read now</button>
                    <button className="border-solid border-2 border-indigo-600 rounded-full shadow-lg bg-blue-300">Add to Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper> */}
          {/* <div className="w-full max-w-[26rem] shadow-lg">
            <button className="flex-col items-center bg-gray-200 rounded-2xl ">
              <img
                src={data.ImageBook}
                className="rounded-2xl sm:w-[250px] lg:w-[300px] lg:h-[300px]"
                onClick={this}
              />
              <span className=" flex items-center justify-between">
                <h1 className="font-medium">{data.decs}</h1>
                <p>{data.title}</p>
              </span>
              <button className="flex">Read now</button>
              <button className="flex">Add to Cart</button>
            </button>
          </div> */}
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
        <button
        onClick={downloadPDF}
        disabled={!(loader === false)} 
        >
        {loader?(
          <span>Downloading</span>
        ):(
          <span>Dowloaded</span>
        )}

        </button>

        <button className="bg-blue-400 bg-opacity-40 btn btn-primary btn-md"
         onClick={() => setShowMyModal(true)} > Open Modal</button>
         
           <Mymodal className="w-full h-full" visible={showMymodal}
            onClose={setShowMyModal} resume={resume} />
      
      </section>
    </>
  );
};

export default HomePage;
