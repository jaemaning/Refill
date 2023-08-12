import React from "react"
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type Doctor = {
    doctorId: number;
    name: string;
  };

interface ReservationDoctorProps {
    doctors: Doctor[]
}

const ReservationDoctor: React.FC<ReservationDoctorProps> = ({doctors}) => {
    return (
    <></>
    )
}
export default ReservationDoctor