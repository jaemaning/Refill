import React from "react";
import "styles/Modal.css";

/*
public record ConsultingDetailResponse(
    // 진료과, 담당의사, 일자
//    String content,
    String doctorName,
    LocalDateTime startDateTime,

    // member 주소, 이름, 생년월일, 성별?, 나이
    String memberAddress,
    String memberName,
    LocalDate birthDay,
    // 성별, 나이 추가

    // 상담 소견
    String detailConsultingInfo,

    // 병원 이름, 주소, 전화번호
    String hospitalName,
    String hospitalAddress,
    String tel
    // 전화번호
)
*/
type detailConsulting = {
  content: string;
  doctorName: string;
  startDateTime: string;
  memberAddress: string;
  memberName: string;
  birthDay: string;
  // 상담소견
  detailConsultingInfo: string;
  hospitalName: string;
  hospitalAddress: string;
  tel: string;
};
interface DetailConsultingModalProps {
  consDetail: detailConsulting | null;
  setOpenDetail: (open: boolean) => void;
}

const DetailConsultingModal: React.FC<DetailConsultingModalProps> = ({
  consDetail,
  setOpenDetail,
}) => {
  const yearData = consDetail?.startDateTime.substring(0, 4);
  const monthData = consDetail?.startDateTime.substring(5, 7);
  const dayData = consDetail?.startDateTime.substring(8, 10);
  const formattedDate = yearData + "년 " + monthData + "월 " + dayData + "일";

  const calculateAge = (consDetail: detailConsulting | null) => {
    if (consDetail !== null) {
      const birthString = consDetail.birthDay;
      const today = new Date();
      const currentYear = today.getFullYear();
      const birthYear = 1900 + parseInt(birthString.substring(0, 2), 10);
      const birthMonth = parseInt(birthString.substring(2, 4), 10);
      const birthDay = parseInt(birthString.substring(4, 6), 10);

      let age = currentYear - birthYear;

      // 생일이 지나지 않았다면 연령에서 1을 빼줍니다.
      if (
        today.getMonth() + 1 < birthMonth ||
        (today.getMonth() + 1 === birthMonth && today.getDate() < birthDay)
      ) {
        age--;
      }

      return age;
    } else {
      return 0;
    }
  };

  return (
    <div className="modal-overlay">
      <div className="detail-consulting-box">
        <div className="detail-consulting-inner-small-box grid grid-rows-3">
          <div className=""></div>
          <div className="px-10 flex justify-between">
            <p className="font-black text-xl">{consDetail?.hospitalName}</p>
            <p className="text-sm">{consDetail?.startDateTime}</p>
          </div>
        </div>
        <div className="detail-consulting-inner-large-box">
          <div className="h-20 flex justify-between mb-5">
            <div className="w-40 flex flex-col justify-center">
              <p className="text-4xl underline font-black">상담소견서</p>
            </div>
            <div className="w-60 text-lg">
              <div className="flex justify-between">
                <p>진 료 과:</p> <p>피부과</p>
              </div>
              <div className="flex justify-between">
                <p>작 성 자:</p> <p>{consDetail?.doctorName}</p>
              </div>
              <div className="flex justify-between">
                <p>일 자:</p> <p>{formattedDate}</p>
              </div>
            </div>
          </div>
          {/* content */}
          <div>
            <div className="detail-content-box h-12 flex">
              <div className="h-full w-28 border-r-2 border-black detail-content-sm-box flex justify-center items-center text-lg font-black">
                <p>주소</p>
              </div>
              <div className="h-full flex justify-center items-center">
                <p className="pl-5">{consDetail?.memberAddress}</p>
              </div>
            </div>
            <div className="detail-content-box h-12 flex">
              <div className="h-full w-28 border-r-2 border-black detail-content-sm-box flex justify-center items-center text-lg font-black">
                <p>성명</p>
              </div>
              <div className="h-full w-28 flex justify-center items-center">
                <p>{consDetail?.memberName}</p>
              </div>
              <div className="h-full w-28 detail-content-sm-box border-x-2 border-black flex justify-center items-center text-lg font-black">
                <p>생년월일</p>
              </div>
              <div className="h-full w-28 flex justify-center items-center">
                <p>{consDetail?.birthDay}</p>
              </div>
              <div className="h-full w-28 detail-content-sm-box border-x-2 border-black flex justify-center items-center text-lg font-black">
                <p>연령</p>
              </div>
              <div className="h-full w-28 flex justify-center items-center">
                <p>{calculateAge(consDetail)}</p>
              </div>
            </div>
            <div className="detail-content-box h-96 border-b-2 border-black flex">
              <div className="h-full w-28 border-r-2 border-black detail-content-sm-box flex justify-center items-center text-lg font-black">
                <p>내용</p>
              </div>
              <div className="h-full flex justify-center items-center">
                <p className="pl-5">{consDetail?.detailConsultingInfo}</p>
              </div>
            </div>
          </div>
          {/* 위와 같이 소견함 */}
          <div className="h-32 flex justify-center items-center">
            <div className="h-28 w-40 py-5 grid grid-rows-3 gap-2 text-center">
              <p>위와 같이 소견함</p>
              <p>{formattedDate}</p>
              <p className="font-black text-xl">{consDetail?.hospitalName}</p>
            </div>
          </div>
          {/* 병원 의사 서명 */}
          <div className="h-24 py-2 border-black border-b-2 flex justify-end">
            <div className="w-80 text-end grid grid-rows-3 gap-2">
              <p>주 소: {consDetail?.hospitalAddress}</p>
              <p>전화번호: {consDetail?.tel}</p>
              <p>의사성명: {consDetail?.doctorName} (인)</p>
            </div>
          </div>
        </div>
        <div className="detail-consulting-inner-small-box flex justify-center items-center">
          <button
            onClick={() => {
              setOpenDetail(false);
            }}
            className="detail-consulting-btn"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};
export default DetailConsultingModal;
