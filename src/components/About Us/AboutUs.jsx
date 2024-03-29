import React, { useEffect, useState } from "react";
import "./Aboutus.css";
import HoverVideoPlayer from "react-hover-video-player";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import LoadingPage from "../content/LoadingPage/LoadingPage";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const [Banner, setBanner] = useState([]);
  const [Container, setContainer] = useState([]);
  const [OurGoal, setGoal] = useState([]);
  const [author, setAuthor] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedDetails, setExpandedDetails] = useState([]);
  const [expandedAuthorDetails, setExpandedAuthorDetails] = useState([]);
  const [visibleAuthors] = useState(6);

  const toggleExpansion = (index) => {
    setExpandedDetails((prevExpandedDetails) => {
      const newExpandedDetails = [...prevExpandedDetails];
      newExpandedDetails[index] = !newExpandedDetails[index];
      return newExpandedDetails;
    });

    setExpandedAuthorDetails((prevExpandedAuthorDetails) => {
      const newExpandedAuthorDetails = [...prevExpandedAuthorDetails];
      newExpandedAuthorDetails[index] = !newExpandedAuthorDetails[index];
      return newExpandedAuthorDetails;
    });
  };
  const handleMouseOver = () => {
    setIsHovering(false);
  };

  const handleMouseOut = () => {
    setIsHovering(true);
  };
  const getAuthor = async () => {
    const Author = collection(db, "Author");
    const authorData = await getDocs(Author);
    const dataAuthor = authorData.docs.map((val) => ({
      ...val.data(),
      id: val.id,
    }));
    setAuthor(dataAuthor);
  };
  const fetchData = async () => {
    try {
      const bannerData = await getDocs(collection(db, "Aboutus"));
      setBanner(bannerData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

      for (const elem of bannerData.docs) {
        const contain = collection(db, `Aboutus/${elem.id}/container`);
        const Containers = await getDocs(contain);
        const ContainerData = Containers.docs.map((val) => ({
          ...val.data(),
          id: val.id,
        }));
        setContainer(ContainerData);

        const OurGoal = collection(db, `Aboutus/${elem.id}/Goal`);
        const Goals = await getDocs(OurGoal);
        const GoalData = Goals.docs.map((val) => ({
          ...val.data(),
          id: val.id,
        }));
        setGoal(GoalData);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // Set loading to false when data fetching is complete
    }
  };
  useEffect(() => {
    setExpandedDetails(Array(author.length).fill(false));
    getAuthor();
    fetchData();
  }, [author.length]);

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        // Navbar
        <main className="w-screen bg-gray-50">
          <section id="banner ">
            {Banner.map((data) => (
              <div
                key={data.id}
                className="flex items-center justify-center relative"
              >
                <div
                  className="aspect-video "
                  onMouseOver={() => setTimeout(() => handleMouseOver(), 500)}
                  onMouseOut={handleMouseOut}
                >
                  {data.ImgBanner && (
                    <HoverVideoPlayer
                      videoSrc={data.ImgBanner}
                      alt="Gif Banner"
                      className="relative z-10 object-cover bg-repeat"
                      overlayTransitionDuration={300}
                      autoPlay={!isHovering}
                      loop={!isHovering}
                      muted
                      width={1000}
                      height={1200}
                      preload="auto"
                    />
                  )}
                </div>
                {isHovering && (
                  <div className="absolute text-gray-500 w-full text-center backdrop-blur-lg z-20 lg:px-10 lg:py-40 max-sm:px-2 max-sm:py-2">
                    <h1 className="font-bold h-full  uppercase lg:text-8xl md:text-6xl sm:text-6xl xs:text=4xl 2xs:text-4xl">
                      {data.txtBanner}
                    </h1>
                    <span className="font-bold lg:text-xl max-lg:text-xs">
                      {data.decs}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </section>

          <section id="Our_Vision">
            {Container.map((data, i) => (
              <div className="flex " key={i}>
                {data.youtubeLink && (
                  <div className="w-full  md:hidden min-lg:hidden lg:hidden xl:hidden ">
                    <iframe
                      title={`UniqueTitle_${i}`}
                      src={data.youtubeLink}
                      alt="youtubeVideo"
                      className="flex max-lg:w-full max-lg:h-[350px] sm:w-full sm:h-[250px] max-sm:w-full max-sm:h-[200px] max-lg:px-10 max-lg:m-2 "
                    />
                  </div>
                )}
              </div>
            ))}
            <div className="flex flex-col w-screen h-auto">
              <div className="w-full justify-between">
                {Container.map((data, i) => (
                  <div
                    key={i}
                    className="lg:py-4 lg:px-10 justify-between flex px-3 "
                  >
                    <div className="md:m-2 sm:m-5 max-sm:m-5 bg-gray-300 rounded-2xl shadow-xl p-2 flex flex-col max-lg:w-3/4 md:w-2/4 max-sm:w-full max-md:w-full">
                      {data.title && (
                        <h1 className="whitespace-nowrap link link-underline link-underline-black text-center hover:decoration lg:text-4xl max-md:text-4xl uppercase font-bold not-italic text-gray-500 hover:decoration-solid duration-200 hover:scale-125 hover:text-cyan-700 lg:text-6xl md:text-4xl sm:text-4xl xs:text-3xl">
                          {data.title}
                        </h1>
                      )}
                      {data.decs && (
                        <span className="mt-2 indent-5 text-[#2C2B2B] text-xl font-small m-2 ">
                          <p>{data.decs[i]}</p>
                          <p>{data.decs[1]}</p>
                          <p>{data.decs[2]}</p>
                        </span>
                      )}
                    </div>
                    {data.youtubeLink && (
                      <div
                        key={i}
                        className="w-fit flex h-100% justify-center items-center max-sm:hidden max-md:hidden"
                      >
                        <iframe
                          title={`UniqueTitle_${i}`}
                          src={data.youtubeLink}
                          alt="youtubeVideo"
                          className="flex translate-y-36 xl:w-[500px] lg:w-[450px] lg:h-[400px] md:w-[400px] md:h-[300px]  xl:-translate-x-24"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="OurGoal">
            <div className="w-full bg-gray-50 lg:h-[700px] max-lg:h-[500px] max-sm:h-[700px] flex items-center justify-center">
              {OurGoal.map((data, index) => (
                <div className="" key={index}>
                  <div
                    className="relative w-full max-sm:w-60% max-w-lg"
                    key={`goal-${index}`}
                  >
                    <div className="absolute top-0 -left-4 w-72 h-72 bg-sky-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                    <div className="absolute top-0 -right-4 max-sm:-right-1 max-sm:-translate-x-3 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-20 max-sm:left-2 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                    <div className="text-gray-500 ">
                      <h1 className="lg:mb-10 text-center text-4xl whitespace-nowrap max-sm:text-xl m-2 font-bold font-serif">
                        {data.title}
                      </h1>
                      <div className="">
                        <h2 className="text-2xl max-sm:text-[20px] font-mono font-bold ">
                          {data.titleContain}
                        </h2>
                      </div>
                      <div className="flex-col m-1">
                        {data.decs && (
                          <ul className="list-disc text-xl justify-between">
                            <li key={`goal-desc-${index}-0`} className="">
                              <h2 className=" ">{data.decs[0]}</h2>
                            </li>
                            <li key={`goal-desc-${index}-1`} className="">
                              <h2 className="">{data.decs[1]}</h2>
                            </li>
                            <li key={`goal-desc-${index}-2`} className="">
                              <h2 className="">{data.decs[2]}</h2>
                            </li>
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div>
            <h1 className="whitespace-nowrap link link-underline link-underline-black m-5 text-center hover:decoration lg:text-4xl max-lg:text-2xl uppercase font-bold not-italic text-gray-500 hover:decoration-solid duration-200 hover:scale-110 hover:text-cyan-700 sm:text-3xl xs:text-3xl">
              អ្នកនិពន្ធ កម្ពុជា
            </h1>
          </div>

          <section id="author" className="w-full flex py-5 mx-auto overflow-x-auto">
            <div className="flex justify-center">
              {author.slice(0, visibleAuthors).map((data, i) => (
                <div key={i} className="px-24 py-5">
                  <div
                    className="lg:w-72 max-lg:w-44 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl"
                    onClick={() => toggleExpansion(i)}
                  >
                    {data.imgAuth && (
                      <img
                        src={data.imgAuth}
                        alt=""
                        onClick={(e) => e.stopPropagation()}
                        className="w-[300px] h-[250px] mb-3 max-sm:w-[180px] max-sm:h-[180px]"
                      />
                    )}
                    {data.authName && (
                      <h2 className="font-bold text-xl mb-3 m-1 auth-name px-2">
                        {data.authName}
                      </h2>
                    )}
                    {data.Gender && (
                      <p className="font-bold text-md m-1 auth-name mb-3 px-2">
                        {data.Gender}
                      </p>
                    )}
                    {data.DOB && (
                      <p className="auth-name m-1 mb-3 p-2">{data.DOB}</p>
                    )}
                    {expandedDetails[i] ? (
                      <p className="text-sm text-gray-600 auth-name px-4">
                        {data.Decs}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-600 auth-name line-clamp-3 px-4">
                        {data.Decs}
                      </p>
                    )}
                    <div className="m-2 p-4">
                      <button
                        className="ease-in-out decoration-300 text-white bg-purple-600 px-3 py-1 rounded-md hover:bg-purple-700"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents the click on the card from triggering the parent div's click event
                          toggleExpansion(i);
                        }}
                      >
                        {expandedDetails[i] ? "See Less" : "Author Detail"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <div className="flex justify-end m-5">
            <button className="rounded-xl text-gray-100 px-4 py-2 bg-blue-500 hover:bg-blue-700 whitespace-nowrap">
              <Link to={"/author"}>All Author</Link>
            </button>
          </div>
        </main>
      )}
    </>
  );
};

export default AboutUs;
