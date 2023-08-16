import React, { useState } from "react";
import axios from "axios";
// 토큰가져오기
import { RootState } from "store/reducers";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

type Reservation = {
  reservationId: number;
  hospitalId: number;
  doctorId: number;
  memberId: number;
  startDate: string;
  memberName: string;
  birthDay: string;
  tel: string;
  counselingDemands: string;
  hairImage: string;
};

interface TypeToken {
  consultingId?: number | null;
  sessionId?: string | null;
  token?: string | null;
  shareToken?: string | null;
  hospitalId?: number | null;
  doctorId?: number | null;
  memberId?: number | null;
  hospitalName?: string | null;
}
/*
onClick={() => {
                  joinSession({
                    memberId,
                    doctorId,
                    hospitalId,
                    token,
                    shareToken,
                    sessionId,
                    consultingId,
                    hospitalName,
                  });
                }}

*/

interface DetailPatientProps {
  selectedMember: Reservation | null;
  doctorId: number;
}

const DetailPatient: React.FC<DetailPatientProps> = ({
  selectedMember,
  doctorId,
}) => {
  const loginToken = useSelector((state: RootState) => state.login.token);
  const navigate = useNavigate();

  if (!selectedMember) return null;
  const reservationId = selectedMember.reservationId;

  const days = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];

  const dateObj = new Date(selectedMember.startDate);
  const dayName = days[dateObj.getDay()];

  const formattedDate = `${dateObj.getFullYear()}-${String(
    dateObj.getMonth() + 1,
  ).padStart(2, "0")}-${String(dateObj.getDate()).padStart(
    2,
    "0",
  )} (${dayName}) ${String(dateObj.getHours()).padStart(2, "0")}:${String(
    dateObj.getMinutes(),
  ).padStart(2, "0")}`;

  const getToken = async (reservationId: number): Promise<TypeToken> => {
    console.log(reservationId);
    try {
      const response = await axios.get(
        `https://i9c201.p.ssafy.io/api/v1/consulting/connection/${reservationId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loginToken}`,
          },
        },
      );
      return response.data;
    } catch (err) {
      console.log(err);
      throw err; // 오류가 발생하면 이를 다시 throw 해서 joinConsult에서 catch 할 수 있게 합니다.
    }
  };
  const [canJoin, setCanJoin] = useState(true);
  // 입장하는 함수
  const joinSession = ({
    consultingId,
    sessionId,
    token,
    shareToken,
    memberId,
    doctorId,
    hospitalId,
    hospitalName,
  }: TypeToken) => {
    navigate("/video", {
      state: {
        sessionPk: sessionId,
        token: token,
        shareToken: shareToken,
        consultingId: consultingId,
        memberId: memberId,
        doctorId: doctorId,
        hospitalId: hospitalId,
        hospitalName: hospitalName,
      },
    });
  };
  const joinConsult = async () => {
    setCanJoin(false);
    try {
      const tokenResponse = await getToken(reservationId);
      joinSession(tokenResponse); // 직접 응답 데이터를 전달
    } catch (error) {
      console.log("Error joining the session:", error);
    }
  };

  // Add this inside the `DetailPatient` component, similar to the `ReservationCompo`

  const isWithinTimeRange = () => {
    const now = new Date();
    const reservationDate = new Date(selectedMember.startDate);

    // Adjusting the time range, 14 minutes before and 29 minutes after the reservation time
    const startTime = new Date(reservationDate);
    startTime.setMinutes(reservationDate.getMinutes() - 14);

    const endTime = new Date(reservationDate);
    endTime.setMinutes(reservationDate.getMinutes() + 29);

    return now >= startTime && now <= endTime;
  };

  // Define the active and disabled button styles as constants
  const activeButtonStyle = {
    background: "#3498db",
    color: "white",
    border: "none",
    cursor: "pointer",
  };

  const disabledButtonStyle = {
    background: "#d3d3d3",
    color: "white",
    border: "none",
    cursor: "not-allowed",
  };

  if (!selectedMember) return null;
  return (
    <>
      <div className="rounded-md border-2 border-black p-4">
        <div>
          <p className="reservation-detail-patient-title font-black text-xl mb-2">
            상담 정보
          </p>
        </div>
        <div className="flex">
          <p className="reservation-detail-patient-text">상담 시간</p>{" "}
          {formattedDate}
        </div>
        <div className="flex">
          <p className="reservation-detail-patient-text">이름</p>{" "}
          {selectedMember.memberName}
        </div>
        <div className="flex">
          <p className="reservation-detail-patient-text">생년월일</p>{" "}
          {selectedMember.birthDay}
        </div>
        <div className="flex">
          <p className="reservation-detail-patient-text">연락처</p>{" "}
          {selectedMember.tel}
        </div>
        <div className="flex">
          <p className="reservation-detail-patient-text">상담요청사항</p>{" "}
          {selectedMember.counselingDemands}
        </div>
        <div className="pt-5 flex justify-center">
          {/* 버튼 넣는 곳 */}
          <button
            onClick={joinConsult}
            className="p-2 reservation-detail-join-button"
            disabled={!isWithinTimeRange() || !canJoin}
            style={
              isWithinTimeRange() && canJoin
                ? activeButtonStyle
                : disabledButtonStyle
            }
          >
            {isWithinTimeRange() && canJoin ? "상담입장" : "입장 불가"}
          </button>
        </div>
      </div>
    </>
  );
};
export default DetailPatient;
