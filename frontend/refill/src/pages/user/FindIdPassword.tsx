import React, { useState } from "react";
import ToggleSwitch from "components/elements/ToggleSwitch";
import FindId from "components/find/FindId";
import FindPassword from "components/find/FindPassword";
import FindSelect from "components/find/FindSelect";
import styled from "@emotion/styled";
import "../../styles/Loginsignup.css";
import Social from "components/common/Social";
import { Link } from "react-router-dom";
import app_logo from "../../assets/app_logo.png";

const FindForm = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 500px;
  height: 450px;
`;

const FindIdPassword: React.FC = () => {
  const [ismember, setisMeber] = useState(true);
  const [isfindid, setisFindId] = useState(true);

  const handleFindCheck = () => {
    setisFindId(!isfindid);
  };

  const handleToggleMember = () => {
    setisMeber(!ismember); // ismember 값을 변경하는 함수
  };

  console.log(ismember);
  return (
    <div
      className={`${
        ismember ? "MemberForm" : "HospitalForm"
      } flex justify-center items-center`}
    >
      <div className="flex-col justify-center items-center">
        <div className="flex justify-around items-center">
          <ToggleSwitch
            ismember={ismember}
            onText="환자"
            offText="병원"
            handleToggle={handleToggleMember}
          />
          <span className="text-2xl font-bold text-center">
            {ismember ? "일반회원" : "병원회원"}
          </span>
          <Link to="/" className="flex items-center">
            <img
              src={app_logo}
              alt="nav_log"
              style={{ width: "100px", height: "100px" }}
            />
          </Link>
        </div>
        <div className="flex-col justify-center items-center">
          <FindSelect
            isfindid={isfindid}
            handdleSelect={handleFindCheck}
          ></FindSelect>
          <FindForm className="rounded-b-2xl">
            {isfindid ? (
              <FindId ismember={ismember} />
            ) : (
              <FindPassword ismember={ismember} />
            )}
            <div>
              <Social />
            </div>
          </FindForm>
        </div>
      </div>
    </div>
  );
};

export default FindIdPassword;
