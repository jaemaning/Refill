import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "@emotion/styled";
import app_logo from "../assets/app_logo.png";
import MainComponent from "components/MainComponent";

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
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navbarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);

    window.addEventListener("resize", handleResize);

    if (navbarRef.current) {
      const navH = navbarRef.current.getBoundingClientRect().height;
      setNavbarHeight(navH);
      console.log(navbarHeight, navH);
      window.scrollTo(0, navH);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClickWord = () => {
    window.scroll({
      top: windowHeight + 80 + navbarHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="MainApp">
      <Navbar ref={navbarRef} />
      <MainComponent handleClick={handleClickWord} />
      <GreyLine />
      <Container>
        <Word>당신의 자심감을 다시</Word>
        <Word>채워 줄 단 하나의 플랫폼, RE:Fill</Word>
        <img
          src={app_logo}
          alt=""
          style={{ width: "100px", height: "100px" }}
        />
      </Container>
      <GreyLine />
      <Footer />
      
    </div>
  );
};

export default MainApp;
