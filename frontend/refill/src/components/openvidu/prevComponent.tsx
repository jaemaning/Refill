import * as React from "react";
import styled from "@emotion/styled";

const StylePrev = styled.div`
  min-width: 100%;
  height: 70%;
  background-color: #e1d0ee;
`;

export function PrevComponent() {
  return <StylePrev>이전 상담 기록</StylePrev>;
}
