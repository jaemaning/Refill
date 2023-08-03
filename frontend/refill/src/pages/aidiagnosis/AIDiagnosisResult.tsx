import React, {useEffect} from "react";
import Navbar from "components/Navbar";
import ImgItem from "components/aidiagnosis/resultItems/ImgItem";
import ContentItem from "components/aidiagnosis/resultItems/ContentItem";
import ChartItem from "components/aidiagnosis/resultItems/ChartItem";
import RightImg from "assets/aidiagnosis/right_img.png";
import ContentChild from "components/aidiagnosis/children/ContentChild";

const AIDiagnosisResult: React.FC = () => {
  const colOneStart = "col-start-1"
  const colThreeStart = "col-start-3"
  const colThreeEnd = "col-end-3"
  const colFiveEnd = "col-end-5" 
  const colFiveStart = "col-start-5"
  const colEightEnd = "col-end-8"

  useEffect(() => {
    window.scrollTo(0, 106);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="aid-result h-full w-full pt-2 min-h-screen">
        <div className="grid grid-rows-2 gap-4 lg:mx-30 md:mx-20 sm:mx-10">
          <div className="aid-result-row grid grid-cols-7 gap-10">
            <ImgItem src="" title="현재 사진" colStart={colOneStart} colEnd={colThreeEnd} />
            <ImgItem src={`${RightImg}`} title="모범 사진" colStart={colThreeStart} colEnd={colFiveEnd} content="*위 모범사진처럼 촬영시 정확도가 상승하여보다 정확한 AI 자가진단이 가능합니다."/>
            <ContentItem colStart={`${colFiveStart}`} colEnd={`${colEightEnd}`} title="서비스" content1={<ContentChild />} content2={<ContentChild />}/>
          </div>
          <div className="aid-result-row grid grid-cols-7 gap-10">
            <ChartItem result={80} title="AI 정확도" colStart={colOneStart} colEnd={colThreeEnd} content="*올려주신 사진을 바탕으로 진행한 AI 탈모 진행 예측의 
정확도를 계산한 수치입니다."/>
            <ChartItem result={75} title="탈모 진행도" colStart={colThreeStart} colEnd={colFiveEnd} content="*AI가 진단한 탈모 진행 예측 결과입니다." />
            <ContentItem colStart={`${colFiveStart}`} colEnd={`${colEightEnd}`} title="상세 결과" content1={<ContentChild />} content2={<ContentChild />}/>
          </div>
          <div className="bg-white h-20 w-full bg-sky-300 mb-5 px-14 flex items-center">
            <ul className="list-disc font-black text-black text-base">
              <li>본 AI 진단 서비스는 전문의가 진단한 결과가 아닙니다. 실재 탈모 진단은 병원을 방문하셔서 정확한 진단을 받으시거나 <span className="text-orange">AI 상담 서비스</span>틀 통해 전문의와 상담하시는 것을 추천드립니다. </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AIDiagnosisResult;
