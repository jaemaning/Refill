import React, { useState } from "react";
import UseFindIdForm from "hooks/UseFindId";
import Button from "../../components/elements/Button";

interface checkmember {
  ismember: boolean;
  toggleMembership: () => void;
}

const FindId: React.FC<checkmember> = ({ ismember, toggleMembership }) => {
  const [email, setEmail] = useState("");
  const [handleSubmitFindIdForm] = UseFindIdForm(email, ismember);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <form
      onSubmit={handleSubmitFindIdForm}
      className=""
      style={{ width: "80%" }}
    >
      <div>
        <div className="flex">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            이메일
          </label>
        </div>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={handleEmailChange}
        ></input>
      </div>
      <br />
      <div className="my-3">
        <Button
          content="이메일로 아이디 전송하기"
          variant="success"
          width="400px"
          type="submit"
          customStyles={{ width: "100%" }}
        />
      </div>
      <div className="text-sm flex justify-center mt-4">
        <span className="mx-2">
          {ismember ? "일반 회원이 아니십니까?" : "병원 회원이 아니십니까?"}
        </span>
        <a href="" onClick={toggleMembership}>
          {ismember
            ? "병원회원 아이디 찾으러 가기?"
            : "일반회원 아이디 찾으러 가기"}
        </a>
      </div>
    </form>
  );
};

export default FindId;
