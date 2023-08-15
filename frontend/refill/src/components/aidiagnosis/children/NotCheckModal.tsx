import React from "react";
import "styles/Modal.css";

interface NotCheckModalProps {
  setOpenModal: (open: boolean) => void;
  notCheckedNumbers: number[];
}

const NotCheckModal: React.FC<NotCheckModalProps> = ({
  setOpenModal,
  notCheckedNumbers,
}) => {
  return (
    <div className="modal-overlay">
      <div className="delete-modal-box flex flex-col justify-center items-center p-4">
        <div className="text-center">
          <p className="text-2xl my-2">선택하지 않은 항목이 존재합니다.</p>
          <div className="px-4">
            {notCheckedNumbers?.map((num: number) => (
              <span key={num}>
                <span className="font-black">{num}</span>번{" "}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <button
            className="h-10 w-20 delete-modal-btn-right"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};
export default NotCheckModal;
