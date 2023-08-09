import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import SelectTime from "./SelectTime";
import SelectDate from "./SelectDate";
import MedicalInformationOutlinedIcon from "@mui/icons-material/MedicalInformationOutlined";
import UploadImg from "./UploadImg";
import { RootState } from "store/reducers";
import { useSelector } from "react-redux";

type Doctor = {
  doctorId: number;
  name: string;
  profileImg: string;
  licenseNumber: string;
  licenseImg: string;
  // 필요한 경우 여기에 추가적인 필드를 추가하세요
};

// 만약 컴포넌트에서 여러 doctors를 props로 받는다면:
type ComponentProps = {
  doctors: Doctor[];
};

const SelectDoctorAndTime: React.FC<ComponentProps> = ({ doctors }) => {
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
  // 클릭하고 날짜 클릭하면 시간이 떠야함
  // /doctor/{doctorId}/disabled 여기로 호출해서 안되는 날짜와 시간 받아와야 한다.

  /*
  안되는 날은 이거로 true처리
  shouldDisableDate
Disable specific date.

Type:

func
Signature:

function(day: TDate) => boolean
day The date to test.
Returns: If true the date will be disabled.
  */
  const [nowWeekday, setNowWeekday] = useState(0);
  const [doctorDisabledTime, setdoctorDisabledTime] = useState<string[]>([]);
  const ishandleChange = (event: SelectChangeEvent) => {
    const selectedName = event.target.value as string;
    setSelectedDoctor(selectedName);
    console.log(selectedName);
    const doctor = doctors.find((doc) => doc.name === selectedName);
    if (doctor) {
      console.log(doctor.doctorId);
      disabledTime(doctor.doctorId);
    } else {
      console.log("해당 이름의 의사를 찾을 수 없습니다.");
    }
  };

  const disabledTime = (doctorId: number) => {
    axios
      .get(`/api/v1/reservation/doctor/${doctorId}/disabled`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setdoctorDisabledTime(response.data);
        // 이제 오늘 날짜랑 비교해서 오늘 날짜인 date를 가져오고 시간을 추출한 다음에 list에 보관
      })
      .catch((error) => {
        console.error("Error disabled time", error);
      });
  };

  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const token = useSelector((state: RootState) => state.login.token);

  /*
  operatingHourResponses": [
        {
            "dayOfWeek": "MONDAY",
            "startTime": "09:00:00",
            "endTime": "19:00:00"
        },
  
  */
  useEffect(() => {
    // 이 부분의 코드는 `doctor` state가 변경될 때마다 실행됩니다.
    console.log("이번 주에 해당하는 번호는?", nowWeekday);

    // 여기에 원하는 다른 함수를 호출할 수 있습니다.
    // disableTime도 보내줘야함
    hospitalDetail();
  }, [nowWeekday]);

  const hospitalDetail = () => {
    axios
      .get(`/api/v1/hospital/hours`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        // 이제 여기서 받은 값을 바탕으로 해당 요일에 맞는 날짜를 가져와서 startTime이랑 endTime을 하위 컴포넌트로 보내줘야함
        // 보내주면 하위 컴포넌트에서 받아서 안되는 시간을 분류해서 색칠해줘야함.


      })
      .catch((error) => {
        console.error("Error fetching hospital details:", error);
      });
  };

  const doctorsName = doctors.map((doctor) => doctor.name);

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

  const DayOfWeekMapping: { [key: string]: number } = {
    MONDAY: 0,
    TUESDAY: 1,
    WEDNESDAY: 2,
    THURSDAY: 3,
    FRIDAY: 4,
    SATURDAY: 5,
    SUNDAY: 6,
  };

  // 사용 예:
  // const dayNumber = DayOfWeekMapping["THURSDAY"]; // 3
  // console.log(dayNumber);

  // 병원 정보 가져오기

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
                {doctorsName.map((doctor, index) => (
                  <MenuItem key={index} value={doctor}>
                    {doctor}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <hr className="border-2 border-black my-2" />
          <SelectDate
            setSelectedDate={setSelectedDate}
            setNowWeekday={setNowWeekday}
          />
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
