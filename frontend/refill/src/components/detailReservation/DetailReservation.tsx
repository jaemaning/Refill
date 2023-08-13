import React, { useEffect, useState } from "react";
import axios from "axios";
// 토큰가져오기
import { RootState } from "store/reducers";
import { useSelector } from "react-redux";
// 하위 컴포넌트
import ReservationDate from "./ReservationDate";
import ReservationTime from "./ReservationTime";
import DetailPatient from "./DetailPatient";
import ReservationDoctor from "./ReservationDoctor";
// css
import "styles/Reservation.css";

type ComponentProps = {
  doctors: Doctor[];
  hospitalId: number | undefined;
  hospitalName: string;
};

type Doctor = {
  doctorId: number;
  name: string;
};

type Reservation = {
  startDate: string;
  memberName: string;
  birthDay: string;
  tel: string;
  counselingDemands: string;
};

const DetailReservation: React.FC<ComponentProps> = ({
  doctors,
  hospitalId,
  hospitalName,
}) => {
  const token = useSelector((state: RootState) => state.login.token);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [doctorId, setDoctorId] = useState(0);

  const [myReservations, setMyReservations] = useState<Reservation[]>([]);
  const [selectedDateReservations, setSelectedDateReservations] = useState<
    Reservation[]
  >([]);
  // 환자 선택하기
  const [selectedMember, setSelectedMember] = useState<Reservation | null>(
    null,
  );
  /*
  상담 내역 받아오기
  @GetMapping("/{memberId}")

  상담리스트 받아오기
  @GetMapping("/")
  */

  /* 
  api/v1/reservation/list/{dictorid}
  parameter : doctorId
  Description : 의사 PK값

  Content-Type : application/json

  [
    {
      "startDate": "2023-08-11T14:58:17.6790553",
      "memberName": "상원",
      "birthDay": "2023-08-11",
      "tel": "010-1234-5678",
      "counselingDemands": "상담 요청합니다."
    }
  ]
  
  */
  // 예약 정보 다 가져와 지면 자기 예약정보 가져오기
  useEffect(() => {
    if (doctorId > 0) {
      getReservation(doctorId);
    }
  }, [doctorId]); // doctorId 값의 변경을 감지하여 실행합니다.
  // 의사를 선택하면 악시오스 호출하기
  const getReservation = (doctorId: number) => {
    axios
      .get(`/api/v1/reservation/list/${doctorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data) {
          setMyReservations(res.data);
          console.log(res.data)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //  날짜를 고르면 해당 시간에 맞는 배열 찾아서 넣기
  useEffect(() => {
    const filteredReservations = myReservations.filter((reservation) => {
      const reservationDate = new Date(reservation.startDate).setHours(
        0,
        0,
        0,
        0,
      );
      const targetDate = new Date(selectedDate).setHours(0, 0, 0, 0);
      return reservationDate === targetDate;
    });

    setSelectedDateReservations(filteredReservations);
    console.log("마이레저베이션")
    console.log(filteredReservations)
  }, [selectedDate]);
  return (
    <div className="detail-reservation-box p-3">
      <div>
        <div>
          <p>나의 상담 일정</p>
        </div>
        <div>
          <ReservationDoctor setDoctorId={setDoctorId} doctors={doctors} />
        </div>
        <hr className="border-2 border-black my-2" />
        <div>
          <ReservationDate setSelectedDate={setSelectedDate} />
        </div>
        <hr className="border-2 border-black my-2" />
        <div>
          <ReservationTime
            selectedDate={selectedDate}
            setSelectedTime={setSelectedTime}
            reservations={selectedDateReservations}
            setSelectedMember={setSelectedMember}
          />
        </div>
        <hr className="border-2 border-black my-2" />
        <div>
        {selectedMember && <DetailPatient selectedMember={selectedMember} />}
        </div>
      </div>
    </div>
  );
};
export default DetailReservation;
