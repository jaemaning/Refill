import React, { useState, useEffect } from "react";
import "../App.css";
import styled from "@emotion/styled";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/elements/Button";
import axios from "axios";

interface chooseDiv {
  selected?: number;
}

const Mypage: React.FC = () => {
  // 로그인이 안되있으면 메인페이지로 이동

  const [selected, setSelected] = useState(1);
  const [isLogin, setisLogin] = useState(false);

  const [userData, setuserData] = useState({
    address: "",
    birthDay: "",
    email: "",
    name: "",
    nickname: "",
    profileImg: null,
    tel: "",
  });

  useEffect(() => {
    if (!isLogin) {
      const token = localStorage.getItem("login-token");
      console.log(token);
      axios
        .get("api/v1/member/mypage", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        .then((response) => {
          // console.log(response.data)
          setuserData(response.data);
          setisLogin(true);
        })
        .catch((error) => {
          console.log("에러:", error);
        });
    }
  }, []);

  const Container = styled.div`
    border 0;
    min-width: 100%;
    min-height: 100vh;
    align-items: center;
    display:flex;
    justify-content: center;
    flex-direction: column;
  `;

  const Selectbutton = styled.div`
    border-radius: 10px;
    border-color: #888888;
    border-width: 1px;
    width: 180px;
    height: 200px;
    box-shadow: 0px 0px 1px 1px gray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;

  const StyleSpan = styled.div``;

  return (
    <div>
      <Navbar />
      <Container>
        <div className="flex">
          <Selectbutton>
            <div>
              <span>내 정보 관리</span>
            </div>
            <hr />
            <Button
              content="성공"
              variant="success"
              width="200px"
              // onClick={handleClick}
              customStyles={{ width: "100%" }}
            />
          </Selectbutton>

          <h1>hello2</h1>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default Mypage;
