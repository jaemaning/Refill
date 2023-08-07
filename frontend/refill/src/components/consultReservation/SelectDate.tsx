import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

const SelectDate: React.FC = () => {
  return (
    <div>
    <div className="text-xl"><CalendarMonthOutlinedIcon /> 날짜 선택</div>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar />
    </LocalizationProvider>
    </div>
  );
};
export default SelectDate;
