import React from "react";

interface chatLogProps {
  chatData: {
    nickname: string;
    message: string;
  };
}

const ChatLog: React.FC<chatLogProps> = ({ chatData }) => {
  // const check = textData.connectionId !== textData.myStreamId
  // console.log(textData.connectionId, textData.myStreamId)
  return (
    <div>
      <span> {chatData.message}</span>
    </div>
  );
};

export default ChatLog;
