// import { REFILL_COLORS } from '../assets/getColors.js';
// import { useState, ChangeEvent, FC } from 'react';
// import RadioDiv from "../components/elements/RadioButton";
import styled from "@emotion/styled";
import { REFILL_COLORS } from "../assets/getColors";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";



export function HospitalSearch() {
  const Container = styled.div`
    border 0;
    background-color: ${REFILL_COLORS["rf-2"]};
    min-width: 100vw;
    min-height: 100vh;
  `;
  // const [option, setOption] = useState(radioOption);

  // const handleChange = (e :ChangeEvent<HTMLInputElement>) => {
  //   setOption(e.target.value);
  // }

  return (
    <div>
      <Navbar />
        <Container></Container>
      <Footer />
    </div>
  );
}

