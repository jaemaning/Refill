import React, { useState } from "react";
import Button from "../elements/Button";

interface loginSelect {
  loginpage: boolean;
  handleChecklogin: () => void;
}
const LoginSelect: React.FC<loginSelect> = ({
  loginpage,
  handleChecklogin,
}) => {
  return (
    <div className="flex">
      <Button
        content="로그인"
        variant={loginpage ? "selectSelected" : "selectUnselected"}
        width="250px"
        onClick={handleChecklogin}
        customStyles={{
          borderTopLeftRadius: "7px",
          borderTopRightRadius: "7px",
          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "0px",
          boxShadow: "none",
        }}
      />
      <Button
        content="회원가입"
        variant={loginpage ? "selectUnselected" : "selectSelected"}
        width="250px"
        onClick={handleChecklogin}
        customStyles={{
          borderTopLeftRadius: "7px",
          borderTopRightRadius: "7px",
          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "0px",
          boxShadow: "none",
        }}
      />
    </div>
  );
};

export default LoginSelect;
