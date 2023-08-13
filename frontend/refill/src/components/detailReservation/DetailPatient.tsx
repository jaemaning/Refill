import React from "react";

type Reservation = {
  startDate: string;
  memberName: string;
  birthDay: string;
  tel: string;
  counselingDemands: string;
};

interface DetailPatientProps {
  selectedMember: Reservation | null;
}

const DetailPatient: React.FC<DetailPatientProps> = ({ selectedMember }) => {
  if (!selectedMember) return null;
  return <><div>
  <div>{selectedMember.startDate}</div>
  <div>{selectedMember.memberName}</div>
  <div>{selectedMember.birthDay}</div>
  <div>{selectedMember.tel}</div>
  <div>{selectedMember.counselingDemands}</div>
</div></>;
};
export default DetailPatient;
