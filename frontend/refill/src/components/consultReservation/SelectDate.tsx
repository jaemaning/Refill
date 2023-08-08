import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

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
          value={selectedDateValue}
          onChange={(date, selectionState) => {
            if (selectionState === "finish") {
              handleDateChange(date);
            }
          }}
        />
      </LocalizationProvider>
    </div>
  );
};

export default SelectDate;
