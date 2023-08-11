import React from "react";
import Logo_img from "../../assets/logo2_final.png";
import { Link } from "react-router-dom";

const LoginLeftForm: React.FC = () => {
  return (
    <div className="text-3xl" style={{ margin: "200px 0px" }}>
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
      <Link to="/" className="flex items-center">
        <img src={Logo_img} className="Logo_img" alt="" />
      </Link>
    </div>
  );
};

export default LoginLeftForm;
