import React, { useState, useEffect } from "react";
import axios from "axios";
// 토큰가져오기
import { RootState } from "store/reducers";
import { useSelector } from "react-redux";
// 하위 컴포넌트
import AiDiaListItem from "./AiDiaListItem";

// AiDiagnosisListResponse
type aiDiagnosisData = {
  id: number;
  diagnosisDate: string;
  hairLossScore: number;
  certainty: number;
  diagnosisImage: string;
};

// axios 요청을 위한 memberId 받아오기
interface AiDiagnosisListProps {
  memberId?: number;
}

const AiDiagnosisList: React.FC<AiDiagnosisListProps> = ({ memberId }) => {
  // 토큰
  const token = useSelector((state: RootState) => state.login.token);
  // AiDiagnosisList 받기
  const [aiList, setAiList] = useState<aiDiagnosisData[]>();

  // AiDiagnosisList axios 호출
  const getAiDiagnosisList = () => {
    axios
      .get(`/api/v1/diagnosis/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setAiList(res.data);
        // 요청이 성공적으로 완료된 경우, 필요한 추가 동작을 여기에 작성합니다.
      })
      .catch((err) => {
        console.log(err);
        // 오류가 발생한 경우, 오류 처리 로직을 여기에 작성합니다.
      });
  };

  useEffect(() => {
    getAiDiagnosisList();
  }, []);

  return (
    <div className="scroll-ai-box">
      {aiList?.map((aiListItem, index) => (
        <div key={index}>
          <AiDiaListItem aiListItem={aiListItem} />
        </div>
      ))}
    </div>
  );
};
export default AiDiagnosisList;
