import React from "react";

type Reservation = {
  startDate: string;
  memberName: string;
  birthDay: string;
  tel: string;
  counselingDemands: string;
};

interface ReservationTimeProps {
  selectedDate: string;
  setSelectedTime: (time: string) => void;
  reservations: Reservation[];
  setSelectedMember: (member: Reservation) => void;
}

const ReservationTime: React.FC<ReservationTimeProps> = ({
  selectedDate,
  setSelectedTime,
  reservations,
  setSelectedMember,
}) => {
  const clickDate = (res: Reservation) => {
    setSelectedMember(res);
    console.log(res)
  };

  return (
    <div>
      {reservations.map((res) => (
        <button onClick={() => clickDate(res)} key={res.startDate}>
          <p>{res.startDate}</p>
        </button>
      ))}
    </div>
  );
};
export default ReservationTime;
