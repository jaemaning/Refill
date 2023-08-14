import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import Social from "components/common/Social";
import Button from "../elements/Button";
import "../../styles/Loginsignup.css";

declare global {
  interface Window {
    daum: any;
  }
}

interface Addr {
  address: string;
}

interface SignUpType {
  handleChecklogin: () => void;
}

const SingUp: React.FC<SignUpType> = (props) => {
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

  const [checkPassword, setCheckPassword] = useState("");
  const [code, setCode] = useState("");
  const [checkCode, setCheckCode] = useState("");
  const [check, setCheck] = useState(false);

  const passwordError =
    checkPassword.length > 0 && inputData.loginPassword !== checkPassword;

  const handleCheckPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckPassword(event.target.value);
  };

  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const checkemail = () => {
    if (checkCode === code) setCheck(true);
    else setCheck(false);

    console.log(code);
    console.log(checkCode);
    console.log(check);
  };

  const onClickAddr = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    new window.daum.Postcode({
      oncomplete: function (data: Addr) {
        (document.getElementById("addr") as HTMLInputElement).value =
          data.address;
        document.getElementById("addrDetail")?.focus();
      },
    }).open();
  };

  // 이메일 인증 요청
  const emailCertify = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const data = { email: inputData.email };
    console.log(data);

    axios
      .post("api/v1/account/verify/join", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        setCheckCode(response.data.code);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  // 회원가입 axios 요청
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const memberJoinRequest = {
      loginId: inputData.loginId,
      loginPassword: inputData.loginPassword,
      nickname: inputData.nickname,
      name: inputData.name,
      address:
        (document.getElementById("addr") as HTMLInputElement).value +
        ", " +
        inputData.address,
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
        props.handleChecklogin();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const middle = "flex justify-center items-center";

  return (
    <div>
      <div className={`${middle} MSignup rounded-b-2xl mt-6 mb-3`}>
        <form onSubmit={handleSubmit} className="" style={{ width: "100%" }}>
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
                NICKNAME
              </label>
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="닉네임을 입력해주세요"
              name="nickname"
              value={inputData.nickname}
              onChange={(e) => {
                changeInput(e);
              }}
            ></input>
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
              placeholder="생년월일을 입력해주세요"
              onChange={(e) => {
                changeInput(e);
              }}
              name="birthDay"
              value={inputData.birthDay}
            ></input>
          </div>
          <br />
          <div>
            <div className="flex justify-start">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                E-mail
              </label>
            </div>
            <div className="flex justify-between">
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="이메일을 입력해주세요"
                name="email"
                value={inputData.email}
                onChange={(e) => {
                  changeInput(e);
                }}
                style={{ width: "65%" }}
              ></input>
              <button
                className="button-style mbutton"
                type="button"
                style={{ height: "41.6px", width: "30%" }}
                onClick={emailCertify}
              >
                인증하기
              </button>
            </div>
          </div>
          <br />
          {checkCode && (
            <div className="flex justify-between">
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="인증코드를 입력해주세요"
                onChange={handleCodeChange}
                name="code"
                value={check ? "인증되었습니다" : code}
                readOnly={check}
                style={{ width: "65%" }}
              />
              <button
                className="button-style mbutton"
                type="button"
                style={{ height: "41.6px", width: "30%" }}
                onClick={checkemail}
              >
                확인하기
              </button>
            </div>
          )}
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
              <button
                className="button-style mbutton"
                type="button"
                style={{ height: "41.6px", width: "30%" }}
                onClick={onClickAddr}
              >
                조회하기
              </button>
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
          <div className="mt-4 text-lg font-bold flex-col text-center">
            <span className="text-xl">병원을 등록하고 싶으신가요?</span>
            <br />
            <span className="mx-2">위에</span>
            <span className="text-red">토글 버튼</span>
            <span className=""> 을 통해</span>
            <br />
            <span className="mx-2">병원 회원가입으로 가세요!</span>
            <div className="mt-3">
              <span className="">다른 계정으로 로그인하기</span>
            </div>
          </div>
          <div className="flex justify-around mb-5">
            <Social />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SingUp;
