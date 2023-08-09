import { useState } from "react";
import AuthService from "auth/auth-service";

const authService = new AuthService();
const UseFindPasswordForm = (loginId: string, email: string, role: boolean) => {
  const [check, setCheck] = useState({ status: 0, data: { message: "" } });

  const FindPassword = async () => {
    const data = {
      loginId: loginId,
      email: email,
    };

    try {
      if (role === true) {
        setCheck(await authService.memberFindPassword(data));
      } else if (role === false) {
        setCheck(await authService.hospitalFindPassword(data));
      }

      const {
        status,
        data: { message },
      } = check;

      if (status === 200) {
        console.log("login Success");
        console.log(message);
      }
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  const handleSubmitFindPWForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    FindPassword();
  };

  return [handleSubmitFindPWForm];
};

export default UseFindPasswordForm;
