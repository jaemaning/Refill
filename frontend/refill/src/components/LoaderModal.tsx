import React from "react";
import { Dna } from "react-loader-spinner";
import "styles/Modal.css";

const LoaderModal: React.FC = () => {
  return (
    <div className="modal-overlay">
      <div className="AID-modal flex flex-col justify-center items-center">
        <Dna
          visible={true}
          height="140"
          width="140"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
        <div className="text-center font-black text-2xl">
          <p>
            <span className="text-white">머리도</span>
            <span className="AID-modal-font-color">Fill</span>
            <span className="text-white">자신감도</span>
            <span className="AID-modal-font-color">Fill</span>
            <span className="text-white">전과 다른 분위기를</span>
            <span className="AID-modal-font-color">Feel</span>
          </p>
          <p className="text-white">AI진단 결과를 기다리는 중입니다. </p>
        </div>
      </div>
    </div>
  );
};

export default LoaderModal;
