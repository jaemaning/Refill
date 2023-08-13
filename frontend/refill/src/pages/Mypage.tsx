import React, { useState, useEffect } from "react";
import "../App.css";
import styled from "@emotion/styled";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/elements/Button";
import axios from "axios";
import default_profile from "../assets/default_profile.png";
import { RootState } from "store/reducers";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface DivProps {
  selected?: boolean;
}

const Container = styled.div`
  border 0;
  min-width: 100%;
  min-height: 50vh;
  align-items: center;
  display:flex;
  justify-content: center;
  flex-direction: column;
  margin : 100px 0px;
`;

const Common = styled.div`
  border-radius: 10px;
  border-color: #ccc;
  border-width: 1px;
  box-shadow: 0px 0px 1px 1px gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 50px;
  display: ${(props: DivProps) => (props.selected ? "block" : "none")};
`;
const Content2 = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 50px;
  display: ${(props: DivProps) => (props.selected ? "none" : "block")};
`;
const Profileimg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px;
`;

const Ptag = styled.p`
  font-size: 20px;
  margin: 5px 0px;
  color: black;
`;

const DownContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Mypage: React.FC = () => {
  // 로그인이 안되있으면 메인페이지로 이동

  const [selected, setSelected] = useState(true);
  const [checkimg, setCheckimg] = useState(false);
  const [userData, setuserData] = useState({
    address: "",
    birthDay: "",
    email: "",
    name: "",
    nickname: "",
    profileImg: null,
    tel: "",
  });

  const token: string = useSelector((state: RootState) => state.login.token);
  const islogin: boolean = useSelector((state: RootState) => state.login.islogin);

  const navigate = useNavigate();

  useEffect(() => {
    if (islogin === true) {
      axios
        .get("api/v1/member/mypage", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        .then((response) => {
          console.log(response.data);
          setuserData(response.data);

          if (userData.profileImg !== null) {
            setCheckimg(true);
          }
          console.log(checkimg);
        })
        .catch((error) => {
          console.log("에러:", error);
        });
    } else {
      navigate("/");
      alert("접근 권한이 없습니다.");
    }
  }, []);

  const buttonclick = () => {
    setSelected(!selected);
    console.log(selected);
  };

  return (
    <div>
      <Navbar />
      <Container>
        <div className="flex">
          <Common style={{ width: "200px", height: "220px" }}>
            <div className="ms-4 mb-4">
              <span className="text-gray-500">내 정보 관리</span>
            </div>
            <ButtonList>
              <Button
                content="계정관리"
                variant={selected ? "menuSelected" : "menuUnselected"}
                width="180px"
                onClick={buttonclick}
              />
              <br />
              <Button
                content="나의기록"
                variant={selected ? "menuUnselected" : "menuSelected"}
                width="180px"
                onClick={buttonclick}
              />
            </ButtonList>
          </Common>
          <Content selected={selected}>
            <h1 style={{ color: "#2E5077" }} className="text-3xl font-bold">
              계정 관리
            </h1>
            <br />
            <span className="text-xl font-bold">기본 정보</span>
            <Common
              style={{ width: "700px", height: "480px" }}
              className="mt-3 mb-6"
            >
              <Profileimg
                src={checkimg ? `${userData.profileImg}` : `${default_profile}`}
              />
              <br />
              <div className="flex justify-between" style={{ width: "600px" }}>
                <div
                  className="flex flex-col text-center"
                  style={{ width: "100px" }}
                >
                  <Ptag>이름</Ptag>
                  <Ptag>주소</Ptag>
                  <Ptag>생년월일</Ptag>
                  <Ptag>전화번호</Ptag>
                  <Ptag>닉네임</Ptag>
                </div>
                <div style={{ width: "450px" }}>
                  <Ptag>{userData.name}</Ptag>
                  <Ptag>{userData.address}</Ptag>
                  <Ptag>{userData.birthDay}</Ptag>
                  <Ptag>{userData.tel}</Ptag>
                  <div className="flex justify-between">
                    <Ptag>{userData.nickname}</Ptag>
                    <Button
                      content="정보수정"
                      variant="menuSelected"
                      width="80px"
                      onClick={buttonclick}
                    />
                  </div>
                </div>
              </div>
            </Common>
            <span className="text-xl font-bold mt-10 mb-3">비밀번호</span>
            <Common
              style={{ width: "700px", height: "150px" }}
              className="mt-3 mb-6"
            >
              <DownContent style={{ width: "600px" }}>
                <h1 className="text-xl text-gray-400 font-bold">
                  비밀번호를 바꾸고 싶거나 잊어버리셨나요?
                </h1>
                <Button
                  content="비밀번호 변경"
                  variant="menuSelected"
                  width="120px"
                  onClick={buttonclick}
                />
              </DownContent>
            </Common>
            <span className="text-xl font-bold mt-10 mb-3">계정 삭제</span>
            <Common
              style={{ width: "700px", height: "150px" }}
              className="mt-3 mb-6"
            >
              <DownContent style={{ width: "600px" }}>
                <h1 className="text-xl text-gray-400 font-bold">
                  계정 삭제 시 작성했던 댓글, 리뷰는 삭제되지 않습니다.
                </h1>
                <Button
                  content="계정 삭제"
                  variant="danger"
                  width="80px"
                  onClick={buttonclick}
                />
              </DownContent>
            </Common>
          </Content>
          <Content2 selected={selected}>
            <h1 style={{ color: "#2E5077" }} className="text-3xl font-bold">
              나의 기록
            </h1>
            <br />
            <span className="text-xl font-bold mb-3">나의 예약 현황</span>
            <Common
              style={{ width: "700px", height: "480px" }}
              className="mt-3 mb-6"
            ></Common>
            <span className="text-xl font-bold mt-10 mb-3">나의 상담 기록</span>
            <Common
              style={{ width: "700px", height: "150px" }}
              className="mt-3 mb-6"
            ></Common>
            <span className="text-xl font-bold mt-10 mb-3">
              나의 AI 자가진단 기록
            </span>
            <Common
              style={{ width: "700px", height: "150px" }}
              className="mt-3 mb-6"
            ></Common>
          </Content2>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default Mypage;
