import React from "react";
const CautionReservation: React.FC = () => {
  return (
    <div>
      <ul className="list-disc text-xs">
        <li>
          24시간 내 상담 예약 취소 및 No Show 는 병원측에 피해가 갈 수 있습니다.
        </li>
        <li>
          잦은 상담 예약 취소 및 No show 로 인한 병원측에 피해 신고 접수 시
          이용이 제한 될 수 있습니다.
        </li>
        <li>
          신중히 상담 예약 취소를 해주시고, 부득이하게 24시간 내 예약 취소를
          해야할 경우 병원측에 직접 연락 부탁드립니다.
        </li>
      </ul>
    </div>
  );
};
export default CautionReservation;
