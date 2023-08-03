import React, { useState } from "react";
const CautionBox: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("option1");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="flex justify-center">
      <div className="caution-box sm:min-w-full sm:h-12 md:w-11/12 md:h-14 lg:w-5/6 lg:h-20 px-10 flex items-center">
      <ul className="list-disc font-black">
  <li> 본 진단은 전문의가 수행한 것이 아님을 명시합니다.</li>
  <li> 상담에 참고하기 위한 자료 또는 탈모 예방의 용도로 사용됩니다.</li>
</ul>
        <div></div>
      </div>
    </div>
  );
};
export default CautionBox;
