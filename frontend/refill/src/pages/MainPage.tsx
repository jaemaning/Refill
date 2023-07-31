import React from "react";
import "../App.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { REFILL_COLORS } from "../assets/getColors.js";
import styled from "@emotion/styled";
import app_logo from "../assets/app_logo.png";
// import Counter from '../components/Counter';

// import LoginForm from './LoginForm'
// import MemberJoin from '../MemberJoin'
// import ButtonTest from '../components/ButtonTest'

const MainApp: React.FC = () => {
  const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border 0;
    background: linear-gradient(to bottom, ${REFILL_COLORS["rf-2"]}, white);
    min-width: 100vw;
    min-height: 700px;
    flex-direction: column;
  `;

  const Word = styled.h1`
    color: white;
    font-size: 40px;
    font-weight: 700;
  `;

  return (
    <div className="MainApp">
      <Navbar />
      <Container>
        <Word>당신의 자심감을 다시</Word>
        <Word>채워 줄 단 하나의 플랫폼, RE:Fill</Word>
        <img src={app_logo} alt="" style={{}} />
      </Container>
      <Footer />
    </div>
  );
};

export default MainApp;
