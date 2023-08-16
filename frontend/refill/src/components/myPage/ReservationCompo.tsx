import React, { useState } from "react";
import axios from "axios";
import "styles/MyPage.css";
// 토큰가져오기
import { RootState } from "store/reducers";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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

type Res = {
  reservationId: number;
  hospitalId: number;
  doctorId: number;
  memberId: number;
  doctorName: string;
  hospitalName: string;
  startDateTime: string;
};

interface ReservationCompoProps {
  reservation: Res;
  deleteReservation: (id: number) => void;
}

const ReservationCompo: React.FC<ReservationCompoProps> = ({
  reservation,
  deleteReservation,
}) => {
  // 상담 입장
  const loginToken = useSelector((state: RootState) => state.login.token);
  const islogin = useSelector((state: RootState) => state.login.islogin);
  const navigate = useNavigate();
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

  // 토큰을 받아오는 함수
  const getToken = async (reservationId: number): Promise<TypeToken> => {
    try {
      const response = await axios.get(
        `api/v1/consulting/connection/${reservationId}`,
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

  const changeDate = (startDate: string) => {
    const days = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ];

    const dateObj = new Date(startDate);
    const dayName = days[dateObj.getDay()];

    const formattedDate = `${dateObj.getFullYear()}-${String(
      dateObj.getMonth() + 1,
    ).padStart(2, "0")}-${String(dateObj.getDate()).padStart(
      2,
      "0",
    )} (${dayName}) ${String(dateObj.getHours()).padStart(2, "0")}:${String(
      dateObj.getMinutes(),
    ).padStart(2, "0")}`;
    return formattedDate;
  };

  const isWithinTimeRange = () => {
    const now = new Date();
    const reservationDate = new Date(reservation.startDateTime);

    // 예약 시간 14분 전
    const startTime = new Date(reservationDate);
    startTime.setMinutes(reservationDate.getMinutes() - 14);

    // 예약 시간 29분 후
    const endTime = new Date(reservationDate);
    endTime.setMinutes(reservationDate.getMinutes() + 29);

    // 현재 시간이 시작 및 종료 시간 사이에 있는지 확인
    return now >= startTime && now <= endTime;
  };

  const activeButtonStyle = {
    background: "#3498db", // 예시 색상입니다. 원하는 색상으로 변경 가능합니다.
    color: "white",
    border: "none",
    cursor: "pointer",
  };

  const disabledButtonStyle = {
    background: "#d3d3d3", // 예시 회색입니다. 원하는 색상으로 변경 가능합니다.
    color: "white",
    border: "none",
    cursor: "not-allowed",
  };

  const joinConsult = async () => {
    setCanJoin(false);
    try {
      const tokenResponse = await getToken(reservation.reservationId);
      joinSession(tokenResponse); // 직접 응답 데이터를 전달
    } catch (error) {
      console.log("Error joining the session:", error);
    }
  };

  return (
    <>
      <div className="mypage-reservation-box p-4">
        <p className="text-xl font-black py-2">{reservation.hospitalName}</p>
        <p className="mb-1">{reservation.doctorName} 선생님</p>
        <p>{changeDate(reservation.startDateTime)}</p>
        <hr />
        <div className="grid grid-cols-2 gap-1 mt-2">
          <button
            onClick={() => deleteReservation(reservation.reservationId)}
            className="res-small-btn-left h-8 p-1 text-white"
          >
            상담취소
          </button>
          <button
            onClick={joinConsult}
            className="h-8 p-1 text-center rounded-md"
            disabled={!isWithinTimeRange()}
            style={
              isWithinTimeRange() && canJoin
                ? activeButtonStyle
                : disabledButtonStyle
            } // 인라인 스타일 적용
          >
            {isWithinTimeRange() && canJoin ? "상담입장" : "입장 불가"}
          </button>
        </div>
      </div>
    </>
  );
};
export default ReservationCompo;
