import React from "react";

interface chatLogProps {
  chatData: {
    mySessionId: string;
    connectionId: string;
    nickname: string;
    message: string;
  };
}


const ChatLog: React.FC<chatLogProps> = ({ chatData }) => {
  // const check = textData.connectionId !== textData.myStreamId
  // console.log(textData.connectionId, textData.myStreamId)
  return (
    <>
      {
        chatData.mySessionId === chatData.connectionId 
        ?
        <div style={{textAlign: 'right', marginBottom: '5px'}}>
          <span style={{color: 'blue', backgroundColor: 'white', padding: '5px 10px'}}> {chatData.message}</span>
        </div>
        :
        <div style={{marginBottom: '5px'}}>
          <span style={{color: 'red', backgroundColor: 'yellow', padding: '5px 10px'}}> {chatData.message}</span>
        </div>
      }
      {/* <span> {chatData.mySessionId} </span> */}
      {/* <span> {chatData.connectionId} </span> */}
    </>
  );
};

export default ChatLog;
