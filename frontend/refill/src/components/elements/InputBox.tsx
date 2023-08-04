import styled from "@emotion/styled";
import tw from "twin.macro";
import React from "react";

interface InputBoxType {
  type?: string;
  value: string | null;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string | null;
  handlefunc? : (e: any)=> void;
}

const StyleInputBox = styled.input(() => [
  tw`
    bg-gray-50
    border 
    border-gray-300 
    text-gray-900 
    sm:text-sm 
    rounded-lg 
    focus:ring-sky-600 
    focus:border-sky-600 
    block w-full 
    p-2.5 
    mx-3
  `,
]);

export const InputBox: React.FC<InputBoxType> = ({
  type = "text",
  value,
  onChange,
  placeholder,
  handlefunc
}) => {
  return (
    <StyleInputBox
      value={value || ""}
      onChange={onChange}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          // e.preventDefault();
          e.nativeEvent.stopImmediatePropagation();
          if (handlefunc) {
            handlefunc(e);
          }
        }
      }}
      placeholder={placeholder || ""}
      type={type}
    />
  );
};
