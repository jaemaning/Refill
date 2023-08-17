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
  loginId: string;
}

const DummyData = [
  {
    consultingId: 1,
    hospitalName: "오라클병원",
    doctorName: "이의사",
    startDateTime: "2023-08-10T10:30:00",
  },
  {
    consultingId: 2,
    hospitalName: "오라클병원",
    doctorName: "김의사",
    startDateTime: "2023-08-10T11:30:00",
  },
  {
    consultingId: 3,
    hospitalName: "오라클병원",
    doctorName: "박의사",
    startDateTime: "2023-08-10T12:30:00",
  },
  {
    consultingId: 1,
    hospitalName: "오라클병원",
    doctorName: "이의사",
    startDateTime: "2023-08-10T10:30:00",
  },
  {
    consultingId: 2,
    hospitalName: "오라클병원",
    doctorName: "김의사",
    startDateTime: "2023-08-10T11:30:00",
  },
  {
    consultingId: 3,
    hospitalName: "오라클병원",
    doctorName: "박의사",
    startDateTime: "2023-08-10T12:30:00",
  },
  {
    consultingId: 1,
    hospitalName: "오라클병원",
    doctorName: "이의사",
    startDateTime: "2023-08-10T10:30:00",
  },
  {
    consultingId: 2,
    hospitalName: "오라클병원",
    doctorName: "김의사",
    startDateTime: "2023-08-10T11:30:00",
  },
  {
    consultingId: 3,
    hospitalName: "오라클병원",
    doctorName: "박의사",
    startDateTime: "2023-08-10T12:30:00",
  },
];

const ConsultingList: React.FC<ConsultingListProps> = ({ loginId }) => {
  // 토큰
  const token = useSelector((state: RootState) => state.login.token);
  // ConsultingList 받기
  const [consList, setConsList] = useState<consultData[]>();
  // axios 호출 함수
  const getConsultingList = () => {
    axios
      .get(`/api/v1/consulting/${loginId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("ok")
        setConsList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getConsultingList();
  }, []);

  return (
    <div className="scroll-ai-box">
      {/* {DummyData.map((consListItem, index) => (
        <div key={index}>
          <ConsultingListItem consListItem={consListItem} />
        </div>
      ))} */}
      {consList?.map((consListItem, index) => (
        <div key={index}>
          <ConsultingListItem consListItem={consListItem} />
        </div>
      ))}
    </div>
  );
};
export default ConsultingList;
