import { useState } from "react";
import { useDispatch } from "react-redux";
import AuthService from "auth/auth-service";
import jwt_decode from "jwt-decode";
import {
  loginSuccess,
  loginMember,
  loginHospital,
  loginAdmin,
} from "store/reducers/loginReducer";
import { setCookie } from "auth/cookie";

interface User {
  loginId?: string;
  role?: string;
  iat?: number;
  exp?: number;
}

const authService = new AuthService();
const UseLoginForm = (loginId: string, loginPassword: string, role: number) => {
  const [check, setCheck] = useState({
    status: 0,
    data: { accessToken: "", refreshToken: "" },
  });
  const dispatch = useDispatch();

  const login = async () => {
    const data = {
      loginId: loginId,
      loginPassword: loginPassword,
    };

    try {
      if (role === 0) {
        setCheck(await authService.memberlogin(data));
      } else if (role === 1) {
        setCheck(await authService.hospitallogin(data));
      }

      const {
        status,
        data: { accessToken, refreshToken },
      } = check;

      if (status === 200) {
        console.log("login Success");
        dispatch(
          loginSuccess({
            islogin: true, // 로그인 성공 시 true로 설정
            token: accessToken, // 액세스 토큰 값 설정
          }),
        );

        setCookie("refresh-token", refreshToken);
        const decode_token: User = jwt_decode(accessToken);

        if (decode_token.role === "ROLE_MEMBER") {
          dispatch(loginMember());
        } else if (decode_token.role === "ROLE_HOSPITAL") {
          dispatch(loginHospital());
        } else if (decode_token.role === "ROLOE_ADMIN") {
          dispatch(loginAdmin());
        }
      }
    } catch (error: any) {
      // 이후 모달 처리
      console.log(error.response.data.message);
    }
  };

  const handleSubmitLoginForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login();
  };

  return [handleSubmitLoginForm];
};

export default UseLoginForm;
