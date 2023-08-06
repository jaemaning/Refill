import * as React from "react";
import styled from "@emotion/styled";

const StyledMainContainer = styled.div`
  min-width: 100%;
  min-height: 100vh;
  background-color: black;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;

  h2 {
    font-size: 6em;
    font-weight: 500;
    color: #222;
    letter-spacing: 5px;
    cursor: pointer;

    &:hover {
      span {
        color: #fff;
        text-shadow:
          0 0 10px #fff,
          0 0 20px #fff,
          0 0 40px #fff,
          0 0 80px #fff;
        /* 0 0 120px #fff; */

        &:nth-of-type(1) {
          &::after {
            content: ":";
            font-size: 125px;
          }
        }

        &:nth-of-type(2) {
          margin-left: 40px;
        }
      }
    }
  }
`;

interface MainProps {
  handleClick: () => void;
}

const MainComponent = ({ handleClick }: MainProps) => {
  return (
    <StyledMainContainer onClick={handleClick}>
      <h2>
        <span>RE</span>
        <span>Fill</span>
      </h2>
    </StyledMainContainer>
  );
};

export default MainComponent;
