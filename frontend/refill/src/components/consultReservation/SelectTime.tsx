import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface SelectTimeProps {
  setSelectedTime: (time: string) => void;
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
        <div className="h-20 m-2 grid grid-cols-4 gap-1">
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
