import Navbar from "components/Navbar";
import React, {useEffect} from "react";
import Footer from "components/Footer";
import NextPrevButtons from "components/aidiagnosis/NextPrevButtons";
import HeadAID from "components/aidiagnosis/HeadAID";
import CautionBox from "components/aidiagnosis/CautionBox";
import GuideLine from "components/aidiagnosis/GuideLine";
import PhotoGuideLine from "components/aidiagnosis/PhotoGuideLine";
import UploadImgItem from "components/aidiagnosis/children/UploadImgItem";

const AIDiagnosisSecond: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 106);
  }, []);
  return (
    <div>
      <Navbar />
      <HeadAID title="사전진단 (AI진단)" />
      <div className="flex justify-center">
        <div className="guide-line sm:min-w-full md:w-11/12 lg:w-5/6">
          <GuideLine />
          <PhotoGuideLine />
          <UploadImgItem />
        </div>
      </div>
      <CautionBox />
      <NextPrevButtons NextLink="/diagnosis/result" />
      <Footer />
    </div>
  );
};
export default AIDiagnosisSecond;
