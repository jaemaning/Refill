import React, { useEffect, useState } from "react";
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

interface newTypeToken {
  consultingId?: number | null;
  sessionId?: string | null;
  token?: string | null;
  shareToken?: string | null;
  hospitalId?: number | null;
  doctorId?: number | null;
  memberId?: number | null;
  hospitalName?: string | null;
  hairImage?: string;
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

  const [myJoinToken, setMyJoinToken] = useState<newTypeToken | null>(null);
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

  const getToken = async (reservationId: number) => {
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
      console.log("API Response ok");
      setMyJoinToken({ ...response.data, hairImage: selectedMember.hairImage });

      if (response.data && response.data.sessionId) {
        setCanJoin(true);
      }
    } catch (err) {
      console.log("Error during getToken:", err);
    }
  };

  useEffect(() => {
    getToken(reservationId);
  }, [reservationId]);

  const [canJoin, setCanJoin] = useState(false);
  // 입장하는 함수
  const joinSession = (tokenData: newTypeToken | null) => {
    if (!tokenData) return;
    navigate("/video", {
      state: tokenData,
    });
  };
  // const joinConsult = async () => {
  //   try {
  //     const tokenResponse = await getToken(reservationId);
  //     joinSession(tokenResponse); // 직접 응답 데이터를 전달
  //   } catch (error) {
  //     console.log("Error joining the session:", error);
  //   }
  // };

  // Add this inside the `DetailPatient` component, similar to the `ReservationCompo`

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
            onClick={() => {
              joinSession(myJoinToken);
            }}
            className="p-2 reservation-detail-join-button"
            disabled={!canJoin}
            style={canJoin ? activeButtonStyle : disabledButtonStyle}
          >
            {canJoin ? "상담입장" : "입장 불가"}
          </button>
        </div>
      </div>
    </>
  );
};
export default DetailPatient;
