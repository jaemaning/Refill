import React from "react";
import axios from "axios";
// 토큰가져오기
import { RootState } from "store/reducers";
import { useSelector } from "react-redux";

type Reservation = {
  reservationId: number
  startDate: string;
  memberName: string;
  birthDay: string;
  tel: string;
  counselingDemands: string;
};

interface DetailPatientProps {
  selectedMember: Reservation | null;
  doctorId: number
}

const DetailPatient: React.FC<DetailPatientProps> = ({ selectedMember, doctorId }) => {
  const token = useSelector((state: RootState) => state.login.token);
  
  if (!selectedMember) return null;
  const reservationId = selectedMember.reservationId
  

  const joinPage = (reservationId: number) => {
    console.log(reservationId)
  }



  const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

  const dateObj = new Date(selectedMember.startDate);
  const dayName = days[dateObj.getDay()];

  const formattedDate = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')} (${dayName}) ${String(dateObj.getHours()).padStart(2, '0')}:${String(dateObj.getMinutes()).padStart(2, '0')}`;
  if (!selectedMember) return null;
  return <><div className="rounded-md border-2 border-black p-4">
    <div>
      <p className="reservation-detail-patient-title font-black text-xl mb-2">상담 정보</p>
    </div>
  <div className="flex"><p className="reservation-detail-patient-text">상담 시간</p> {formattedDate}</div>
  <div className="flex"><p className="reservation-detail-patient-text">이름</p> {selectedMember.memberName}</div>
  <div className="flex"><p className="reservation-detail-patient-text">생년월일</p> {selectedMember.birthDay}</div>
  <div className="flex"><p className="reservation-detail-patient-text">연락처</p> {selectedMember.tel}</div>
  <div className="flex"><p className="reservation-detail-patient-text">상담요청사항</p> {selectedMember.counselingDemands}</div>
  <div className="pt-5 flex justify-center">
    {/* 버튼 넣는 곳 */}
    <button className="p-2 reservation-detail-join-button text-white">상담입장</button>
  </div>
</div></>;
};
export default DetailPatient;
