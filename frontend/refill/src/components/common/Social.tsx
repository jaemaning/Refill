import React from "react";
import Kakao from "../../assets/Kakao_logo.png";
import Naver from "../../assets/Naver_logo.png";
import Google from "../../assets/Google_logo.png";

const Social: React.FC = () => {
  return (
    <div style={{ width: "400px" }}>
      <div className="flex justify-around my-5">
        <div className="flex justify-center flex-col text-center">
          <img src={Google} style={{ width: "50px", height: "50px" }} alt="" />
          <span>Google</span>
        </div>
        <div className="flex justify-center flex-col text-center">
          <img src={Kakao} style={{ width: "50px", height: "50px" }} alt="" />
          <span>Kakao</span>
        </div>
        <div className="flex justify-center flex-col text-center">
          <img src={Naver} style={{ width: "50px", height: "50px" }} alt="" />
          <span>Naver</span>
        </div>
      </div>
    </div>
  );
};

export default Social;
