import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

interface SelectDateProps {
  setSelectedDate: (date: string) => void;
  setNowWeekday: (weekday: number) => void;
  setIsClicked: (click: boolean) => void;
}

const SelectDate: React.FC<SelectDateProps> = ({
  setSelectedDate,
  setNowWeekday,
  setIsClicked,
}) => {
  const [selectedDateValue, setSelectedDateValue] = useState<Date | null>(null);

  return (
    <div>
      <div className="text-xl">
        <CalendarMonthOutlinedIcon /> 날짜 선택
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          disablePast={true}
          value={selectedDateValue}
          onChange={(date, selectionState) => {
            setIsClicked(true);
            if (selectionState === "finish") {
              const formattedDate = dayjs(date).tz("Asia/Seoul").format();
              setSelectedDate(formattedDate);
              setSelectedDateValue(date);
              console.log(formattedDate);
              const weekday = dayjs(date).tz("Asia/Seoul").day();
              setNowWeekday(weekday);
              console.log(weekday);
            }
          }}
        />
      </LocalizationProvider>
    </div>
  );
};

export default SelectDate;
