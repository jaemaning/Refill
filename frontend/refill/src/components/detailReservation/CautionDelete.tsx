import exp from "constants";
import React from "react";
const CautionDelete: React.FC = () => {
  return (
    <div className="p-4 font-black">
      <div className="reservation-caution-box p-4">
        <p>
          ※ 부득이하게 병원측에서 예약 취소를 원할 경우 환자에게 직접 연락을
          취해 양해를 구한뒤 환자가 직접 예약 취소를 진행해야합니다.
        </p>
      </div>
    </div>
  );
};
export default CautionDelete;
