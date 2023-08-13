import React from "react";
import { WaitingHospitalResponse } from "./adminTypes";

interface HospitalDetailModalProps {
  hospital: WaitingHospitalResponse;
  onClose: () => void;
}

const HospitalDetailModal: React.FC<HospitalDetailModalProps> = ({
  hospital,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white p-8 rounded-lg shadow-lg z-10">
        {" "}
        {/* relative를 추가하여 자식 요소를 절대 위치로 배치할 수 있게 함 */}
        {/* 닫기 버튼 */}
        <button
          className="absolute top-2 right-2 bg-gray-300 hover:bg-gray-400 text-xl rounded-full w-8 h-8 flex items-center justify-center"
          onClick={onClose}
        >
          ×
        </button>
        {/* 모달의 내용: 병원 상세 정보 */}
        <h2 className="text-xl font-bold">{hospital.name}</h2>
        <p>loginId: {hospital.loginId}</p>
        <p>name : {hospital.name}</p>
        <p>Address: {hospital.address}</p>
        <p>Email: {hospital.email}</p>
        <p>Telephone: {hospital.tel}</p>
        <img
          src={hospital.hospitalProfileImg}
          alt="Hospital Profile"
          className="w-32 mt-4"
        />
        {/* <button className="mt-4 p-2 bg-red-500 text-white" onClick={onClose}>Close</button> 기존의 종료 버튼을 주석 처리 */}
      </div>
    </div>
  );
};

export default HospitalDetailModal;
