import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import "styles/Reservation.css";

// 선택 불가능은 빨강 처리 선택도 불가능하게 처리 클릭 불가능처리라고 해야 할듯
// 

interface SelectTimeProps {
  setSelectedTime: (time: string) => void
}

const SelectTime: React.FC<SelectTimeProps> = ({ setSelectedTime }) => {
  return (
    <div className="mb-12">
      <div className="m-1 text-xl mb-2">
        <AccessTimeIcon /> 시간 선택
      </div>
      <div className="mx-4">
        {/* 오전 */}

        <div className="mb-2">오전</div>
        <div className="h-20 m-2 grid grid-cols-4 gap-1">
          <button className="bg-black hover:bg-slate-400">
            <div
              id="08:00"
              className=" text-white flex items-center justify-center"
            >
              08:00
            </div>
          </button>
          <button className="bg-black hover:bg-slate-400">
            <div
              id="08:30"
              className="text-white flex items-center justify-center"
            >
              08:30
            </div>
          </button>
          <button className="bg-black hover:bg-slate-400">
            <div
              id="09:00"
              className=" text-white flex items-center justify-center"
            >
              09:00
            </div>
          </button>
          <button className="bg-black hover:bg-slate-400">
            <div
              id="09:30"
              className="text-white flex items-center justify-center"
            >
              09:30
            </div>
          </button>
          <button className="bg-black hover:bg-slate-400">
            <div
              id="10:00"
              className="text-white flex items-center justify-center"
            >
              10:00
            </div>
          </button>
          <button className="bg-black hover:bg-slate-400">
            <div
              id="10:30"
              className="text-white flex items-center justify-center"
            >
              10:30
            </div>
          </button>
          <button className="bg-black hover:bg-slate-400">
            <div
              id="11:00"
              className="text-white flex items-center justify-center"
            >
              11:00
            </div>
          </button>
          <button className="bg-black hover:bg-slate-400">
            <div
              id="11:30"
              className="text-white flex items-center justify-center"
            >
              11:30
            </div>
          </button>
        </div>

        {/* 오후 */}

        <div className="mb-2">오후</div>
        <div className="bottom-selected-time m-2 grid grid-cols-4 gap-1">
        <button className="bg-black hover:bg-slate-400">
            <div
              id="00:00"
              className="text-white flex items-center justify-center"
            >
              00:00
            </div>
          </button>
          <button className="bg-black hover:bg-slate-400">
            <div
              id="00:30"
              className="text-white flex items-center justify-center"
            >
              00:30
            </div>
          </button>
          <button className="bg-black hover:bg-slate-400">
            <div
              id="01:00"
              className="text-white flex items-center justify-center"
            >
              01:00
            </div>
          </button>
          <button className="bg-black hover:bg-slate-400">
            <div
              id="01:30"
              className="text-white flex items-center justify-center"
            >
              01:30
            </div>
          </button>
          <button className="bg-black hover:bg-slate-400">
            <div
              id="02:00"
              className="text-white flex items-center justify-center"
            >
              02:00
            </div>
          </button>
          <button className="bg-black hover:bg-slate-400">
            <div
              id="02:30"
              className="text-white flex items-center justify-center"
            >
              02:30
            </div>
          </button>
          <button className="bg-black hover:bg-slate-400">
            <div
              id="03:00"
              className="text-white flex items-center justify-center"
            >
              03:00
            </div>
          </button>
          <button className="bg-black hover:bg-slate-400">
            <div
              id="03:30"
              className="text-white flex items-center justify-center"
            >
              03:30
            </div>
          </button>
          <button className="bg-black hover:bg-slate-400">
            <div
              id="04:00"
              className="text-white flex items-center justify-center"
            >
              04:00
            </div>
          </button>
          <button className="bg-black hover:bg-slate-400">
            <div
              id="04:30"
              className="text-white flex items-center justify-center"
            >
              04:30
            </div>
          </button>
          <button className="bg-black hover:bg-slate-400">
            <div
              id="05:00"
              className="text-white flex items-center justify-center"
            >
              05:00
            </div>
          </button>
          <button className="bg-black hover:bg-slate-400">
            <div
              id="05:30"
              className="text-white flex items-center justify-center"
            >
              05:30
            </div>
          </button>
          <button className="bg-black hover:bg-slate-400">
            <div
              id="06:00"
              className="text-white flex items-center justify-center"
            >
              06:00
            </div>
          </button>
          <button className="bg-black hover:bg-slate-400">
            <div
              id="06:30"
              className="text-white flex items-center justify-center"
            >
              06:30
            </div>
          </button>
          <button className="bg-black hover:bg-slate-400">
            <div
              id="07:00"
              className="text-white flex items-center justify-center"
            >
              07:00
            </div>
          </button>
          <button className="bg-black hover:bg-slate-400">
            <div
              id="07:30"
              className="text-white flex items-center justify-center"
            >
              07:30
            </div>
          </button>
        </div>
        <div className="flex items-center justify-end">
          <div className="h-3 w-3 mx-1 bg-black"></div> 선택 가능
          <div className="h-3 w-3 mx-1 bg-red"></div> 선택 불가능
        </div>
      </div>
    </div>
  );
};

export default SelectTime;
