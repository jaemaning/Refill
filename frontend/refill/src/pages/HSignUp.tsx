import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import Logo_img from "../assets/logo2_final.png";
import Kakao from "../assets/Kakao_logo.png";
import Naver from "../assets/Naver_logo.png";
import Google from "../assets/Google_logo.png";
import Button from "../components/elements/Button";
import "../styles/Loginsignup.css";

declare global {
  interface Window {
    daum: any;
  }
}

interface Addr {
  address: string;
}

interface InputImageState {
  profileImg: File | null;
  regImg: File | null;
}

const HSingUp: React.FC = () => {
  // 회원가입 할 때 필요한 데이터
  const [inputData, setInputData] = useState({
    loginId: "",
    loginPassword: "",
    name: "",
    address: "",
    postalCode: "",
    tel: "",
    email: "",
    latitude: "",
    longitude: "",
  });

  // 이미지 올리기
  const [inputImage, setInputImage] = useState<InputImageState>({
    profileImg: null,
    regImg: null,
  });

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null; // 선택한 파일을 가져옵니다. 없으면 null로 설정합니다.

    setInputImage((prevInputImage) => ({
      ...prevInputImage,
      [e.target.name]: file,
    }));
    if (file) {
      if (e.target.name === "profileImg") {
        (document.getElementById("profilename") as HTMLInputElement).value =
          file.name;
      } else if (e.target.name === "regImg") {
        (document.getElementById("regname") as HTMLInputElement).value =
          file.name;
      }
    }
  };

  // 패스워드 확인 체크 로직
  const [checkPassword, setCheckPassword] = useState("");

  const handleCheckPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckPassword(event.target.value);
  };

  const passwordError =
    checkPassword.length > 0 && inputData.loginPassword !== checkPassword;

  // 입력값 바뀌는거 확인 로직
  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
    // console.log(e.target.name)
    // console.log(e.target.value)
  };

  // 도로명 주소 API 로직
  const onClickAddr = () => {
    new window.daum.Postcode({
      oncomplete: function (data: Addr) {
        (document.getElementById("addr") as HTMLInputElement).value =
          data.address;
        document.getElementById("addrDetail")?.focus();
      },
    }).open();
  };

  // 병원 회원가입 axios요청 부분
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const hospitalJoinRequest = {
      loginId: inputData.loginId,
      loginPassword: inputData.loginPassword,
      name: inputData.name,
      postalCode: "55055",
      // address값은 바뀔 예정
      address:
        (document.getElementById("addr") as HTMLInputElement).value +
        ", " +
        inputData.address,
      tel: inputData.tel,
      email: inputData.email,
      latitude: "33.3",
      longitude: "55.5",
    };

    const json = JSON.stringify(hospitalJoinRequest);
    const jsonBlob = new Blob([json], { type: "application/json" });

    const formData = new FormData();
    formData.append("hospitalJoinRequest", jsonBlob);

    if (inputImage.profileImg) {
      formData.append("profileImg", inputImage.profileImg);
    }

    if (inputImage.regImg) {
      formData.append("regImg", inputImage.regImg);
    }
    console.log(inputImage.profileImg);
    axios
      .post("api/v1/account/hospital/join", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(hospitalJoinRequest);
        console.log(err.response.data);
      });
  };

  const middle = "flex justify-center items-center";

  return (
    <div className="HospitalForm">
      {" "}
      {/* 버튼의 useState값에 따라 배경색 및 페이지 렌더링 진행 */}
      <div className="Common_Left text-3xl" style={{ margin: "200px 0px" }}>
        <div>
          <div className="my-3">
            <span className="text-white">머리도 </span>
            <span className="text-whiteblue">Fill </span>
          </div>
          <div className="my-3">
            <span className="text-white">자신감도 </span>
            <span className="text-whiteblue">Fill </span>
          </div>
          <div className="my-3">
            <span className="text-white">전과 다른 느낌을 </span>
            <span className="text-whiteblue">Feel</span>
          </div>
        </div>
        <img src={Logo_img} className="Logo_img" alt="" />
      </div>
      <div className={`Common_Right ${middle}`}>
        <div className="flex justify-between mt-10">
          <span className="text-white text-2xl font-bold my-4">
            병원 회원가입
          </span>
        </div>
        <div className="flex">
          <div className="select_LoginOrSignUp rounded-t-2xl bg-white">
            <span className="my-2">로그인</span>
          </div>
          <div className="select_LoginOrSignUp rounded-t-2xl bg-red">
            <span className="my-2">회원가입</span>
          </div>
        </div>
        <div className={`${middle} MSignup rounded-b-2xl`}>
          <form onSubmit={handleSubmit} className="" style={{ width: "80%" }}>
            <div>
              <div className="flex justify-start">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  병원 이름
                </label>
              </div>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="이름을 입력해주세요"
                onChange={(e) => {
                  changeInput(e);
                }}
                name="name"
                value={inputData.name}
              ></input>
            </div>
            <br />
            <div>
              <div className="flex justify-start">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  ID
                </label>
              </div>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="아이디를 입력해주세요"
                name="loginId"
                value={inputData.loginId}
                onChange={(e) => {
                  changeInput(e);
                }}
              ></input>
            </div>
            <br />
            <div>
              <div className="flex justify-start">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  PASSWORD
                </label>
              </div>
              <input
                type="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="영문자, 숫자, 특수문자 포함 최소 8~20자"
                onChange={(e) => {
                  changeInput(e);
                }}
                name="loginPassword"
                value={inputData.loginPassword}
              ></input>
              <br />
              {/* 비밀번호 입력 확인 Logic구성해서 적용해야함 */}
              <input
                type="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="비밀번호를 확인해주세요"
                value={checkPassword}
                onChange={handleCheckPassword}
              ></input>
              {passwordError && (
                <span style={{ color: "red" }}>
                  비밀번호가 일치하지 않습니다.
                </span>
              )}
            </div>
            <br />
            <div>
              <div className="flex justify-start">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  병원 프로필 사진 등록 (선택)
                </label>
              </div>
              <div className="flex justify-between">
                <input
                  id="profilename"
                  readOnly
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="업로드를 눌러주세요"
                  style={{ width: "70%" }}
                ></input>
                <label htmlFor="profileImg" className="file-input-btn">
                  업로드
                  <input
                    type="file"
                    accept="image/*"
                    id="profileImg"
                    name="profileImg"
                    className="file-input"
                    onChange={handleImgChange}
                  />
                </label>
              </div>
            </div>
            <br />
            <div>
              <div className="flex justify-start">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  병원 등록증 (필수)
                </label>
              </div>
              <div className="flex justify-between">
                <input
                  id="regname"
                  readOnly
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="업로드를 눌러주세요"
                  style={{ width: "70%" }}
                ></input>
                <label htmlFor="regImg" className="file-input-btn">
                  업로드
                  <input
                    type="file"
                    accept="image/*"
                    id="regImg"
                    name="regImg"
                    className="file-input"
                    onChange={handleImgChange}
                  />
                </label>
              </div>
            </div>
            <br />
            <div>
              <div className="flex justify-start">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  E-mail
                </label>
              </div>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="이메일을 입력해주세요"
                name="email"
                value={inputData.email}
                onChange={(e) => {
                  changeInput(e);
                }}
              ></input>
            </div>
            <br />
            <div>
              <div className="flex justify-start">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Address
                </label>
              </div>
              <div className="flex justify-between mb-2">
                <input
                  id="addr"
                  readOnly
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="조회를 눌러주세요"
                  style={{ width: "65%" }}
                ></input>
                <Button
                  content="조회하기"
                  variant="success"
                  type="submit"
                  customStyles={{ height: "41.6px", width: "30%" }}
                  onClick={onClickAddr}
                />
              </div>
              <input
                id="addrDetail"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="상세주소 입력란입니다"
                name="address"
                value={inputData.address}
                onChange={(e) => {
                  changeInput(e);
                }}
              ></input>
            </div>
            <br />
            <div>
              <div className="flex justify-start">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Phone-Number
                </label>
              </div>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="전화번호를 입력해주세요"
                name="tel"
                value={inputData.tel}
                onChange={(e) => {
                  changeInput(e);
                }}
              ></input>
            </div>
            <br />
            <div className="my-3">
              <Button
                content="회원가입"
                variant="success"
                type="submit"
                customStyles={{ width: "100%" }}
              />
            </div>
            <div className="mt-4 font-bold flex-col text-center">
              <span className="text-lg">일반 회원 이신가요?</span>
              <div>
                <span>위에 버튼을 누르시거나 </span>
                <a href="" className="text-red">
                  여기
                </a>
                <span>를 클릭하세요</span>
              </div>
              <div className="my-4">
                <span className="">다른 계정으로 로그인하기</span>
              </div>
            </div>
            <div className="flex justify-around my-5">
              <div className="flex justify-center flex-col text-center">
                <img
                  src={Google}
                  style={{ width: "50px", height: "50px" }}
                  alt=""
                />
                <span>Google</span>
              </div>
              <div className="flex justify-center flex-col text-center">
                <img
                  src={Kakao}
                  style={{ width: "50px", height: "50px" }}
                  alt=""
                />
                <span>Kakao</span>
              </div>
              <div className="flex justify-center flex-col text-center">
                <img
                  src={Naver}
                  style={{ width: "50px", height: "50px" }}
                  alt=""
                />
                <span>Naver</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HSingUp;
