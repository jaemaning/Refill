import React, { useState, useRef, useEffect } from "react";
// import RadioDiv from "../components/elements/RadioButton";
import styled from "@emotion/styled";
import { REFILL_COLORS } from "../assets/getColors";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RadioDiv from "../components/elements/RadioButton";

// export interface HospitalSearchProps {
// }

declare global {
  interface Window {
    kakao: any;
  }
}

interface DivProps {
  bgcolor?: string;
  selected?: boolean;
}

export const HospitalSearch: React.FC = () => {
  const [selected, setSelected] = useState("option1");

  const Container = styled.div`
    border 0;
    background-color: ${REFILL_COLORS["rf-2"]};
    min-width: 100%;
    min-height: 100vh;
    align-items: center;
    display:flex;
    justify-content: center;
    flex-direction: column;
  `;

  const MapBox = styled.div`
    background-color: ${(props: DivProps) =>
      props.bgcolor ? props.bgcolor : "white"};
    width: 1000px;
    height: 600px;
    display: ${(props: DivProps) => (props.selected ? "block" : "none")};
  `;

  const kakaoMapBox = useRef<HTMLDivElement>(null); // 지도를 담을 div element를 위한 ref

  useEffect(() => {
    if (selected === "option1") {
      window.kakao.maps.load(() => {
        // v3가 모두 로드된 후, 이 콜백 함수가 실행됩니다.
        const options = {
          // 지도를 생성할 때 필요한 기본 옵션
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 3, // 지도의 레벨 (확대, 축소 정도)
        };
        // 지도 생성 및 객체 리턴
        const map = new window.kakao.maps.Map(kakaoMapBox.current, options);
      });
    }
  }, [selected]);

  return (
    <div>
      <Navbar />
      <Container>
        <h1 style={{ fontSize: "40px", fontWeight: "bold", width: "1000px" }}>
          병원 검색하기
        </h1>
        <hr />
        <RadioDiv selected={selected} setSelected={setSelected}></RadioDiv>
        <MapBox ref={kakaoMapBox} selected={selected === "option1"}></MapBox>
        <MapBox bgcolor="white" selected={selected === "option2"}></MapBox>
      </Container>
      <Footer />
    </div>
  );
};
