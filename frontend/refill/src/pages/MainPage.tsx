import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "@emotion/styled";
import app_logo from "../assets/app_logo.png";
// import MainComponent from "components/MainComponent";
import "styles/Wave.css"

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border 0;
  background: linear-gradient(to bottom, #71bfe7, #f1d7f0);
  min-width: 100%;
  min-height: 100vh;
  flex-direction: column;
`;

const Word = styled.h1`
  color: white;
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const GreyLine = styled.div`
  width: 100%;
  height: 80px;
  background-color: #f4f4f4;
`;

const MainApp: React.FC = () => {
  // const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  // const [navbarHeight, setNavbarHeight] = useState(0);
  const navbarRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   const handleResize = () => setWindowHeight(window.innerHeight);

  //   window.addEventListener("resize", handleResize);

  //   if (navbarRef.current) {
  //     const navH = navbarRef.current.getBoundingClientRect().height;
  //     setNavbarHeight(navH);
  //     console.log(navbarHeight, navH);
  //     window.scrollTo(0, navH);
  //   }

  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  // const handleClickWord = () => {
  //   window.scroll({
  //     top: windowHeight + 80 + navbarHeight,
  //     left: 0,
  //     behavior: "smooth",
  //   });
  // };

  return (
    <div className="MainApp">
      <Navbar ref={navbarRef} />
      {/* <MainComponent handleClick={handleClickWord} /> */}
      {/* <GreyLine /> */}
      <div className="wave-container">
        <p className="main-font text-4xl font-black">당신의 자신감을 다시</p>
        <p className="main-font text-4xl font-black">채워 줄 단 하나의 플랫폼, RE:Fill</p>
        <div className="flex justify-center items-center">
          <img
            src={app_logo}
            alt=""
            className="main-image"
          />
        </div>
        <div>
          <svg
            className="waves"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 100 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className="parallax">
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="0"
                fill="rgba(255,255,255,0.25)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="3"
                fill="rgba(255,255,255,0.2)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="5"
                fill="rgba(255,255,255,0.15)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="7"
                fill="rgba(255,255,255,0.1)"
              />
            </g>
          </svg>
        </div>
      </div>
      <GreyLine />
      <Footer />
    </div>
  );
};

export default MainApp;
