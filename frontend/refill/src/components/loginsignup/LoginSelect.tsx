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
  const [isloginpage, setIsLoginpage] = useState(loginpage);

  const handleLoginPage = () => {
    setIsLoginpage(!isloginpage);
    handleChecklogin();
  };

  return (
    <div className="flex">
      <Button
        content="로그인"
        variant={isloginpage ? "selectSelected" : "selectUnselected"}
        width="250px"
        onClick={handleLoginPage}
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
        variant={isloginpage ? "selectUnselected" : "selectSelected"}
        width="250px"
        onClick={handleLoginPage}
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
