import React, { useState, useEffect } from "react";
import Social from "components/common/Social";
import Button from "../elements/Button";
import "../../styles/Loginsignup.css";
import UseLoginForm from "hooks/UseLoginForm";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const HospitalLogin: React.FC = () => {
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const { handleSubmitLoginForm, message: msg } = UseLoginForm(
    loginId,
    loginPassword,
    1,
  );

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginId(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginPassword(event.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmitLoginForm(); // 로그인 함수 호출
  };

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

  useEffect(() => {
    if (msg.length > 0) {
      Toast.fire({
        icon: "error",
        title: `${msg}`,
      });
    }
  }, [msg]);

  const middle = "flex justify-center items-center";

  return (
    <div>
      <div className={`${middle} MLogin rounded-b-2xl`}>
        <form
          onSubmit={handleFormSubmit}
          className=""
          style={{ width: "450px" }}
        >
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
              value={loginId}
              onChange={handleIdChange}
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
              placeholder="비밀번호를 입력해주세요"
              value={loginPassword}
              onChange={handlePasswordChange}
            ></input>
          </div>
          <div className="flex justify-end my-3">
            <Link to="/find" className="text-sm font-medium text-blue-600">
              아이디 & 비밀번호 찾기
            </Link>
          </div>
          <div className="my-3">
            <Button
              content="로그인"
              variant="warning"
              width="200px"
              type="submit"
              customStyles={{ width: "100%" }}
            />
          </div>
          <div className="text-lg font-bold flex-col items-center text-center mt-6">
            <span className="mx-2">병원 회원이 아니십니까?</span>
            <br />
            <span className="mx-2">위에</span>
            <span className="text-red">토글 버튼</span>
            <span className=""> 을 통해</span>
            <br />
            <span className="mx-2">일반 로그인으로 가세요!</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HospitalLogin;
