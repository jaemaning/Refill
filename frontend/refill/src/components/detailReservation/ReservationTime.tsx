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
  return <></>;
};
export default ReservationTime;
