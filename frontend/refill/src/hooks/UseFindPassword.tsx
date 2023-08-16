import { useState } from "react";
import AuthService from "auth/auth-service";

const authService = new AuthService();
const UseFindPasswordForm = (loginId: string, email: string, role: boolean) => {
  const [check, setCheck] = useState({ status: 0, data: { message: "" } });
  const [istrue, setisTrue] = useState(2);

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
        setisTrue(0);
      }
    } catch (error: any) {
      setisTrue(1);
      console.log(error);
    }
  };

  const handleSubmitFindPWForm = async () => {
    await FindPassword();
  };

  return { handleSubmitFindPWForm, istrue, setisTrue };
};

export default UseFindPasswordForm;
