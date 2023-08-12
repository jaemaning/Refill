import styled from "@emotion/styled";
import React, { ReactNode } from 'react';

const StylePrev = styled.div`
  min-width: 100%;
  min-height: 70%;
  display: flex; // 중앙 정렬을 위한 flexbox 사용
  align-items: center; // 세로 중앙 정렬
  justify-content: center; // 가로 중앙 정렬
  background-color: #ffffff; // 남는 공간의 배경색을 흰색으로 설정 (또는 검은색 등 원하는 색상)
  border-radius: 3px; 
  border: 5px solid black;
`

type MyComponentProps = {
  children: ReactNode; // children prop의 타입을 ReactNode로 지정
};

const PrevComponent : React.FC<MyComponentProps> = ({children}) => {
  return (
    <StylePrev>
      {children}
    </StylePrev>
  )
}

export default PrevComponent;
