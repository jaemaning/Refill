import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import Logo_img from "../assets/logo2_final.png";
import Kakao from "../assets/Kakao_logo.png";
import Naver from "../assets/Naver_logo.png";
import Google from "../assets/Google_logo.png";
import Button from "../components/elements/Button";
import "../styles/Loginsignup.css"

declare global {
  interface Window {
    daum : any;
  }
}

interface Addr {
  address: string;
}

const SingUp: React.FC = () => {

      // 회원가입 할 때 필요한 데이터
      const [inputData, setInputData] = useState({
        loginId: "",
        loginPassword: "",
        nickname: "",
        name: "",
        address: "",
        tel: "",
        birthDay: "",
        email: "",
      });
      
      const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputData({
          ...inputData,
          [e.target.name]: e.target.value,
        });      
        // console.log(e.target.name)
        // console.log(e.target.value)
      };
      
      
      const onClickAddr = () => {
        new window.daum.Postcode({
          oncomplete : function (data: Addr) {
            (document.getElementById("addr") as HTMLInputElement).value = data.address;
            document.getElementById("addrDetail")?.focus();
          },
        }).open();
      };
      
    
      const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const memberJoinRequest = {
          loginId: inputData.loginId,
          loginPassword: inputData.loginPassword,
          nickname: inputData.nickname,
          name: inputData.name,
          address: (document.getElementById("addr") as HTMLInputElement).value + ', ' +inputData.address,
          tel: inputData.tel,
          birthDay: inputData.birthDay,
          email: inputData.email,
        };
    
        const json = JSON.stringify(memberJoinRequest);
        const jsonBlob = new Blob([json], { type: "application/json" });
    
        const formData = new FormData();
        formData.append("memberJoinRequest", jsonBlob);
    
        axios
          .post("api/v1/account/member/join", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch((err) => {
            console.log(memberJoinRequest);
            console.log(err.response.data);
          });
      };

  const middle = "flex justify-center items-center";

  return (
    <div className="MemberForm">
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
            일반 회원가입
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
                  이름
                </label>
              </div>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="이름을 입력해주세요"
                onChange={(e) => {
                    changeInput(e);
                }}
                name= "name"
                value = {inputData.name}
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
                name = "loginId"
                value = { inputData.loginId }
                onChange={(e) => {
                    changeInput(e);
                }}
                
              >
              </input>
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
                name = "loginPassword"
                value = { inputData.loginPassword }
              >
              </input>
              <br />
              {/* 비밀번호 입력 확인 Logic구성해서 적용해야함 */}
              <input
                type="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="비밀번호를 확인해주세요"
                // onChange={(e) => {
                //     changeInput(e);
                // }}
                // value={inputData.loginPassword}
              >
              </input>
            </div>
            <br />
            <div>
              <div className="flex justify-start">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  NICKNAME
                </label>
              </div>
              <input
                type = "text"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="닉네임을 입력해주세요"
                name = "nickname"
                value = { inputData.nickname }
                onChange={(e) => {
                    changeInput(e);
                }}
                >
              </input>
            </div>
            <br />
            <div>
              <div className="flex justify-start">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  생년월일
                </label>
              </div>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="아이디를 입력해주세요"
                onChange={(e) => {
                    changeInput(e);
                }}
                name = "birthDay"
                value = { inputData.birthDay }
                >
              </input>
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
                name = "email"
                value = { inputData.email }               
                onChange={(e) => {
                    changeInput(e);
                }}
              >
              </input>
            </div>
            <br />
            <div>
              <div className="flex justify-start">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Address
                </label>
              </div>
              <div className = "flex justify-between mb-2">
                <input
                  id = "addr"
                  readOnly
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="조회를 눌러주세요"
                  style = {{width : "65%"}}
                >
                </input>
                <Button
                content="조회하기"
                variant="success"
                type="submit"
                customStyles={{ height : "41.6px" , width: "30%" }}
                onClick = {onClickAddr}
                />
              </div>
              <input
                  id = "addrDetail"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="상세주소 입력란입니다"
                  name = "address"
                  value = { inputData.address } 
                  onChange={(e) => {
                    changeInput(e);
                  }}
                >   
              </input>
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
                name = "tel"
                value = { inputData.tel } 
                onChange={(e) => {
                    changeInput(e);
                }}
              >
              </input>
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
              <span className="text-lg">병원을 등록하고 싶으신가요?</span>
              <div>
                <span>위에 버튼을 누르시거나 </span>
                <a href="" className="text-red">여기</a>
                <span>를 클릭하세요</span>
              </div>
              <div className = "my-4">
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

export default SingUp;
