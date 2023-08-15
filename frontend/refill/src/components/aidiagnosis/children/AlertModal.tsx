import React, { useState } from "react";
import "styles/Modal.css";
import { useNavigate } from "react-router-dom";
import WarningIcon from "@mui/icons-material/Warning";
import { pink } from "@mui/material/colors";

interface AlertModalProps {
  setOpenAlert: (open: boolean) => void;
  resultValue: number;
}

const AlertModal: React.FC<AlertModalProps> = ({
  setOpenAlert,
  resultValue,
}) => {
  const navigate = useNavigate();

  const getResultTitle = (resultValue: number) => {
    if (resultValue >= 50) {
      return "80% 미만의 신뢰도";
    }
    return "50% 미만의 신뢰도";
  };

  const getResultContentOne = (resultValue: number) => {
    if (resultValue >= 50) {
      return "모범 사진에 가깝지 못하여 낮은 신뢰도가 나온 것으로 추정됩니다.";
    }
    return "올바른 사진이 올라가지 않은 것 같습니다.";
  };
  const getResultContentTwo = (resultValue: number) => {
    if (resultValue >= 50) {
      return "다시 진단하러 가시겠습니까?";
    }
    return "다시 진단해보시는 것을 추천드립니다.";
  };

  return (
    <div className="modal-overlay">
      <div className="alert-modal">
        <div className="alert-modal-top-box flex justify-between items-center">
          <div>
            <WarningIcon sx={{ color: pink[500], fontSize: 180 }} />
          </div>
          <div className="w-80 text-4xl font-black">
            {getResultTitle(resultValue)}
          </div>
        </div>
        <div className="alert-modal-middle-box text-2xl text-center">
          {getResultContentOne(resultValue)}
          <br />
          {getResultContentTwo(resultValue)}
        </div>
        <div className="alert-modal-bottom-box p-5 grid grid-cols-2 gap-5">
          <button onClick={() => {navigate("/diagnosis")}} className="text-lg alert-modal-btn-left">AI진단 다시하기</button>
          <button onClick={() => {setOpenAlert(false)}} className="text-lg alert-modal-btn-right">돌아가기</button>
        </div>
      </div>
    </div>
  );
};
export default AlertModal;
