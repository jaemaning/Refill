import React, { useRef } from "react";
// import { REFILL_COLORS } from "../../assets/getColors.js";
import styled from "@emotion/styled";
import Button from "./Button";

type RadioButtonProps = {
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label: string;
  maxWidth: string;
};

type RadioDivProps = {
  selected: string;
  setSelected: (value: string) => void;
  maxWidth: string;
};

const RadioButton: React.FC<RadioButtonProps> = ({
  value,
  checked,
  onChange,
  label,
  maxWidth,
}) => {
  const handleClick = () => {
    onChange(value);
  };

  const variant = checked ? "selected" : "unselected";
  const btnMaxWidth = parseInt(maxWidth) / 2 - 30;

  return (
    <Button
      width={btnMaxWidth + "px"}
      content={label}
      variant={variant}
      onClick={handleClick}
    />
  );
};

const RadioDiv: React.FC<RadioDivProps> = ({
  selected,
  setSelected,
  maxWidth,
}) => {
  const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    width: ${maxWidth + "px"};
    margin-bottom: 20px;
  `;

  return (
    <Container>
      <RadioButton
        value="option1"
        checked={selected === "option1"}
        onChange={setSelected}
        label="지도로 찾기"
        maxWidth={maxWidth}
      />
      <RadioButton
        value="option2"
        checked={selected === "option2"}
        onChange={setSelected}
        label="검색으로 찾기"
        maxWidth={maxWidth}
      />
    </Container>
  );
};

export default RadioDiv;
