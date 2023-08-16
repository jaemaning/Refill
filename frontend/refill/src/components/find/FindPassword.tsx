import React, { useState, useEffect } from "react";
import UseFindPasswordForm from "hooks/UseFindPassword";
import Button from "../../components/elements/Button";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface checkmember {
  ismember: boolean;
}

const FindPassword: React.FC<checkmember> = ({ ismember }) => {
  const navigate = useNavigate();

  const [Id, setId] = useState("");
  const [email, setEmail] = useState("");

  const {
    handleSubmitFindPWForm,
    istrue: istrue,
    setisTrue,
  } = UseFindPasswordForm(Id, email, ismember);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmitFindPWForm();
    setisTrue(2);
  };
  // 이메일 형식에 맞는지 판단
  const [validEmail, setValidEmail] = useState(false);
  const validateEmail = (Email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+\.(com|net)$/;
    const isEmail = emailRegex.test(Email);
    setValidEmail(isEmail);
  };

  // 아이디 형식에 맞는지 판단
  const [validId, setValidId] = useState(false);
  const validateId = (id: string) => {
    const alphanumericRegex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{6,14}$/;
    const isValidId = alphanumericRegex.test(id);
    setValidId(isValidId);
  };

  useEffect(() => {
    validateEmail(email);
    validateId(Id);
  }, [email, Id]);

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
          text: "가입하신 이메일로 임시 비밀번호를 전송했습니다",
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
      if (email && Id) {
        Toast.fire({
          icon: "error",
          title: "정보가 일치하지 않습니다.",
        });
      }
    }
  }, [istrue]);

  return (
    <form onSubmit={handleFormSubmit} className="" style={{ width: "80%" }}>
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
          value={Id}
          onChange={handleIdChange}
        ></input>
        {Id.length > 0 && !validId && (
          <p className="text-sm ml-2 mt-1" style={{ color: "red" }}>
            영소문자와 숫자 조합으로 4글자 이상 16글자 이하로 입력해주세요.
          </p>
        )}
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
        {email.length > 0 && !validEmail && (
          <p className="text-sm ml-2 mt-1" style={{ color: "red" }}>
            이메일 형식에 맞게 작성해주세요
          </p>
        )}
      </div>
      <br />
      <div className="my-3">
        <Button
          content="이메일로 임의 비밀번호 전송하기"
          variant={ismember ? "success" : "warning"}
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
