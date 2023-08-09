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
}

const SelectDate: React.FC<SelectDateProps> = ({ setSelectedDate }) => {
  const [selectedDateValue, setSelectedDateValue] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDateValue(date);
    if (date) {
      setSelectedDate(date.toISOString()); // or format it with dayjs
      console.log(date.toISOString());
    }
  };

  return (
    <div>
      <div className="text-xl">
        <CalendarMonthOutlinedIcon /> 날짜 선택
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          timezone="Asia/Seoul"
          disablePast={true}
          value={selectedDateValue}
          onChange={(date, selectionState) => {
            if (selectionState === "finish") {
              const formattedDate = dayjs(date).tz("Asia/Seoul").format();
              setSelectedDate(formattedDate);
              console.log(formattedDate);
            }
          }}
        />
      </LocalizationProvider>
    </div>
  );
};

export default SelectDate;
