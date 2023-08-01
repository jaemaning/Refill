import React, { useState } from "react";

type RadioButtonProps = {
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label: string;
};

const RadioButton: React.FC<RadioButtonProps> = ({
  value,
  checked,
  onChange,
  label,
}) => {
  const handleClick = () => {
    onChange(value);
  };

  const divStyle = checked
    ? { background: "blue", color: "white" }
    : { background: "white", color: "black" };

  return (
    <div style={divStyle} onClick={handleClick} className="button">
      {label}
    </div>
  );
};

const RadioDiv = () => {
  const [selected, setSelected] = useState("option1");

  return (
    <div className="space-y-2">
      <RadioButton
        value="option1"
        checked={selected === "option1"}
        onChange={setSelected}
        label="Option 1"
      />

      <RadioButton
        value="option2"
        checked={selected === "option2"}
        onChange={setSelected}
        label="Option 2"
      />
    </div>
  );
};

export default RadioDiv;
