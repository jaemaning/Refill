import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

interface ReservationDateProps {
  setSelectedDate: (date: string) => void;
}

const ReservationDate: React.FC<ReservationDateProps> = ({
  setSelectedDate,
}) => {
  const [selectedDateValue, setSelectedDateValue] = useState<Date | null>(null);
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          disablePast={true}
            value={selectedDateValue}
            onChange={(date, selectionState) => {
              if (selectionState === "finish") {
                const formattedDate = dayjs(date).tz("Asia/Seoul").format();
                setSelectedDate(formattedDate);
                setSelectedDateValue(date);
                console.log(formattedDate);
              }
            }}
        />
      </LocalizationProvider>
    </div>
  );
};
export default ReservationDate;
