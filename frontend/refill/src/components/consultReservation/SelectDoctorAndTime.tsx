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
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

type Doctor = {
  doctorId: number;
  name: string;
  profileImg: string;
  licenseNumber: string;
  licenseImg: string;
  // 필요한 경우 여기에 추가적인 필드를 추가하세요
};
type DisabledTimeItem = {
  startDateTime: string;
};

// 만약 컴포넌트에서 여러 doctors를 props로 받는다면:
type ComponentProps = {
  doctors: Doctor[];
  hospitalId: number | undefined;
  hospitalName: string;
};

const SelectDoctorAndTime: React.FC<ComponentProps> = ({
  doctors,
  hospitalId,
  hospitalName,
}) => {
  const [nowWeekday, setNowWeekday] = useState(0);
  const [doctorDisabledTime, setDoctorDisabledTime] = useState<
    DisabledTimeItem[]
  >([]);
  const [doctorId, setDoctorId] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [disabledTimes, setDisabledTimes] = useState<string[]>([]);
  const [isClicked, setIsClicked] = useState(false);
  const [isSelectedDoctor, setIsSelectedDoctor] = useState(false);

  const handleDateChange = (date: string) => {
    const extractedDate = date.split("T")[0];
    setSelectedDate(extractedDate);
    extractDisabledTimesForDate(extractedDate);
  };

  const extractDisabledTimesForDate = (date: string) => {
    const disabledTimesForDate = doctorDisabledTime
      .filter((item) => item.startDateTime.includes(date))
      .map((item) => item.startDateTime.split("T")[1]);
    console.log(disabledTimesForDate);
    setDisabledTimes(disabledTimesForDate);
  };

  const ishandleChange = (event: SelectChangeEvent) => {
    const selectedName = event.target.value as string;
    setSelectedDoctor(selectedName);
    console.log(selectedName);
    const doctor = doctors.find((doc) => doc.name === selectedName);
    if (doctor) {
      console.log(doctor.doctorId);
      setDoctorId(doctor.doctorId);
      disabledTime(doctor.doctorId);
    } else {
      console.log("해당 이름의 의사를 찾을 수 없습니다.");
    }
    setIsSelectedDoctor(true);
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
        setDoctorDisabledTime(response.data);
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

  useEffect(() => {
    console.log("이번 주에 해당하는 번호는?", nowWeekday);

    const fetchDetailsAndUpdateState = async () => {
      const times = await hospitalDetail();
      if (times && times[nowWeekday]) {
        setStartTime(times[nowWeekday].startTime);
        setEndTime(times[nowWeekday].endTime);
      }
      // 이제 disabled 시간을 골라줘야함
    };

    fetchDetailsAndUpdateState();
  }, [nowWeekday, isClicked]);

  useEffect(() => {
    handleDateChange(selectedDate);
  }, [selectedDate]);

  const hospitalDetail = async () => {
    try {
      const response = await axios.get(`/api/v1/hospital/hours/${hospitalId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching hospital details:", error);
    }
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
          {isSelectedDoctor ? (
            <SelectDate
              setSelectedDate={setSelectedDate}
              setNowWeekday={setNowWeekday}
              setIsClicked={setIsClicked}
            />
          ) : (
            <>
              <p className="text-xl">
                <CalendarMonthOutlinedIcon /> 의사 선생님을 선택하세요.
              </p>
            </>
          )}
          <hr className="border-2 border-black my-2" />
          {isClicked ? (
            <SelectTime
              disabledTimes={disabledTimes}
              setSelectedTime={setSelectedTime}
              startTime={startTime}
              endTime={endTime}
            />
          ) : (
            <div>
              <p className="text-xl">
                <AccessTimeIcon /> 날짜를 선택하세요.
              </p>
              <hr className="border-2 border-black my-2" />
            </div>
          )}
          <div className="text-center">
            <h2 className="text-lg font-black mt-2">
              선택한 날짜 및 시간: {selectedDate} {selectedTime}
            </h2>
          </div>
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
          hospitalName={hospitalName}
          doctorId={doctorId}
        />
      )}
    </div>
  );
};
export default SelectDoctorAndTime;
