import React, { useRef } from 'react';
import axios from 'axios';

const Callee = () => {
  const sessionId = useRef<string | null>(null)

  const session_url = '/api/sessions';
  const accessToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJsb2dpbklkIjoibWVtYmVyMSIsInJvbGUiOiJST0xFX01FTUJFUiIsImlhdCI6MTY5MTMxMTg1MSwiZXhwIjoxNjkxMzE1NDUxfQ.C-hKqWK3yawjK096BeV_ZerosIR7TtTeUjOyxV4339U";
  const headers = { Authorization: `Bearer ${accessToken}` };

  
  const session_axios = () => {
    axios
    .post(session_url, {headers: headers})
    .then((response) => {
      console.log(response)
    })
    .catch((err) => console.log(err))
  }


  // const connect_url = `/api/sessions/${sessionId}/connections`;

  return (
    <div>
      <button onClick={session_axios}>세션요청</button>
    </div>
  );
}

export default Callee