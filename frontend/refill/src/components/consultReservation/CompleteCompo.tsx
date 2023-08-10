import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import CloseIcon from "@mui/icons-material/Close";
import "styles/Modal.css";

interface CompleteCompoProps {
  ModalOpen: boolean;
}

const CompleteCompo: React.FC<CompleteCompoProps> = ({ ModalOpen }) => {
  const completeReservation = () => {
    // 여기에 원하는 동작 추가
  };

  // ModalOpen이 false라면 null을 반환하여 아무것도 렌더링하지 않음
  if (!ModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="complete-modal px-10 pt-4">
        <div>
          <div className="flex flex-col">
            <div className="mb-2 flex justify-between">
              <div>
                <CheckIcon />
              </div>
              <p className="ml-2">정상적으로 예약이 접수되었습니다.</p>
              <button onClick={completeReservation} className="ml-2">
                <CloseIcon />
              </button>
            </div>
            <div className="flex justify-center">
              <LocalHospitalIcon className="mb-2" />
            </div>
            <div className="mb-2">신청자 000</div>
            <div className="mb-2">상담 일시 2023.07.18(화) PM 5:30</div>
            <div className="mb-2">상담 병원 젬마 모발 이식 센터</div>
            <div className="mb-2">담당 의사 김싸피 교수님</div>
            <hr />
          </div>
          <ul className="list-disc">
            <li>상담 일정에 불참시향후 상담 예약이 어려울 수 있습니다.</li>
            <li>
              부득이하게 해당 상담이 어려울 경우 즉시 해당 병원에 직접 전화하여
              취소하시기 바랍니다.
            </li>
            <li>
              상담 완료 후 방문 진료가 필요할 경우 해당 병원과의 직접 연락을
              통해 방문 일정을 예약 잡으시기 바랍니다.
            </li>
          </ul>
          <button>확인</button>
        </div>
      </div>
    </div>
  );
};

export default CompleteCompo;
