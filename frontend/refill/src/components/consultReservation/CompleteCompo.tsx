import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import "styles/Modal.css";
import { useNavigate } from "react-router-dom";
import { pink } from "@mui/material/colors";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";

interface CompleteCompoProps {
  ModalOpen: boolean;
  selectedTime: string;
  selectedDate: string;
  doctorName: string;
  hospitalName: string;
}

const CompleteCompo: React.FC<CompleteCompoProps> = ({
  ModalOpen,
  selectedTime,
  selectedDate,
  doctorName,
  hospitalName,
}) => {
  function getKoreanDay(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDay(); // 0 (Sunday) - 6 (Saturday)

    const koreanDays = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ];

    return koreanDays[day];
  }

  const navigate = useNavigate();

  const completeReservation = () => {
    // 여기에 원하는 동작 추가
    navigate("/mypage");
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
                <CheckIcon color="success" />
              </div>
              <p className="ml-2 text-lg">정상적으로 예약이 접수되었습니다.</p>
              <button onClick={completeReservation} className="ml-2">
                <CloseIcon sx={{ color: pink[500] }} />
              </button>
            </div>
            <div className="flex justify-center">
              <div className="complete-round my-4 rounded-full h-20 w-20 flex justify-center items-center">
                <EditCalendarIcon sx={{ fontSize: 60 }} />
              </div>
            </div>
            {/* <div className="mb-2">
              신청자 <span className="ml-7 font-black">000</span>
            </div> */}
            <div className="mb-2">
              상담 일시{" "}
              <span className="ml-2 font-black">
                {selectedDate}({getKoreanDay(selectedDate)}) {selectedTime}
              </span>
            </div>
            <div className="mb-2">
              상담 병원 <span className="ml-2 font-black">{hospitalName}</span>
            </div>
            <div className="mb-2">
              담당 의사 <span className="ml-2 font-black">{doctorName}</span>
            </div>
            <hr className="border-2 border-black my-2" />
          </div>
          <div className="mx-6">
            <ul className="list-disc">
              <li className="complete-font-color">상담 일정에 불참시향후 상담 예약이 어려울 수 있습니다.</li>
              <li>
                부득이하게 해당 상담이 어려울 경우 즉시 해당 병원에 직접
                전화하여 취소하시기 바랍니다.
              </li>
              <li>
                상담 완료 후 방문 진료가 필요할 경우 해당 병원과의 직접 연락을
                통해 방문 일정을 예약 잡으시기 바랍니다.
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <button
              className="complete-btn mt-4 h-16 w-48 bg-black font-black text-2xl"
              onClick={completeReservation}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteCompo;
