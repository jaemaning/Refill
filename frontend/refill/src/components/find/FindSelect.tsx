import React, { useState } from "react";
import Button from "../../components/elements/Button";

interface checkSelect {
  isfindid: boolean;
  handdleSelect: () => void;
}

const FindSelect: React.FC<checkSelect> = ({ isfindid, handdleSelect }) => {
  const [ischeck, setIsChecked] = useState(isfindid);

  const handleCheck = () => {
    setIsChecked(!ischeck);
    handdleSelect();
  };

  return (
    <div className="flex">
      <Button
        content="아이디 찾기"
        variant={ischeck ? "selectSelected" : "selectUnselected"}
        width="250px"
        onClick={handleCheck}
        customStyles={{
          borderTopLeftRadius: "7px",
          borderTopRightRadius: "7px",
          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "0px",
          boxShadow: "none",
        }}
      />
      <Button
        content="비밀번호 찾기"
        variant={ischeck ? "selectUnselected" : "selectSelected"}
        width="250px"
        onClick={handleCheck}
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

export default FindSelect;
