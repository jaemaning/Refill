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
  return (
    <label className="inline-flex items-center">
      <input
        type="radio"
        className="form-radio text-blue-500 h-5 w-5"
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
      />
      <span className="ml-2">{label}</span>
    </label>
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

      <RadioButton
        value="option3"
        checked={selected === "option3"}
        onChange={setSelected}
        label="Option 3"
      />
    </div>
  );
};

export default RadioDiv;
