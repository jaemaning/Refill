import React, { useState } from "react";
import "../../styles/Switch.css";

interface ToggleSwitchProps {
  label: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={`toggle-switch ${isChecked ? "checked" : "unchecked"}`}>
      <label>{label}</label>
      <div className="switch" onClick={handleToggle}>
        <div className="slider"></div>
      </div>
    </div>
  );
};

export default ToggleSwitch;
