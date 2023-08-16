import { useState } from "react";
import AuthService from "auth/auth-service";

const authService = new AuthService();
const UseFindIdForm = (email: string, role: boolean) => {
  const [check, setCheck] = useState({ status: 0, data: { message: "" } });
  const [message, setMessage] = useState("");
  const [istrue, setisTrue] = useState(2);
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
        setisTrue(0);
        setMessage("가입하신 이메일로 로그인 아이디를 전송했습니다");
      }
    } catch (error: any) {
      setMessage(error.response.data.message);
      setisTrue(1);
    }
  };

  const handleSubmitFindIdForm = async () => {
    await FindId();
  };

  return { handleSubmitFindIdForm, message, istrue, setisTrue };
};

export default UseFindIdForm;
