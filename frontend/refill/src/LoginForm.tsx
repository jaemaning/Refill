import React, { useState } from "react";
import axios from "axios";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const MemberLoginRequest = {
      loginId : username,
      loginPassword : password
    };

    axios
      .post("api/v1/account/member/login", MemberLoginRequest)
      .then(response => {
        console.log(response.data)
      }).catch(err => {
        console.log(err.response.data)
      })
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
      </div>
      <br />
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
      </div>
      <br />
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;