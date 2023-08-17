import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

interface ReservationDateProps {
  setSelectedDate: (date: string) => void;
  setIsSelectedDate: (select: boolean) => void;
  setIsSelectedTime: (select: boolean) => void;
}

const ReservationDate: React.FC<ReservationDateProps> = ({
  setSelectedDate,
  setIsSelectedDate,
  setIsSelectedTime,
}) => {
  const [selectedDateValue, setSelectedDateValue] = useState<Date | null>(null);
  return (
    <div className="my-2">
      <div className="text-xl">
        <CalendarMonthOutlinedIcon /> 날짜 선택
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          disablePast={true}
          value={selectedDateValue}
          onChange={(date, selectionState) => {
            if (selectionState === "finish") {
              const formattedDate = dayjs(date).tz("Asia/Seoul").format();
              setSelectedDate(formattedDate);
              setSelectedDateValue(date);
              setIsSelectedDate(true);
              setIsSelectedTime(false);
              console.log("ok");
            }
          }}
        />
      </LocalizationProvider>
    </div>
  );
};
export default ReservationDate;
