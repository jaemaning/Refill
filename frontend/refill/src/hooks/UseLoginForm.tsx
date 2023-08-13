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
import { useNavigate } from "react-router-dom";

interface User {
  loginId?: string;
  role?: string;
  iat?: number;
  exp?: number;
}

const authService = new AuthService();
const UseLoginForm = (loginId: string, loginPassword: string, role: number) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const login = async () => {
    const data = {
      loginId: loginId,
      loginPassword: loginPassword,
    };

    try {
      if (role === 0) {
        const check = await authService.memberlogin(data);
        checkstatus(check);
      } else if (role === 1) {
        const check = await authService.hospitallogin(data);
        checkstatus(check);
      }
    } catch (error: any) {
      setMessage(error.response.data.message);
    }
  };

  const checkstatus = (checked: any) => {
    if (checked.status === 200) {
      console.log("login Success");
      dispatch(
        loginSuccess({
          islogin: true, // 로그인 성공 시 true로 설정
          token: checked.data.accessToken, // 액세스 토큰 값 설정
        }),
      );

      setCookie("refresh-token", checked.data.refreshToken);
      const decode_token: User = jwt_decode(checked.data.accessToken);

      if (decode_token.role === "ROLE_MEMBER") {
        dispatch(loginMember());
      } else if (decode_token.role === "ROLE_HOSPITAL") {
        console.log(checked.data.id);
        dispatch(loginHospital({ hosid: checked.data.id }));
      } else if (decode_token.role === "ROLE_ADMIN") {
        dispatch(loginAdmin());
      }

      navigate("/");
    }
  };

  const handleSubmitLoginForm = async () => {
    await login();
  };

  return { handleSubmitLoginForm, message };
};

export default UseLoginForm;
