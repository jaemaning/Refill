import React, { useState } from "react";
import Social from "components/common/Social";
import Button from "../elements/Button";
import "../../styles/Loginsignup.css";
import UseLoginForm from "hooks/UseLoginForm";
import LoginSignupModal from "components/loginsignup/LoginSignupModal";
import { Link } from "react-router-dom";

const HospitalLogin: React.FC = () => {
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const {
    handleSubmitLoginForm,
    message: msg,
    openModal: open,
  } = UseLoginForm(loginId, loginPassword, 1);
  const [showModal, setShowModal] = useState(false);

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginId(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginPassword(event.target.value);
  };

  const handleCloseForm = () => {
    setShowModal(false);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmitLoginForm(); // 로그인 함수 호출

    // 로그인 시도 후 모달 데이터가 설정되면 모달 표시
    setShowModal(true);
  };

  const middle = "flex justify-center items-center";

  return (
    <div>
      <div className={`${middle} MLogin rounded-b-2xl`}>
        <form onSubmit={handleFormSubmit} className="" style={{ width: "80%" }}>
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
          <div className="text-md font-bold flex-col items-center text-center mt-4">
            <span className="mx-2">병원 회원이 아니십니까?</span>
            <br />
            <span className="mx-2">위에</span>
            <span className="text-red">토글 버튼</span>
            <span className=""> 을 통해</span>
            <br />
            <span className="mx-2">일반 로그인으로 가세요!</span>
            <div className="mt-3">
              <span className="">다른 계정으로 로그인하기</span>
            </div>
          </div>
          <div className="flex justify-center">
            <Social />
          </div>
        </form>
      </div>
      {showModal && (
        <LoginSignupModal message={msg} open={open} onClose={handleCloseForm} />
      )}
    </div>
  );
};

export default HospitalLogin;
