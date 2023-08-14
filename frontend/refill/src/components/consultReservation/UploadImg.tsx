import React, { ChangeEvent, useState } from "react";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CompleteCompo from "./CompleteCompo";
import "styles/Reservation.css";
import axios from "axios";
import { RootState } from "store/reducers";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

interface UploadImgProps {
  doctorName: string;
  selectedDate: string;
  selectedTime: string;
  setIsFirst: (isFirst: boolean) => void;
  hospitalName: string;
  doctorId: number;
}

const UploadImg: React.FC<UploadImgProps> = ({
  doctorName,
  selectedDate,
  selectedTime,
  setIsFirst,
  hospitalName,
  doctorId,
}) => {
  // hospitalId undefined인 경우 axios로 호출
  const { newHospitalId } = useParams()

  // if (hospitalName === "")

  const [imgFile, setImgFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [requestData, setRequestData] = useState("");
  const token = useSelector((state: RootState) => state.login.token);
  const nextProgress = () => {
    const reservationDateTime = selectedDate + "T" + selectedTime + ":00";
    const reservationRequest = {
      doctorId: doctorId,
      startDateTime: reservationDateTime,
      counselingDemands: requestData,
    };
    const json = JSON.stringify(reservationRequest);
    const jsonBlob = new Blob([json], { type: "application/json" });
    const formData = new FormData();
    formData.append("reservationRequest", jsonBlob);
    if (imgFile) {
      formData.append("hairImg", imgFile);
      console.log(imgFile)
      // console.log(hospitalName)
      // console.log(token)
      // console.log(newHospitalId)
    }

    axios
      .post(`/api/v1/reservation/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });

    setModalOpen(true);
    return;
  };

  const prevCompo = () => {
    setIsFirst(true);
    return;
  };

  const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    // file reader to generate a preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImgFile(file);
    } else {
      setPreview(null);
    }
  };

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setRequestData(event.target.value); // textarea의 값이 변경될 때 상태 업데이트
  };

  return (
    <div>
      <CompleteCompo
        hospitalName={hospitalName}
        ModalOpen={modalOpen}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        doctorName={doctorName}
      />
      <p className="text-xl font-black">
        {" "}
        <CalendarMonthOutlinedIcon /> {selectedDate}
      </p>
      <hr className="border-2 border-black my-2" />
      <p className="text-xl font-black">
        <AccessTimeIcon /> {selectedTime}
      </p>
      <hr className="border-2 border-black my-2" />
      <div>
        <h1>{doctorName}</h1>
      </div>
      <div className="flex justify-center mt-5">
        <div>
          <div className="flex justify-center">
            <img
              src={preview ? preview : "#"}
              alt={preview ? "Selected Image" : "사진을 업로드 해주세요."}
              className="h-64"
            />
          </div>
          <div>
            <div>
              <label htmlFor="uploadImg">
                사진을 선택해 주세요
                <input
                  type="file"
                  id="uploadImg"
                  onChange={handleImgChange}
                  accept="image/*"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-2 border-black my-2" />
      <div>
        <div>
          <p className="text-2xl font-black">상담시 요청사항</p>
        </div>
        <div>
          <div className="px-8">
            <textarea
              onChange={handleTextareaChange}
              className="reservation-textarea my-2 p-6 text-lg"
            ></textarea>
          </div>
        </div>
        <p className="font-black text-lg">📌 알립니다 [ 예약취소관련 ]</p>
        <div className="px-8">
          <div>
            <ul className="list-disc">
              <li>
                상담시간 30분이내 취소는 병원측에 피해가 됩니다. 예약시 신중히
                예약 부탁드리며 취소시 최소 1시간 전 연락부탁드립니다.
              </li>
              <li>
                예약 시간 15분 늦을 시 원활한 다음 상담을 위해 예약 취소가
                되오니 참고 바랍니다.
              </li>
              <li>
                예약 당일 노쇼, 잦은 지각 시 다음 상담 예약이 어려 울 수
                있습니다.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="border-2 border-black my-2" />
      <div>
        <div className="mx-10 grid grid-cols-2 gap-10">
          <button
            className="text-white bg-black w-full h-10"
            onClick={prevCompo}
          >
            이전 단계
          </button>
          <button
            className="text-white bg-black w-full h-10"
            onClick={nextProgress}
          >
            예약 완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadImg;
