import React from "react";
import OpenViduVideoComponent from "./OvVideo";

interface UserVideoComponentProps {
  streamManager?: any; // 적절한 타입으로 streamManager의 타입을 지정해주세요
}

const UserVideoComponent: React.FC<UserVideoComponentProps> = ({
  streamManager,
}) => {
  return (
    <>
      {streamManager !== undefined ? (
        <OpenViduVideoComponent streamManager={streamManager} />
      ) : null}
    </>
  );
};

export default UserVideoComponent;
