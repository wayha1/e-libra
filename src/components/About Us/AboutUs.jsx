import React, { useEffect, useState } from "react";
import "./Aboutus.css";
import HoverVideoPlayer from "react-hover-video-player";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const AboutUs = () => {
  const [Banner, setBanner] = useState([]);
  const [Container, setContainer] = useState([]);
  const [OurGoal, setGoal] = useState([]);
  const [author, setAuthor] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [expandedAuthors, setExpandedAuthors] = useState([]);

  const toggleExpansion = (index) => {
    setExpandedAuthors((prevExpandedAuthors) => {
      const newExpandedAuthors = [...prevExpandedAuthors];
      newExpandedAuthors[index] = !newExpandedAuthors[index];
      return newExpandedAuthors;
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
  useEffect(() => {
    if (!Banner) {
      return null;
    } else {
      getAuthor();

      const getData = async () => {
        const Banner = collection(db, "Aboutus");
        const snapshot = await getDocs(Banner);
        const data = snapshot.docs.map((val) => ({
          ...val.data(),
          id: val.id,
        }));
        setBanner(data);
        for (const elem of data) {
          data.map(async (elem) => {
            const contain = collection(db, `Aboutus/${elem.id}/container`);
            const Containers = await getDocs(contain);
            const ContainerData = Containers.docs.map((val) => ({
              ...val.data(),
              id: val.id,
            }));
            setContainer(ContainerData);
            console.log(ContainerData);
            data.map(async (elem) => {
              const OurGoal = collection(db, `Aboutus/${elem.id}/Goal`);
              const Goals = await getDocs(OurGoal);
              const GoalData = Goals.docs.map((val) => ({
                ...val.data(),
                id: val.id,
              }));
              setGoal(GoalData);
              console.log(GoalData);
            });
          });

        }
      };
      getData();
    }
  }, []);

  return (
    <div>
      {/* <Navbar /> */}
      <>
        <main className="w-screen bg-gray-50">
          <section id="banner ">
            {Banner.map((data) => (
              <div key={data.id} className="flex items-center justify-center py-1 relative">
                <div
                  className="sm:w-[1000px] sm:h-300px xs:w-[1000px] md:w-[2000px] lg:w-[2500px] xl:w-[3000px] w-full aspect-video h-fit"
                  onMouseOver={() => setTimeout(() => handleMouseOver(), 500)}
                  onMouseOut={handleMouseOut}
                >
                  {data.ImgBanner && (
                    <HoverVideoPlayer
                      videoSrc={data.ImgBanner}
                      alt="Gif Banner"
                      className="relative z-10 w-full h-full object-cover bg-repeat "
                      overlayTransitionDuration={400}
                      autoPlay={!isHovering}
                      loop={!isHovering}
                      muted
                      width={2000}
                      height={1200}
                      preload="auto"
                    />
                  )}
                </div>
                {isHovering && (
                  <div className="absolute text-white w-full text-center backdrop-blur-2xl z-20 lg:px-10 lg:py-20 max-sm:px-2 max-sm:py-2">
                    <h1 className="font-bold uppercase lg:text-8xl md:text-6xl sm:text-6xl xs:text=4xl 2xs:text-4xl">
                      {data.txtBanner}
                    </h1>
                    <span className="font-bold lg:text-xl max-lg:text-xs">{data.decs}</span>
                  </div>
                )}
              </div>
            ))}
          </section>

          <section id="Our_Vision">
            {Container.map((data, i) => (
              <div className="flex ">
                {data.youtubeLink && (
                  <div key={i} className="w-full  md:hidden min-lg:hidden lg:hidden xl:hidden ">
                    <iframe
                      src={data.youtubeLink}
                      alt="youtubeVideo"
                      className="max-lg:w-full max-lg:h-[350px] sm:w-full sm:h-[250px] max-sm:w-full max-sm:h-[200px] max-lg:px-10 max-lg:m-2 "
                    />
                  </div>
                )}
              </div>
            ))}
            <div className="flex flex-col w-screen h-auto">
              <div className="w-full justify-between">
                {Container.map((data, i) => (
                  <div className="lg:py-4 lg:px-10 justify-between flex px-3 ">
                    <div key={i} className="md:m-2 sm:m-5 max-sm:m-5 bg-gray-300 rounded-2xl shadow-xl p-2 flex flex-col max-lg:w-3/4 md:w-2/4 max-sm:w-full max-md:w-full">
                      {data.title && (
                        <h1 className="link link-underline link-underline-black text-center hover:decoration lg:text-4xl max-md:text-4xl uppercase font-bold not-italic text-gray-500 hover:decoration-solid duration-200 hover:scale-125 hover:text-cyan-700 lg:text-6xl md:text-4xl sm:text-4xl xs:text-3xl">
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
                          src={data.youtubeLink}
                          alt="youtubeVideo"
                          className="flex translate-y-36 lg:w-[500px] lg:h-[400px] md:w-[400px] md:h-[300px]  "
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="OurGoal">
            <div className="w-full bg-gray-50 lg:h-[700px] flex items-center justify-center max-md:h-[500px]">
              {OurGoal.map((data) => (
                <div class="">
                  <div class="relative w-full max-w-lg">
                    <div class="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                    <div class="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                    <div class="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                    <h1 className="text-center text-4xl">{data.title}</h1>
                    <div>
                      <h2 className="text-4xl">{data.titleContain}</h2>
                    </div>

                    <div className="flex-col">
                      <ul className="list-disc text-2xl justify-between">
                        <li className="">
                          <h2 className=" ">{data.decs[0]}</h2>
                        </li>
                        <li className="">
                          <h2 className="">{data.decs[1]}</h2>
                        </li>
                        <li className="">
                          <h2 className="">{data.decs[2]}</h2>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <div>
            <h1 className="link link-underline link-underline-black text-center hover:decoration lg:text-4xl uppercase font-bold not-italic text-gray-500 hover:decoration-solid duration-200 hover:scale-110 hover:text-cyan-700 lg:text-5xl md:text-4xl sm:text-4xl xs:text-3xl">Camboidan Author</h1>
          </div>

          <section id="author">
            <div className="lg:px-10 lg:py-5">
              {author.map((data, i) => (
                <div key={i} className="">
                  <div
                    className="lg:w-60 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl"
                    onClick={() => toggleExpansion(i)}
                  >
                    {data.imgAuth && <img src={data.imgAuth} alt="Author Image" width={500} height={200} />}
                    {data.authName && <h2 className="font-bold text-xl m-1 auth-name">{data.authName}</h2>}
                    {data.Gender && <p className="font-bold text-md m-1 auth-name">{data.Gender}</p>}
                    {data.DOB && <p className="auth-name m-1">{data.DOB}</p>}
                    {expandedAuthors[i] && data.Decs && (
                      <p className="text-sm text-gray-600 auth-name ">{data.Decs}</p>
                    )}
                    <div className="m-2">
                      <button
                        className="ease-in-out decoration-300 text-white bg-purple-600 px-3 py-1 rounded-md hover:bg-purple-700"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents the click on the card from triggering the parent div's click event
                          toggleExpansion(i);
                        }}
                      >
                        Author Detail
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </>
    </div>
  );
};

export default AboutUs;
