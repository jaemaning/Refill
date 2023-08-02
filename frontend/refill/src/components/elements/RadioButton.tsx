import React, { useState } from "react";
import { REFILL_COLORS } from "../../assets/getColors.js";
import styled from "@emotion/styled";

type RadioButtonProps = {
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label: string;
};

type RadioDivProps = {
  selected: string;
  setSelected: (value: string) => void;
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

  const baseStyle = {
    width: "470px",
    height: "60px",
    display: "flex",
    justifyContent: "center" as const,
    alignItems: "center" as const,
    borderRadius: "5px",
    cursor: "pointer",
  };

  const selectStyle = checked
    ? { background: REFILL_COLORS["rf-3"], color: REFILL_COLORS["white"] }
    : { background: "white", color: "black" };

  const divStyle = { ...baseStyle, ...selectStyle };

  return (
    <div style={divStyle} onClick={handleClick} className="button">
      {label}
    </div>
  );
};

const RadioDiv: React.FC<RadioDivProps> = ({ selected, setSelected }) => {
  const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    width: 1000px;
    margin-bottom: 20px;
  `;

  return (
    <Container>
      <RadioButton
        value="option1"
        checked={selected === "option1"}
        onChange={setSelected}
        label="지도로 찾기"
      />
      <RadioButton
        value="option2"
        checked={selected === "option2"}
        onChange={setSelected}
        label="검색으로 찾기"
      />
    </Container>
  );
};

export default RadioDiv;
