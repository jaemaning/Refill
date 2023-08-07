import React from "react";
import OpenViduVideoComponent from "./OvVideo";
import styled from "@emotion/styled";

interface UserVideoComponentProps {
  streamManager?: any; // 적절한 타입으로 streamManager의 타입을 지정해주세요
  subStreamManager?: any; // 적절한 타입으로 streamManager의 타입을 지정해주세요
}

const StyledStream = styled.div`
  position: absolute;
  background: #f8f8f8;
  padding-left: 5px;
  padding-right: 5px;
  color: #777777;
  font-weight: bold;
  border-bottom-right-radius: 4px;
`;

const UserVideoComponent: React.FC<UserVideoComponentProps> = ({
  streamManager,
  subStreamManager,
}) => {
  const getNicknameTag = () => {
    // Gets the nickName of the user
    if (
      streamManager &&
      streamManager.stream &&
      streamManager.stream.connection &&
      streamManager.stream.connection.data
    ) {
      return JSON.parse(streamManager.stream.connection.data).clientData;
    }
    return "";
  };

  return (
    <div>
      {streamManager !== undefined ? (
        <OpenViduVideoComponent streamManager={streamManager} />
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
