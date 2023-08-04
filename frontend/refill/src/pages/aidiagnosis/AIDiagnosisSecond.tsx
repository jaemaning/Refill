import Navbar from "components/Navbar";
import React, { useEffect, useState } from "react";
import Footer from "components/Footer";
import NextPrevButtons from "components/aidiagnosis/NextPrevButtons";
import HeadAID from "components/aidiagnosis/HeadAID";
import CautionBox from "components/aidiagnosis/CautionBox";
import GuideLine from "components/aidiagnosis/GuideLine";
import PhotoGuideLine from "components/aidiagnosis/PhotoGuideLine";
import UploadImgItem from "components/aidiagnosis/children/UploadImgItem";
import { useLocation } from "react-router-dom";

const AIDiagnosisSecond: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 106);
  }, []);

  const [imgFile, setImgFile] = useState<File | null>(null);

  const handleChange = (file: File | null) => {
    setImgFile(file); // 선택된 이미지 파일을 상태로 저장
  };

  // useLocation 훅을 이용해 이전 페이지에서 넘겨받은 arrayString을 받습니다.
  // 이전 코드에서 타입 명시를 제거하였습니다.
  const location = useLocation();
  const arrayString = location.state?.arrayString as string;

  return (
    <div>
      <Navbar />
      <HeadAID title="사전진단 (AI진단)" />
      <div className="flex justify-center">
        <div className="guide-line sm:min-w-full md:w-11/12 lg:w-5/6">
          <GuideLine />
          <PhotoGuideLine />
          <UploadImgItem onChange={handleChange} />
        </div>
      </div>
      <CautionBox />
      <NextPrevButtons
        isResult={true}
        nextLink="/diagnosisResult"
        arrayString={arrayString}
        imgFile={imgFile}
      />
      <Footer />
    </div>
  );
};
export default AIDiagnosisSecond;
