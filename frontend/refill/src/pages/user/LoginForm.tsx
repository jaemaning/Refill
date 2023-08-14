import React, { useState } from "react";
import ToggleSwitch from "components/elements/ToggleSwitch";
import MemberLogin from "../../components/loginsignup/MemberLogin";
import LoginLeftForm from "components/loginsignup/LoginLeftForm";
import "../../styles/Loginsignup.css";
import styled from "@emotion/styled";
import LoginSelect from "components/loginsignup/LoginSelect";
import HospitalLogin from "components/loginsignup/HospitalLogin";
import MemberSignup from "components/loginsignup/MemberSignup";
import HospitalSignup from "components/loginsignup/HospitalSignup";

const LoginSingupForm = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const LoginForm: React.FC = () => {
  const [ismember, setisMeber] = useState(true);
  const [loginpage, setLoginpage] = useState(true);

  const handleToggleMember = () => {
    setisMeber(!ismember); // ismember 값을 변경하는 함수
  };

  const handleChecklogin = () => {
    setLoginpage(!loginpage);
  };

  return (
    <div className={`${ismember ? "MemberForm" : "HospitalForm"} flex`}>
      <div className="Common_Left">
        <LoginLeftForm />
      </div>
      <div className="flex-col justify-center items-center Common_Right py-14">
        <div className="flex">
          {" "}
          {/* 수정 */}
          <div style={{ width: "180x" }}>
            <ToggleSwitch
              ismember={ismember}
              onText="환자"
              offText="병원"
              handleToggle={handleToggleMember}
            />
          </div>
          <div style={{ width: "300px" }} className="pl-6">
            <span className="text-2xl font-bold text-center text-white">
              {ismember && loginpage
                ? "일반 로그인"
                : !ismember && loginpage
                ? "병원 로그인"
                : ismember && !loginpage
                ? "일반회원 가입"
                : "병원 회원 가입"}
            </span>
          </div>
        </div>
        <div className="flex-col justify-center items-center">
          <LoginSelect
            loginpage={loginpage}
            handleChecklogin={handleChecklogin}
          ></LoginSelect>
          <LoginSingupForm className="rounded-b-2xl">
            {ismember && loginpage ? (
              <MemberLogin />
            ) : !ismember && loginpage ? (
              <HospitalLogin />
            ) : ismember && !loginpage ? (
              <MemberSignup handleChecklogin={handleChecklogin} />
            ) : (
              <HospitalSignup />
            )}
          </LoginSingupForm>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
