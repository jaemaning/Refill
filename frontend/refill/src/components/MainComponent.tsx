import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

const StyledMainContainer = styled.div`
  min-width: 100%;
  min-height: 100vh;
  background-color: black;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;

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
          }
        }

        &:nth-of-type(2) {
          margin-left: 40px;
        }
      }
    }
  }
`;

const MainComponent = () => {
  const navigate = useNavigate();

  const toHome = () => {
    navigate('/')
  }

  return (
    <StyledMainContainer>
      <div style={{textAlign: 'center'}}>
        <h2 onClick={toHome}>
          <span>RE</span>
          <span>Fill</span>
          <span> To Home</span>
        </h2>
        <h2 style={{cursor:'default', color: '#829ebc'}}>
          <p>404 NotFound</p>
        </h2>
      </div>
    </StyledMainContainer>
  );
};

export default MainComponent;
