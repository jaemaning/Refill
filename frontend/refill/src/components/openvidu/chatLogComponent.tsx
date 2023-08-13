import React, { CSSProperties } from "react";

interface chatLogProps {
  chatData: {
    mySessionId: string;
    connectionId: string;
    nickname: string;
    message: string;
  };
}

const messageStyle: CSSProperties = {
  fontSize: "18px",
  padding: "5px 10px",
  border: "1px solid darkgrey",
  whiteSpace: "pre-wrap",
  wordWrap: "break-word",
  maxWidth: "250px",
  display: "inline-block",
};

const ChatLog: React.FC<chatLogProps> = ({ chatData }) => {
  // const check = textData.connectionId !== textData.myStreamId
  // console.log(textData.connectionId, textData.myStreamId)
  return (
    <>
      {
        chatData.mySessionId === chatData.connectionId 
        ?
        <div style={{textAlign: 'right', margin: '10px 0px'}}>
          <span style={{ ...messageStyle, color: 'black', backgroundColor: '#AADAFF', borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px'}}> {chatData.message}</span>
        </div>
        :
        <div style={{marginBottom: '5px'}}>
          <span style={{ ...messageStyle, color: 'white', backgroundColor: '#626264', borderTopRightRadius: '5px', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px'}}> {chatData.message}</span>
        </div>
      }
    </>
  );
};

export default ChatLog;
