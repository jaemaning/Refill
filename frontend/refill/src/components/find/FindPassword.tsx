import React, { useState } from "react";
import UseFindPasswordForm from "hooks/UseFindPassword";
import Button from "../../components/elements/Button";


interface checkmember {
  ismember: boolean;
}

const FindPassword: React.FC<checkmember> = ({ ismember }) => {
  const [Id, setId] = useState("");
  const [email, setEmail] = useState("");

  const [handleSubmitFindIdForm] = UseFindPasswordForm(Id, email, ismember);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
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
            아이디
          </label>
        </div>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          placeholder="아이디를 입력해주세요"
          value={email}
          onChange={handleIdChange}
        ></input>
      </div>
      <br />
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
          content="이메일로 임의 비밀번호 전송하기"
          variant="success"
          width="400px"
          type="submit"
          customStyles={{ width: "100%" }}
        />
      </div>
      <div className="text-sm flex justify-center mt-4">
        <span className="mx-2">일반 회원이 아니십니까?</span>
        <a href="">병원회원 비밀번호 재설정하러 가기</a>
      </div>
    </form>
  );
};

export default FindPassword;
