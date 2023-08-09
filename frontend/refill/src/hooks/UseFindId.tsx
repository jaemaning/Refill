import { useState } from "react";
import AuthService from "auth/auth-service";

const authService = new AuthService();
const UseFindIdForm = (email: string, role: boolean) => {
  const [check, setCheck] = useState({ status: 0, data: { message: "" } });

  const FindId = async () => {
    const data = {
      email: email,
    };

    try {
      if (role === true) {
        setCheck(await authService.memberFindId(data));
      } else if (role === false) {
        setCheck(await authService.hospitalFindId(data));
      }

      if (check.status === 200) {
        console.log(check.status);
        console.log(check.data);
      }
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  const handleSubmitFindIdForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    FindId();
  };

  return [handleSubmitFindIdForm];
};

export default UseFindIdForm;
