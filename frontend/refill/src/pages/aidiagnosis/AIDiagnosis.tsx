import React, { useEffect, useState } from "react";
import "../../styles/AIDiagnosis.css";
import DiagnosisItem from "components/aidiagnosis/DiagnosisItem";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import CautionBox from "components/aidiagnosis/CautionBox";
import NextPrevButtons from "components/aidiagnosis/NextPrevButtons";
import HeadAID from "components/aidiagnosis/HeadAID";

const AIDiagnosis: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 106);
  }, []);

  // 선택한 문항을 array값에서 변환해준다.
  const [resultArray, setResultArray] = useState<string[]>(Array(10).fill("N"));
  const handleOptionChange = (value: string, index: number) => {
    setResultArray((prev) => {
      const newArr = [...prev];
      newArr[index] = value === "option1" ? "1" : "0";
      return newArr;
    });
  };

  return (
    <div>
      <Navbar />
      <HeadAID title="사전진단 (문항형)" />
      <div className="content-large-box flex-col px-32">
        <DiagnosisItem
          index={0}
          title="1. 이마가 점점 넓어지는 느낌이 든다."
          onChange={handleOptionChange}
        />
        <DiagnosisItem
          index={1}
          title="2. 가늘고 힘없는 머리가 많이 빠진다."
          onChange={handleOptionChange}
        />
        <DiagnosisItem
          index={2}
          title="3. 머리카락이 하루에 100개 이상 빠진다."
          onChange={handleOptionChange}
        />
        <DiagnosisItem
          index={3}
          title="4. 비듬이 많아지거나 두피가 가렵다."
          onChange={handleOptionChange}
        />
        <DiagnosisItem
          index={4}
          title="5. 모발이 가늘어지고 부드러워졌다."
          onChange={handleOptionChange}
        />
        <DiagnosisItem
          index={5}
          title="6. 두피를 눌러보면 가벼운 통증이 느껴진다."
          onChange={handleOptionChange}
        />
        <DiagnosisItem
          index={6}
          title="7. 앞쪽과 뒤쪽 머리카락의 굵기 차이가 크다."
          onChange={handleOptionChange}
        />
        <DiagnosisItem
          index={7}
          title="8. 몸의 털이 갑자기 굵어졌다."
          onChange={handleOptionChange}
        />
        <DiagnosisItem
          index={8}
          title="9. 이마와 정수리 부분이 유난히 번들거린다."
          onChange={handleOptionChange}
        />
        <DiagnosisItem
          index={9}
          title="10. 두피에 피지량이 갑자기 늘어난 것 같다."
          onChange={handleOptionChange}
        />
        <CautionBox />
        <NextPrevButtons
          nextLink="/diagnosisSecond"
          arrayString={resultArray.join("")}
        />
      </div>

      <Footer />
    </div>
  );
};
export default AIDiagnosis;
