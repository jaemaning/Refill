import React from "react"
import "styles/Modal.css";
import DangerousIcon from '@mui/icons-material/Dangerous';
import CloseIcon from '@mui/icons-material/Close';

interface ErrorProps {
    setIsError: (error: boolean) => void;
  }

const NotSuccess: React.FC<ErrorProps> = ({setIsError}) => {
    return (
        <div className="modal-overlay">
      <div className="error-modal">
        <div className="error-modal-top-box flex justify-between items-center p-2">
          <p className="text-6xl ml-10 text-white font-black">Error</p>
          <button onClick={() => {setIsError(false)}}><CloseIcon sx={{ fontSize: 60}} color="primary"/></button>
        </div>
        <div>
          <div className="error-modal-middle-box p-10 flex">
            <div className="error-modal-left-box"><DangerousIcon color="primary" sx={{ fontSize: 100 }} /></div>
            <div className="error-modal-right-box">
              <p className="text-2xl font-black">
                동일한 예약시간이 있어서 예약이 완료되지 못했습니다. 다른 날짜로 다시 예약해주세요.
              </p>
            </div>
          </div>
          <div className="error-modal-bottom-box flex justify-center">
            <button onClick={() => {setIsError(false)}} className="error-btn text-4xl font-black">OK</button>
          </div>
        </div>
      </div>
    </div>
    )
}
export default NotSuccess