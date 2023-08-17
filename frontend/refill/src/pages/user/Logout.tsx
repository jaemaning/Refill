import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginFail } from "store/reducers/loginReducer";
import { removeCookie } from "auth/cookie";
import { useNavigate } from "react-router-dom";
import { RootState } from "store/reducers";

const Logout: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.login.token);

  useEffect(() => {
    console.log(token);
    const fetchLogout = async () => {
      try {
        const response = await axios.get("api/v1/account/logout", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        dispatch(loginFail());
        removeCookie("refresh-token");
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    };

    fetchLogout();
  }, [dispatch, navigate, token]); // 이 부분에 필요한 의존성을 명시해주세요

  return <div></div>;
};

export default Logout;
