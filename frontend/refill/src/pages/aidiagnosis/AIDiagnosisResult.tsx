import React, { useEffect } from "react";
import Navbar from "components/Navbar";
import ImgItem from "components/aidiagnosis/resultItems/ImgItem";
import ContentItem from "components/aidiagnosis/resultItems/ContentItem";
import ChartItem from "components/aidiagnosis/resultItems/ChartItem";
import RightImg from "assets/aidiagnosis/right_img.png";
import ContentChild from "components/aidiagnosis/children/ContentChild";
import { useLocation } from "react-router-dom";

const AIDiagnosisResult: React.FC = () => {
  const colOneStart = "col-start-1";
  const colThreeStart = "col-start-3";
  const colThreeEnd = "col-end-3";
  const colFiveEnd = "col-end-5";
  const colFiveStart = "col-start-5";
  const colEightEnd = "col-end-8";

  const location = useLocation();

  // 전달된 state에서 jsonDataString을 추출
  const jsonDataString = location.state.jsonDataString;
  const jsonData = JSON.parse(jsonDataString);

  // jsonData의 각 정보를 변수에 저장
  const hairLossScore = jsonData.hairLossScore;
  const certainty = jsonData.certainty;
  const diagnosisImage = jsonData.diagnosisImage;
  const diagnosisDate = jsonData.diagnosisDate;

  useEffect(() => {
    window.scrollTo(0, 106);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="aid-result h-full w-full pt-2 min-h-screen">
        <div className="grid grid-rows-2 gap-4 lg:mx-30 md:mx-20 sm:mx-10">
          <div className="aid-result-row grid grid-cols-7 gap-10">
            <ImgItem
              src={`https://ssafyfinal.s3.ap-northeast-2.amazonaws.com/${diagnosisImage}`}
              title="현재 사진"
              colStart={colOneStart}
              colEnd={colThreeEnd}
            />
            <ImgItem
              src={`${RightImg}`}
              title="모범 사진"
              colStart={colThreeStart}
              colEnd={colFiveEnd}
              content="*위 모범사진처럼 촬영시 정확도가 상승하여보다 정확한 AI 자가진단이 가능합니다."
            />
            <ContentItem
              colStart={`${colFiveStart}`}
              colEnd={`${colEightEnd}`}
              title="서비스"
              content1={
                <ContentChild
                  service={true}
                  content="AI 진단을 다시 해보고 싶다면 아래 버튼을 클릭해주세요."
                  buttonName="AI 사전진단"
                  connectNextLink="/diagnosis"
                />
              }
              content2={
                <ContentChild
                  service={true}
                  content="전문의와 상담하시길 원하신다면 아래 버튼을 클릭해주세요."
                  buttonName="상담예약"
                  connectNextLink="/search"
                />
              }
            />
          </div>
          <div className="aid-result-row grid grid-cols-7 gap-10">
            <ChartItem
              result={certainty}
              title="AI 정확도"
              colStart={colOneStart}
              colEnd={colThreeEnd}
              content="*올려주신 사진을 바탕으로 진행한 AI 탈모 진행 예측의 
정확도를 계산한 수치입니다."
            />
            <ChartItem
              result={hairLossScore}
              title="탈모 진행도"
              colStart={colThreeStart}
              colEnd={colFiveEnd}
              content="*AI가 진단한 탈모 진행 예측 결과입니다."
            />
            <ContentItem
              colStart={`${colFiveStart}`}
              colEnd={`${colEightEnd}`}
              title="상세 결과"
              content1={
                <ContentChild
                  service={false}
                  content="AI 정확도"
                  subContent="위 모범사진 처럼 여백이 없고 흐릿함이 없는 사진을 업로드
              하게 되시면 더 좋은 결과를 얻을 수 있습니다."
                />
              }
              content2={
                <ContentChild
                  service={false}
                  content="AI 탈모 진행도"
                  subContent="현재 사진을 분석한 결과 원형탈모의 진행률이 65%로 평균
              보다 높은 수치에 속합니다. 자세한 병명 및 진단을 원하시면 병원 내원을 추천드립니다."
                />
              }
            />
          </div>
          <div className="bg-white h-20 w-full bg-sky-300 mb-5 px-14 flex items-center">
            <ul className="list-disc font-black text-black text-base">
              <li>
                본 AI 진단 서비스는 전문의가 진단한 결과가 아닙니다. 실재 탈모
                진단은 병원을 방문하셔서 정확한 진단을 받으시거나{" "}
                <span className="text-orange">AI 상담 서비스</span>틀 통해
                전문의와 상담하시는 것을 추천드립니다.{" "}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AIDiagnosisResult;
