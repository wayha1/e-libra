import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";


const BodyHomepage = ({visible}) => {

  const [Book, setBook] = useState([]);
  const [BookData, setBookData] = useState([]);

  document.querySelectorAll(".button").forEach((button) =>
    button.addEventListener("click", (e) => {
      if (!button.classList.contains("loading")) {
        button.classList.add("loading");

        setTimeout(() => button.classList.remove("loading"), 3700);
      }
      e.preventDefault();
    })
  );

 
  useEffect(() => {
    if (!Book) {
    } else {
      const getBooks = async () => {
        try {
          const contain = collection(db, "PopularSection");
          const snapshot = await getDocs(contain);
          const data = snapshot.docs.map((val) => ({ ...val.data(), id: val.id }));
          setBook(data);
          const bookDataPromises = data.map(async (elem) => {
            try {
              const BookPop = collection(db, `PopularSection/${elem.id}/BookPopular`);
              const DataBooks = await getDocs(BookPop);
              const BookData = DataBooks.docs.map((val) => ({
                ...val.data(),
                id: val.id,
              }));
              return BookData;
            } catch (error) {
              console.error(`Error fetching book data for ${elem.id}:`, error);
              return null; // or some default value
            }
          });

          const bookData = await Promise.all(bookDataPromises);
          setBookData(bookData.flat()); // flatten the array
        } catch (error) {
          console.error("Error fetching popular section data:", error);
        }
      };
      getBooks();
    }
  }, []);

  

  return (
    <main>
      <Swiper slidesPerView={3} spaceBetween={10} className="min-h-fit">
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
                  <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                    {data.decs}
                  </a>
                  <p class="mt-2 text-slate-500 ">{data.title}</p>
                  <div className="flex mt-10 mx-auto">
                    <button class="button">
                      Add to cart
                        <svg viewBox="0 0 36 26">
                          <polyline points="1 2.5 6 2.5 10 18.5 25.5 18.5 28.5 7.5 7.5 7.5"></polyline>
                          <polyline points="15 13.5 17 15.5 22 10.5"></polyline>
                        </svg>
                    </button>

                    <button className="border-solid border-2 border-indigo-600 rounded-full shadow-lg bg-blue-300">
                      Read now
                    </button>
                    <button className="border-solid border-2 border-indigo-600 rounded-full shadow-lg bg-blue-300">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
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
            </div>
            {/* <div class="card rounded-lg shadow-lg overflow-hidden mt-4 ml-4 bg-gray-300">
              <a href="" class="">
                <img
                  src={data.ImageBook}
                  alt="Book That Popular"
                  className="lg:h-48 lg:w-full lg:object-cover md:h-full md:w-48 bg-cover bg-center block fit"
                  onClick={this}
                />{" "}
              </a>
              <div class="py-3 px-4 border-b border-dark-soft flex items-center justify-between">
                <a href="" class="text-lg text-grey-darker no-underline">
                  Starting with React Native
                </a>

                <a href="" class="text-grey-darker">
                  <div data-icon="ei-link" data-size="s" class="text-dark"></div>
                </a>
              </div>

              <div class="flex text-base text-grey-darker">
                <div class="py-2 px-4 border-r border-dark-soft flex items-center">
                  <div data-icon="ei-cart" data-size="s" class="text-dark mr-2"></div>
                  <span>$ 20.00</span>
                </div>

                <div class="py-2 px-4 flex items-center justify-end mr-auto">
                  <div data-icon="ei-like" data-size="s" class="text-dark mr-2"></div>
                  <span>20</span>
                </div>
              </div>
            </div> */}

            {/* <iframe src={data.PdfBook} width={100} height={100} /> */}
          </SwiperSlide>
        ))}
      </Swiper>

   

    </main>
  );
};

export default BodyHomepage;
