import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
// import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/scrollbar";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

const BodyHomepage = ({ visible }) => {
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
              const BookData = DataBooks.docs.map((bookDoc) => ({
                ...bookDoc.data(),
                id: bookDoc.id,
                PdfUrl: bookDoc.data().PdfUrl,
              }));
              return BookData;
            } catch (error) {
              console.error(`Error fetching book data for ${elem.id}:`, error);
              return null;
            }
          });

          const bookData = await Promise.all(bookDataPromises);
          setBookData(bookData.flat());
        } catch (error) {
          console.error("Error fetching popular section data:", error);
        }
      };
      getBooks();
    }
  }, []);

  return (
    <main>
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
                  <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                    {data.decs}
                  </a>
                  Display PDF using an iframe
                <iframe src={data.PdfBook} width="100%" height="500px" title="PDF Viewer" />
                  <p class="mt-2 text-slate-500 ">{data.title}</p>
                  <div className="flex mt-10 mx-auto">
                    <button class="button">
                      Add to cart
                      <svg viewBox="0 0 36 26">
                        <polyline points="1 2.5 6 2.5 10 18.5 25.5 18.5 28.5 7.5 7.5 7.5"></polyline>
                        <polyline points="15 13.5 17 15.5 22 10.5"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper> */}
    </main>
  );
};

export default BodyHomepage;
