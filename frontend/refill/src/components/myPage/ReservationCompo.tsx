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
  doctorName: string;
  hospitalName: string;
  reservationId: number;
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
const [tokenData, setTokenData] = useState<TypeToken[]>([]);
const navigate = useNavigate();

// 입장하는 함수
const joinSession = ({
  consultingId,
  sessionId,
  token,
  shareToken,
}: TypeToken) => {
  navigate("/video", {
    state: {
      sessionPk: sessionId,
      token: token,
      shareToken: shareToken,
      consultingId: consultingId,
    },
  });
};
// 토큰을 받아오는 함수
const getToken = async (reservationId: number): Promise<void> => {
  try {
    const response = await axios.get(
      `api/v1/consulting/connection/${reservationId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginToken}`,
        },
      }
    );
    setTokenData((prevTokenData) => [...prevTokenData, response.data]);
    //
    console.log("ok");
  } catch (err) {
    console.log(err);
  }
};



  const [openJoin, setOpenJoin] = useState(true);
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
      dateObj.getMonth() + 1
    ).padStart(2, "0")}-${String(dateObj.getDate()).padStart(
      2,
      "0"
    )} (${dayName}) ${String(dateObj.getHours()).padStart(2, "0")}:${String(
      dateObj.getMinutes()
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
            // onClick={() => {setOpenJoin(true)}}
            className="h-8 p-1 text-center rounded-md"
            disabled={!isWithinTimeRange()}
            style={
              isWithinTimeRange() ? activeButtonStyle : disabledButtonStyle
            } // 인라인 스타일 적용
          >
            {isWithinTimeRange() ? "상담입장" : "입장 불가"}
          </button>
        </div>
      </div>
    </>
  );
};
export default ReservationCompo;
