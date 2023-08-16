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
import CautionDelete from "./CautionDelete";
// css
import "styles/Reservation.css";

import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

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

const DetailReservation: React.FC<ComponentProps> = ({
  doctors,
  hospitalId,
  hospitalName,
}) => {
  const token = useSelector((state: RootState) => state.login.token);
  const [selectedDate, setSelectedDate] = useState("");

  const [doctorId, setDoctorId] = useState(0);

  const [myReservations, setMyReservations] = useState<Reservation[]>([]);
  const [selectedDateReservations, setSelectedDateReservations] = useState<
    Reservation[]
  >([]);
  // 환자 선택하기
  const [selectedMember, setSelectedMember] = useState<Reservation | null>(
    null,
  );

  const [isSelectedDoctor, setIsSelectedDoctor] = useState(false);
  const [isSelectedDate, setIsSelectedDate] = useState(false);
  const [isSelectedTime, setIsSelectedTime] = useState(false);

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
        console.log("ok");
        if (res.data) {
          setMyReservations(res.data);
          console.log("ok");
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
    console.log("ok");
  }, [selectedDate]);
  return (
    <div className="m-2 py-2" style={{ width: "300px" }}>
      <div>
        <div>
          <ReservationDoctor
            setIsSelectedDoctor={setIsSelectedDoctor}
            setDoctorId={setDoctorId}
            doctors={doctors}
          />
        </div>

        <hr className="border-2 border-black my-2" />
        {isSelectedDoctor ? (
          <div>
            <ReservationDate
              setIsSelectedDate={setIsSelectedDate}
              setSelectedDate={setSelectedDate}
              setIsSelectedTime={setIsSelectedTime}
            />
          </div>
        ) : (
          <>
            <p className="text-xl">
              <CalendarMonthOutlinedIcon /> 의사 선생님을 선택하세요.
            </p>
          </>
        )}
        <hr className="border-2 border-black my-2" />
        {isSelectedDate ? (
          <div>
            <ReservationTime
              reservations={selectedDateReservations}
              setSelectedMember={setSelectedMember}
              setIsSelectedTime={setIsSelectedTime}
            />
          </div>
        ) : (
          <>
            <p className="text-xl">
              <AccessTimeIcon /> 날짜를 선택하세요.
            </p>
          </>
        )}
        <hr className="border-2 border-black my-2" />
        {isSelectedTime ? (
          <div>
            {selectedMember && (
              <DetailPatient
                selectedMember={selectedMember}
                doctorId={doctorId}
              />
            )}
          </div>
        ) : (
          <>
            <div>
              <p>선택된 예약 정보가 없습니다.</p>
            </div>
          </>
        )}
        <hr className="border-2 border-black my-2" />
        <CautionDelete />
      </div>
    </div>
  );
};
export default DetailReservation;
