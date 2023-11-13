import React, { useEffect, useState, useRef } from "react";
import Navbar from "../../Navbar/Navbar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
// import { css } from "@emotion/css";
// import HoverVideoPlayer from "react-hover-video-player";

const AboutUs = () => {
  const [Banner, setBanner] = useState([]);
  const [Container, setContainer] = useState([]);
  const [OurGoal, setGoal] = useState([]);

  // const [isHovering, setIsHovering] = useState(false);

  // const handleHoverEnter = () => {
  //   setIsHovering(true);
  //   document.querySelector('video').autoplay = true;
  // };
  // const handleHoverLeave = () => {
  //   setIsHovering(false);
  //     document.querySelector('video').autoplay = false;

  // };
  useEffect(() => {
    if (!Banner) {
      return null;
    } else {
      const getData = async () => {
        const Banner = collection(db, "Aboutus");
        const snapshot = await getDocs(Banner);
        const data = snapshot.docs.map((val) => ({
          ...val.data(),
          id: val.id,
        }));
        setBanner(data);
        data.map(async (elem) => {
          const contain = collection(db, `Aboutus/${elem.id}/container`);
          const Containers = await getDocs(contain);
          const ContainerData = Containers.docs.map((val) => ({
            ...val.data(),
            id: val.id,
          }));
          setContainer(ContainerData);
          console.log(ContainerData)
          data.map(async (elem) => {
            const OurGoal = collection(db, `Aboutus/${elem.id}/Goal`);
            const Goals = await getDocs(OurGoal);
            const GoalData = Goals.docs.map((val) => ({
              ...val.data(),
              id: val.id,
            }));
            setGoal(GoalData);
            console.log(GoalData)
          });
        });
      };
      getData();
    }
  }, []);

  return (
    <div>
      {/* <Navbar /> */}
      <main className="w-screen bg-gray-200">
        <section id="banner">
          {Banner.map((data) => (
            <div key={data.id} className="flex items-center py-1">
              <div className="absolute w-full text-center items-center justify-center bg-origin-content">
                <h1 className="font-bold text-white uppercase lg:text-9xl md:text-6xl sm:text-6xl xs:text=4xl 2xs:text-4xl">
                  {data.txtBanner}
                </h1>
                <span className="font-bold text-white uppercase">{data.decs}</span>
              </div>
              <div className="sm:w-[1000px] sm:h-300px xs:w-[1000px] md:w-[2000px] lg:w-[2500px] xl:w-[3000px] w-full aspect-video h-fit">
                {data.ImgBanner && (
                  <video src={data.ImgBanner} autoPlay loop muted width={2000} height={1100} />
                )}
              </div>
            </div>
          ))}
        </section>

        <section id="container">
          <div className="flex flex-col w-screen h-auto">
            <div className="w-full justify-between">
              {Container.map((data, i) => (
                <div className="lg:py-4 lg:px-10 justify-between flex">
                  <div key={i} className="flex flex-col max-lg:w-2/4 md:w-2/4 max-sm:w-full">
                    {data.title && (
                      <h1 className="text-center lg:text-5xl uppercase font-bold font-mono text-gray-800 uppercase hover:text-cyan-900 ml-10 lg:text-6xl md:text-4xl sm:text-4xl xs:text-3xl">
                        {data.title}
                      </h1>
                    )}
                    {data.decs && (
                      <span className="text-left indent-8 text-[#383636] font-mono text-xl tracking-normal font-medium ">
                        <p>{data.decs[i]}</p>
                        <p>{data.decs[1]}</p>
                        <p>{data.decs[2]}</p>
                      </span>
                    )}
                  </div>
                  {data.youtubeLink && (
                    <div key={i} className="w-fit flex h-100% justify-center items-center max-sm:hidden min-md:hidden">
                      <iframe
                        src={data.youtubeLink}
                        alt="youtubeVideo"
                        className="lg:mt-10 lg:w-[500px] lg:h-[400px] md:w-[400px] md:h-[300px] sm:h-[300px]"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="container">
          <div className="w-full  px-20 py-30">
            {OurGoal.map((data) => (
              <div className="py-10 px-5">
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
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;
