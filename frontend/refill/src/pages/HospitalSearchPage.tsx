import { useState, ChangeEvent, FC } from "react";
import RadioDiv from "../components/elements/RadioButton";
import styled from "@emotion/styled";
import { REFILL_COLORS } from "../assets/getColors";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import RadioDiv from "../components/elements/RadioButton";

// export interface HospitalSearchProps {
// }

// interface DivProps {
//   bgcolor?: string;
// }

export function HospitalSearch() {
  const Container = styled.div`
    border 0;
    background-color: ${REFILL_COLORS["rf-2"]};
    min-width: 100vw;
    min-height: 100vh;
    align-items: center;
    display:flex;
    justify-content: center;
  `;

  // const MapBox = styled.div<DivProps>`
  //   background-color: ${(props) => props.bgcolor ? props.bgcolor : "white"};
  //   width: 500px;
  //   height: 400px;
  // `

  return (
    <div>
      <Navbar />
      <Container>
        {/* <RadioDiv></RadioDiv> */}
        {/* <MapBox bgcolor="red">

        </MapBox>
        <MapBox>
 
        </MapBox> */}
      </Container>
      <Footer />
    </div>
  );
}
