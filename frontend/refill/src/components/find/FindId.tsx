import React, { useEffect, useState } from "react";
import UseFindIdForm from "hooks/UseFindId";
import Button from "../../components/elements/Button";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface checkmember {
  ismember: boolean;
  toggleMembership: () => void;
}

const FindId: React.FC<checkmember> = ({ ismember, toggleMembership }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const {
    handleSubmitFindIdForm,
    message: msg,
    istrue: istrue,
    setisTrue,
  } = UseFindIdForm(email, ismember);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  // 이메일 형식에 맞는지 판단
  const [validEmail, setValidEmail] = useState(false);
  const validateEmail = (Email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+\.(com|net)$/;
    const isEmail = emailRegex.test(Email);
    setValidEmail(isEmail);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmitFindIdForm();
    setisTrue(2);
  };

  useEffect(() => {
    validateEmail(email);
  }, [email]);

  const Toast = Swal.mixin({
    toast: true,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const isSuccess = Swal.mixin({});

  useEffect(() => {
    if (istrue === 0) {
      isSuccess
        .fire({
          text: "가입하신 이메일로 로그인 아이디를 전송했습니다",
          icon: "success",

          showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
          confirmButtonColor: "#2E5077", // confrim 버튼 색깔 지정
          cancelButtonColor: "#F2981", // cancel 버튼 색깔 지정
          confirmButtonText: "로그인", // confirm 버튼 텍스트 지정
          cancelButtonText: "메인", // cancel 버튼 텍스트 지정
        })
        .then((result) => {
          if (result.isConfirmed) {
            // 만약 모달창에서 confirm 버튼을 눌렀다면
            navigate("/loginsignup");
          } else if (result.isDismissed) {
            navigate("/");
          }
        });
    } else if (istrue === 1) {
      if (msg.length > 0) {
        Toast.fire({
          icon: "error",
          title: `${msg}`,
        });
      }
    }
  }, [msg, istrue]);

  return (
    <form onSubmit={handleFormSubmit} className="" style={{ width: "80%" }}>
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
        {email.length > 0 && !validEmail && (
          <p className="text-sm ml-2 mt-1" style={{ color: "red" }}>
            이메일 형식에 맞게 작성해주세요
          </p>
        )}
      </div>
      <br />
      <div className="my-3">
        <Button
          content="이메일로 아이디 전송하기"
          width="400px"
          type="submit"
          customStyles={{ width: "100%" }}
          variant={ismember ? "success" : "warning"}
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
