import React, { useState } from "react";
// import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import SelectTime from "./SelectTime";
import SelectDate from "./SelectDate";
import MedicalInformationOutlinedIcon from "@mui/icons-material/MedicalInformationOutlined";
import UploadImg from "./UploadImg";

const SelectDoctorAndTime: React.FC = () => {
  // 의사 정보를 가져오는 axios
  // 병원 이름을 통해서 가져와야 할듯
  // 디테일 페이지를 들어오면 바로 랜더링 되어야 좋을듯

  // 병원 상담 예약을 가져오는 axios

  // test dummy data
  // able date
  /*
  1. 의사 선택
  2. 예약된 날짜 시간 가져옴
  3. 불가능한 날짜 disabled 처리
  4. 가능한 날짜 선택하면
  5. 불가능한 시간 disabled 처리
  6. 가능한 시간 선택하면 맞상위 컴포넌트로 데이터 전달
  7. 맞 상위 컴포넌트에서 submit 또는 다음 페이지 클릭시 최상위 컴포넌트에서 데이터를 가지고 있다가
  8. 상담예약 컴포넌트 부분만 다른 컴포넌트로 변경

  다음 컴포넌트에서
  1. 선택된 날짜 시간 선생님보여주고
  (여기서는 readonly)
  2. 이미지 파일 업로드
  3. 선택된 선생님 날짜 시간 이미지 병원이름 상담예약자를 올바른 데이터 형식으로 변경
  4. 제출하면 백에서 데이터 저장
  5. 모달을 띄우고 마이페이지로 이동
  
  */

  // 의사 클릭하는 이벤트

  const ishandleChange = (event: SelectChangeEvent) => {
    const selectedName = event.target.value as string;
    const NowDays = new Date();
    setSelectedDoctor(selectedName);
    console.log(selectedName);
    console.log(NowDays);
  };
  const [selectedDoctor, setSelectedDoctor] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState("");
  const [selectedTime, setSelectedTime] = React.useState("");
  const DOCTORS = ["LEETAESEONG", "LEETAEMUSCLE", "MUSCLEMUSCLE"];
  const [isFirst, setIsFirst] = React.useState(true);
  // first second result
  // if isFirst == true 현재 컴포넌트 보여주고
  // 다음 버튼을 누를 경우 isFirst = false 다음 컴포넌트 나옴
  // else인 경우 다음 버튼 이전 버튼 보여주고
  // 다음 버튼을 누를 경우 modal 나오고 확인 또는 X클릭하면 마이페이지로 이동
  // 이전 버튼을 누를 경우 isFirst = true
  const changeIsFirst = () => {
    setIsFirst(false);
  };

  return (
    <div className="m-2 py-2">
      {isFirst ? (
        <>
          <div className="m-1 text-xl">
            <MedicalInformationOutlinedIcon /> 의사 선택
          </div>
          <Box sx={{ minWidth: 120 }} className="m-2 mb-8">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                의사 선생님을 선택해주세요
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedDoctor}
                label="의사 선생님을 선택해주세요"
                onChange={ishandleChange}
              >
                {DOCTORS.map((doctor, index) => (
                  <MenuItem key={index} value={doctor}>
                    {doctor}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <hr className="border-2 border-black my-2" />
          <SelectDate setSelectedDate={setSelectedDate} />
          <hr className="border-2 border-black my-2" />
          <SelectTime setSelectedTime={setSelectedTime} />
          <hr className="border-2 border-black my-2" />
          <div className="flex items-center justify-center">
            <button
              onClick={changeIsFirst}
              className="rounded text-lg font-black hover:bg-slate-400 bg-black text-white py-2 px-4"
            >
              {" "}
              다음단계{" "}
            </button>
          </div>{" "}
        </>
      ) : (
        <UploadImg
          doctorName={selectedDoctor}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          setIsFirst={setIsFirst}
        />
      )}
    </div>
  );
};
export default SelectDoctorAndTime;
