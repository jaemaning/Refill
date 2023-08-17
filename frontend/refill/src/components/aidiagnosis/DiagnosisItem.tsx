import React, { useState } from "react";

interface DiagnosisItemProps {
  title: string;
  index: number; // Add index prop
  onChange: (value: string, index: number) => void;
}

const DiagnosisItem: React.FC<DiagnosisItemProps> = ({
  title,
  index,
  onChange,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
    onChange(event.target.value, index);
  };

  return (
    <div className="flex justify-center">
      <div className="diagnosis-item sm:min-w-full sm:h-16 md:w-11/12 md:h-20 lg:w-5/6 lg:h-20 px-10 grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <span className="ml-10 font-black sm:text-lg md:text-xl lg:text-2xl">
            {title}
          </span>
        </div>
        <div className="grid grid-cols-2">
          <div className="flex items-center justify-start">
            <input
              type="radio"
              id={`option1-${title}`} // 유니크한 ID 생성
              name={`radio-${title}`} // 유니크한 name 생성
              value="option1"
              checked={selectedOption === "option1"}
              onChange={handleOptionChange}
              className="form-radio h-5 w-5 text-blue-500"
            />
            <label htmlFor={`option1-${title}`} className="ml-2">
              네 그렇습니다.
            </label>
          </div>
          <div className="flex items-center justify-start">
            <input
              type="radio"
              id={`option2-${title}`} // 유니크한 ID 생성
              name={`radio-${title}`} // 유니크한 name 생성
              value="option2"
              checked={selectedOption === "option2"}
              onChange={handleOptionChange}
              className="form-radio h-5 w-5 text-blue-500"
            />
            <label htmlFor={`option2-${title}`} className="ml-2">
              아니오 그렇지 않습니다.
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisItem;
