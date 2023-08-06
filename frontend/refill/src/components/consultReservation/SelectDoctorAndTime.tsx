import React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface SelectDoctorAndTimeProps {
  setDoctorName: (name: string) => void;
}

const SelectDoctorAndTime: React.FC<SelectDoctorAndTimeProps> = ({
  setDoctorName,
}) => {
  // 의사 정보를 가져오는 axios

  // 병원 상담 예약을 가져오는 axios

  // test dummy data

  // 의사 클릭하는 이벤트

  const handleChange = (event: SelectChangeEvent) => {
    const selectedName = event.target.value as string;
    setSelectedDoctor(selectedName)
    setDoctorName(selectedName)
    console.log(selectedName)
  };
  const [selectedDoctor, setSelectedDoctor] = React.useState("");
  const DOCTORS = ["LEETAESEONG", "LEETAEMUSCLE", "MUSCLEMUSCLE"];

  return (
    <>
      <Box sx={{ minWidth: 120 }} className="m-2">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            의사 선생님을 선택해주세요
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedDoctor}
            label="의사 선생님을 선택해주세요"
            onChange={handleChange}
          >
            {DOCTORS.map((doctor, index) => (
              <MenuItem key={index} value={doctor}>
                {doctor}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      
    </>
  );
};
export default SelectDoctorAndTime;
