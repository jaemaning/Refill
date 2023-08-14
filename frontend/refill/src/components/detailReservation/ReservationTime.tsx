import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

type Reservation = {
  reservationId: number;
  startDate: string;
  memberName: string;
  birthDay: string;
  tel: string;
  counselingDemands: string;
};

interface ReservationTimeProps {
  reservations: Reservation[];
  setSelectedMember: (member: Reservation) => void;
  setIsSelectedTime: (select: boolean) => void;
}

const ReservationTime: React.FC<ReservationTimeProps> = ({
  reservations,
  setSelectedMember,
  setIsSelectedTime,
}) => {
  const clickDate = (res: Reservation) => {
    setSelectedMember(res);
    setIsSelectedTime(true)
    console.log(res)
  };
  const sortedReservations = reservations.sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
  
    return dateA.getTime() - dateB.getTime(); // 오름차순 정렬
  });
  return (
    <div className="my-2">
      <div className="text-xl mb-2">
        <AccessTimeIcon /> 예약된 상담 시간
      </div>
      
      <div className="grid grid-cols-3 gap-2">
      {sortedReservations.map((res) => (
        <button className="reservation-time-select text-lg font-black rounded-md text-white" onClick={() => clickDate(res)} key={res.startDate}>
          <p>{res.startDate.slice(11, 16)}</p>
        </button>
      ))}
    </div>
    </div>
    
  );
};
export default ReservationTime;
