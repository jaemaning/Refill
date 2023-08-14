import React from "react";

type Res = {
  doctorName: string;
  hospitalName: string;
  reservationId: number;
  startDateTime: string;
};

interface ReservationCompoProps {
  reservation: Res;
  key: number;
  deleteReservation: (id: number) => void;
}

const ReservationCompo: React.FC<ReservationCompoProps> = ({
  reservation,
  key,
  deleteReservation,
}) => {
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

  return (
    <div
      className="p-2"
      key={key}
      style={{ minWidth: "200px", padding: "5px" }}
    >
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
          <button className="res-small-btn-right h-8 p-1 text-white">
            상담입장
          </button>
        </div>
      </div>
    </div>
  );
};
export default ReservationCompo;
