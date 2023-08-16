import React, { useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import "styles/Reservation.css";

interface SelectTimeProps {
  setSelectedTime: (time: string) => void;
  startTime: string;
  endTime: string;
  disabledTimes: string[];
}

const SelectTime: React.FC<SelectTimeProps> = ({
  setSelectedTime,
  startTime,
  endTime,
  disabledTimes,
}) => {
  const times = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",


    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30"
  ];

  const convertToMinutes = (time: string) => {
    const [hours, minutes] = time.split(":");
    return parseInt(hours) * 60 + parseInt(minutes);
  };
  const [nowTime, setNowTime] = useState<string | null>(null); // 추가된 상태
  const isDisabled = (time: string) => {
    const timeInMinutes = convertToMinutes(time);
    // startTime과 endTime을 기준으로 비활성화 판단
    const outOfBounds =
      timeInMinutes < convertToMinutes(startTime) ||
      timeInMinutes >= convertToMinutes(endTime);

    // disabledTimes에서 시간만 추출하고 해당 시간이 포함되어 있는지 확인
    const isTimeDisabled = disabledTimes
      .map((t) => t.slice(0, 5))
      .includes(time);

    return outOfBounds || isTimeDisabled;
  };
  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
    setNowTime(time); // nowTime 상태 업데이트
    console.log(time);
  };
  return (
    <div className="mb-12">
      <div className="m-1 text-xl mb-2">
        <AccessTimeIcon /> 시간 선택
      </div>
      <div className="mx-4">
        {/* 오전 */}
        <div className="mb-2">오전</div>
        <div className="h-20 m-2 grid grid-cols-4 gap-1">
          {times.slice(0, 8).map((time) => (
            <button
              key={time}
              onClick={() => handleTimeClick(time)}
              className={
                `bg-${isDisabled(time) ? "red" : "black"} hover:bg-slate-400` +
                ` rounded-md`
              }
              disabled={isDisabled(time)}
            >
              <div
                id={time}
                className="text-white flex items-center justify-center"
              >
                {time}
              </div>
            </button>
          ))}
        </div>
        {/* 오후 */}
        <div className="mb-2">오후</div>
        <div className="bottom-selected-time m-2 grid grid-cols-4 gap-1">
          {times.slice(8).map((time) => (
            <button
              key={time}
              onClick={() => handleTimeClick(time)}
              className={
                `bg-${isDisabled(time) ? "red" : "black"} hover:bg-slate-400` +
                ` rounded-md`
              }
              disabled={isDisabled(time)}
            >
              <div
                id={time}
                className="text-white flex items-center justify-center"
              >
                {time}
              </div>
            </button>
          ))}
        </div>
        <div className="flex items-center justify-end">
          <div className="h-3 w-3 mx-1 bg-black"></div> 선택 가능
          <div className="h-3 w-3 mx-1 bg-red"></div> 선택 불가능
        </div>
      </div>
    </div>
  );
};

export default SelectTime;
