import React, {useEffect} from "react";
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

  return (
    <div>
      <Navbar />
      <HeadAID title="사전진단 (문항형)"/>
      <div className="content-large-box flex-col ">
        <DiagnosisItem title="1. 이마가 점점 넓어지는 느낌이 든다." />
        <DiagnosisItem title="2. 가늘고 힘없는 머리가 많이 빠진다." />
        <DiagnosisItem title="3. 머리카락이 하루에 100개 이상 빠진다." />
        <DiagnosisItem title="4. 비듬이 많아지거나 두피가 가렵다." />
        <DiagnosisItem title="5. 모발이 가늘어지고 부드러워졌다." />
        <DiagnosisItem title="6. 두피를 눌러보면 가벼운 통증이 느껴진다." />
        <DiagnosisItem title="7. 앞쪽과 뒤쪽 머리카락의 굵기 차이가 크다." />
        <DiagnosisItem title="8. 몸의 털이 갑자기 굵어졌다." />
        <DiagnosisItem title="9. 이마와 정수리 부분이 유난히 번들거린다." />
        <DiagnosisItem title="10. 두피에 피지량이 갑자기 늘어난 것 같다." />
        <CautionBox />
        <NextPrevButtons NextLink="/diagnosis/second" />
      </div>
      
      <Footer />
    </div>
  );
};
export default AIDiagnosis;
