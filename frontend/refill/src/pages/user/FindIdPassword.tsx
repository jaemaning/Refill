import React, { useState } from "react";
import ToggleSwitch from "components/elements/ToggleSwitch";
import FindId from "components/find/FindId";

const FindIdPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loginId, setloginId] = useState("");

  const [ismember, setisMeber] = useState(true);
  const [isfindid, setisFindId] = useState(true);

  const handleLoginIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setloginId(event.target.value);
  };

  return (
    <div>
      <ToggleSwitch label="hello" />
      <FindId ismember={ismember} />
    </div>
  );
};

export default FindIdPassword;
