import React from "react";
import "styles/Modal.css";
import DangerousIcon from "@mui/icons-material/Dangerous";
import CloseIcon from "@mui/icons-material/Close";

interface ErrorProps {
  setIsError: (error: boolean) => void;
}

const AiServerError: React.FC<ErrorProps> = ({ setIsError }) => {
  return (
    <div className="modal-overlay">
      <div className="error-modal">
        <div className="error-modal-top-box flex justify-between items-center p-2">
          <p className="text-6xl ml-10 text-white font-black">Error</p>
          <button
            onClick={() => {
              setIsError(false);
            }}
          >
            <CloseIcon sx={{ fontSize: 60 }} color="primary" />
          </button>
        </div>
        <div>
          <div className="error-modal-middle-box p-10 flex">
            <div className="error-modal-left-box">
              <DangerousIcon color="primary" sx={{ fontSize: 100 }} />
            </div>
            <div className="error-modal-right-box">
              <p className="text-2xl font-black">
                AI 서버에서 에러가 발생했습니다. RGBA파일이 아닌 RGB파일을
                사용하시거나 머리 사진을 업로드해주세요.
              </p>
            </div>
          </div>
          <div className="error-modal-bottom-box flex justify-center">
            <button
              onClick={() => {
                setIsError(false);
              }}
              className="error-btn text-4xl font-black"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AiServerError;
