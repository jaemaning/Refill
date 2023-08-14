import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MedicalInformationOutlinedIcon from "@mui/icons-material/MedicalInformationOutlined";

type Doctor = {
  doctorId: number;
  name: string;
};

interface ReservationDoctorProps {
  doctors: Doctor[];
  setDoctorId: (id: number) => void;
  setIsSelectedDoctor: (select: boolean) => void;
}

const ReservationDoctor: React.FC<ReservationDoctorProps> = ({
  doctors,
  setDoctorId,
  setIsSelectedDoctor,
}) => {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const doctorsName = doctors.map((doctor) => doctor.name);

  const changeDoctor = (event: SelectChangeEvent) => {
    const selectedName = event.target.value as string;
    setSelectedDoctor(selectedName);
    const doctor = doctors.find((doc) => doc.name === selectedName);
    if (doctor) {
      console.log(doctor.doctorId);
      setDoctorId(doctor.doctorId);
      setIsSelectedDoctor(true);
    } else {
      console.log("해당 이름의 의사를 찾을 수 없습니다.");
    }
  };

  return (
    <>
      <div className="m-1 text-xl">
        <MedicalInformationOutlinedIcon /> 나의 상담 일정
      </div>
      <Box sx={{ minWidth: 120 }} className="m-2 mb-8">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Doctor</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedDoctor}
            label="Doctor"
            onChange={changeDoctor}
          >
            {doctorsName.map((doctor, index) => (
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
export default ReservationDoctor;
