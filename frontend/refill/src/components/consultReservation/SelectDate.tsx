import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";

interface SelectDateProps {
  onChange?: (file: File | null) => void;
}

const SelectDate: React.FC<SelectDateProps> = ({ onChange }) => {
  return (
    <div>
      <div className="text-xl">
        <CalendarMonthOutlinedIcon /> 날짜 선택
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar />
      </LocalizationProvider>
    </div>
  );
};
export default SelectDate;
