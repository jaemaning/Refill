import React, { useState } from "react";
import "../../styles/Switch.css";

interface ToggleSwitchProps {
  ismember: boolean;
  onText: string;
  offText: string;
  handleToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  ismember,
  onText,
  offText,
  handleToggle,
}) => {
  const [ischeck, setIsChecked] = useState(ismember);

  const handleSwitchToggle = () => {
    setIsChecked(!ischeck);
    handleToggle(); // 변경: 부모로부터 전달된 함수 호출
  };

  return (
    <div className="flex justify-center align-middle my-3">
      <div
        className={`toggle-switch ${ismember ? "checked" : "unchecked"}`}
        style={{ margin: "auto" }}
      >
        <div
          className={`switch ${ismember ? "checked" : "unchecked"}`}
          onClick={handleSwitchToggle}
        >
          <span
            className={`on-text ml-2 ${ismember ? "checked" : "unchecked"}`}
          >
            {onText}
          </span>
          <span
            className={`off-text ml-16 ${ismember ? "checked" : "unchecked"}`}
          >
            {offText}
          </span>
          <div className={`slider ${ismember ? "checked" : "unchecked"}`}></div>
        </div>
      </div>
    </div>
  );
};

export default ToggleSwitch;
