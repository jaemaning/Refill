import React, { useState, useEffect } from "react";
import axios from "axios";
// 토큰가져오기
import { RootState } from "store/reducers";
import { useSelector } from "react-redux";
// 하위 컴포넌트
import ConsultingListItem from "./ConsultingListItem";

type consultData = {
  consultingId: number;
  hospitalName: string;
  doctorName: string;
  startDateTime: string;
};

// axios 요청을 위한 memberId 받아오기
interface ConsultingListProps {
  memberId: number;
}

const ConsultingList: React.FC<ConsultingListProps> = ({ memberId }) => {
  // 토큰
  const token = useSelector((state: RootState) => state.login.token);
  // ConsultingList 받기
  const [consList, setConsList] = useState<consultData[]>();

  // axios 호출 함수
  const getConsultingList = () => {
    console.log(memberId)
    axios
    .get(`/api/v1/consulting/${memberId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    .then((res) => {
      console.log(res)
      setConsList(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    getConsultingList();
  }, [])

  return (
  <div className="scroll-ai-box">
    {
      consList?.map((consListItem, index) => (
        <div key={index}>
          <ConsultingListItem consListItem={consListItem} />
        </div>
      ))
    }
  </div>
  );
};
export default ConsultingList;
