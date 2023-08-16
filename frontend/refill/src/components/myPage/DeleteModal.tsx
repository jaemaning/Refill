import React from "react";
import "styles/Modal.css";

interface DeleteModalProps {
  setOpenModal: (open: boolean) => void;
  deleteReservation: (resId: number) => void;
  resId: number
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  setOpenModal,
  deleteReservation,
  resId,
}) => {
  const clickWantDelete = () => {
    setOpenModal(false);

    // window.location.reload(); // 페이지 새로고침
  };

  const clickReturn = () => {
    setOpenModal(false);
  };

  return (
    <div className="modal-overlay">
      <div className="delete-modal-box flex flex-col justify-center items-center p-4">
        <div className="text-center">
          <p className="text-3xl my-2">
            정말로 <span className="text-red font-black">취소</span>
            하시겠습니까?
          </p>
          <div className="px-4">
            <ul className="list-disc">
              <li>당일 취소의 경우 불이익이 있을 수 있습니다.</li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-16 mt-4">
          <button
            className="h-10 w-20 delete-modal-btn-left"
            onClick={clickWantDelete}
          >
            상담 취소
          </button>
          <button className="delete-modal-btn-right" onClick={clickReturn}>
            돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeleteModal;
