import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import Button from "../elements/Button";
import "../../styles/Loginsignup.css";
import Swal from "sweetalert2";

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

const MemberSignup: React.FC<SignUpType> = (props) => {
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

  // 입력 패스워드와 확인 패스워드 일치하는지 검사
  const [checkPassword, setCheckPassword] = useState("");
  const passwordError =
    checkPassword.length > 0 && inputData.loginPassword !== checkPassword;

  const handleCheckPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckPassword(event.target.value);
  };

  // 아이디 형식에 맞는지 판단
  const [validId, setValidId] = useState(false);
  const validateId = (id: string) => {
    const alphanumericRegex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{6,14}$/;
    const isValidId = alphanumericRegex.test(id);
    setValidId(isValidId);
  };

  // 비밀번호 형식에 맞는지 판단
  const [validPw, setValidPw] = useState(false);
  const validatePw = (pw: string) => {
    const complexRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,14}$/;
    const isValidPw = complexRegex.test(pw);
    setValidPw(isValidPw);
  };

  // 생년월일 형식에 맞는지 판단
  const [validBD, setValidBD] = useState(false);
  const validateBD = (bD: string) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateRegex.test(bD)) {
      setValidBD(false);
    } else {
      const year = parseInt(bD.substring(0, 4));
      const month = parseInt(bD.substring(5, 7));
      const day = parseInt(bD.substring(8, 10));

      if (
        isNaN(year) ||
        isNaN(month) ||
        isNaN(day) ||
        year < 1900 ||
        month < 1 ||
        month > 12 ||
        day < 1 ||
        day > 31
      ) {
        setValidBD(false);
      } else {
        setValidBD(true);
      }
    }
  };

  // 이메일 형식에 맞는지 판단
  const [validEmail, setValidEmail] = useState(false);
  const validateEmail = (Email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+\.(com|net)$/;
    const isEmail = emailRegex.test(Email);
    setValidEmail(isEmail);
  };

  // 폰넘버 형식에 맞는지 판단
  const [validPN, setValidPN] = useState(false);
  const validatePN = (PN: string) => {
    const numberRegex = /^\d{3}-\d{4}-\d{4}$/;

    if (!numberRegex.test(PN)) {
      setValidPN(false);
    } else {
      const PhoneHead = PN.substring(0, 3);

      if (PhoneHead === "010") {
        setValidPN(true);
      } else {
        setValidPN(false);
      }
    }
  };

  useEffect(() => {
    validateId(inputData.loginId);
    validatePw(inputData.loginPassword);
    validateBD(inputData.birthDay);
    validateEmail(inputData.email);
    validatePN(inputData.tel);
  }, [
    inputData.loginId,
    inputData.loginPassword,
    inputData.birthDay,
    inputData.email,
    inputData.tel,
  ]);

  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  // 이메일 인증 형식
  const [code, setCode] = useState("");
  const [checkCode, setCheckCode] = useState("");
  const [check, setCheck] = useState(false);

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const checkemail = () => {
    if (checkCode === code) setCheck(true);
    else setCheck(false);
  };

  // 도로명 주소 추가
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
    axios
      .post("api/v1/account/verify/join", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("ok");
        setCheckCode(response.data.code);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  // 에러 모달 처리
  const Toast = Swal.mixin({
    toast: true,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  // 회원가입 axios 요청
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validId) {
      Toast.fire({
        icon: "error",
        title: "ID 형식이 맞지않습니다.",
      });
    } else if (!validPw) {
      Toast.fire({
        icon: "error",
        title: "비밀번호 형식이 맞지않습니다.",
      });
    } else if (passwordError) {
      Toast.fire({
        icon: "error",
        title: "비밀번호 확인이 맞지 않습니다.",
      });
    } else if (!validBD) {
      Toast.fire({
        icon: "error",
        title: "생년월일 형식이 맞지않습니다.",
      });
    } else if (!validEmail) {
      Toast.fire({
        icon: "error",
        title: "이메일 형식이 맞지않습니다.",
      });
    } else if (!check) {
      Toast.fire({
        icon: "error",
        title: "이메일 인증을 하지 않으셨습니다.",
      });
    } else if (!validPN) {
      Toast.fire({
        icon: "error",
        title: "전화번호 형식이 맞지않습니다.",
      });
    } else {
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
          console.log("ok");
          props.handleChecklogin();
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  };

  const middle = "flex justify-center items-center";

  return (
    <div>
      <div className={`${middle} MSignup rounded-b-2xl mt-6 mb-3`}>
        <form onSubmit={handleSubmit} className="" style={{ width: "400px" }}>
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
          {inputData.loginId.length > 0 && !validId && (
            <p className="text-sm ml-2 mt-1" style={{ color: "red" }}>
              영소문자와 숫자 조합으로 4글자 이상 16글자 이하로 입력해주세요.
            </p>
          )}
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
            {inputData.loginPassword.length > 0 && !validPw && (
              <p className="text-sm ml-2 mt-1" style={{ color: "red" }}>
                영문자,숫자,특수문자 조합으로 6글자 이상 14글자 이하로
                입력해주세요.
              </p>
            )}
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
              <span className="text-sm" style={{ color: "red" }}>
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
              placeholder="생년월일을 입력해주세요  ex) 2023-01-01"
              onChange={(e) => {
                changeInput(e);
              }}
              name="birthDay"
              value={inputData.birthDay}
            ></input>
          </div>
          {inputData.birthDay.length > 0 && !validBD && (
            <p className="text-sm ml-2 mt-1" style={{ color: "red" }}>
              생년월일 형식에 맞게 작성해주세요
            </p>
          )}
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
          {inputData.email.length > 0 && !validEmail && (
            <p className="text-sm ml-2 mt-1" style={{ color: "red" }}>
              이메일 형식에 맞게 작성해주세요
            </p>
          )}
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
              placeholder="전화번호를 입력해주세요 ex) 010-0000-0000"
              name="tel"
              value={inputData.tel}
              onChange={(e) => {
                changeInput(e);
              }}
            ></input>
          </div>
          {inputData.tel.length > 0 && !validPN && (
            <p className="text-sm ml-2 mt-1" style={{ color: "red" }}>
              전화번호 형식에 맞게 작성해주세요
            </p>
          )}
          <br />
          <div className="my-3">
            <Button
              content="회원가입"
              variant="success"
              type="submit"
              customStyles={{ width: "100%" }}
            />
          </div>
          <div className="mt-4 pb-5 text-lg font-bold flex-col text-center">
            <span className="text-xl">병원을 등록하고 싶으신가요?</span>
            <br />
            <span className="mx-2">위에</span>
            <span className="text-red">토글 버튼</span>
            <span className=""> 을 통해</span>
            <br />
            <span className="mx-2">병원 회원가입으로 가세요!</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemberSignup;
