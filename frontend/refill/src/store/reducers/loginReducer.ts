import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Hosstate, Loginstate } from "auth/types";

interface LoginState {
  token: string;
  islogin: boolean;
  ismember: boolean;
  ishospital: boolean;
  isadmin: boolean;
  hosid: number;
  loginId: string;
}

const initialState: LoginState = {
  token: "",
  islogin: false,
  ismember: false,
  ishospital: false,
  isadmin: false,
  hosid: 0,
  loginId: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<Loginstate>) => {
      const { islogin, token, loginId } = action.payload;
      state.islogin = islogin;
      state.token = token;
      state.loginId = loginId;
      console.log(state.islogin);
      console.log(state.token);
    },
    loginMember: (state) => {
      state.ismember = true;
      state.ishospital = false;
      state.isadmin = false;
    },
    loginHospital: (state, action: PayloadAction<Hosstate>) => {
      const { hosid } = action.payload;
      console.log(hosid);
      state.hosid = hosid;
      console.log(state.hosid);
      state.ismember = false;
      state.ishospital = true;
      state.isadmin = false;
    },
    loginAdmin: (state) => {
      state.ishospital = false;
      state.ismember = false;
      state.isadmin = true;
    },
    loginFail: () => initialState,
  },
});

export const {
  loginSuccess,
  loginMember,
  loginHospital,
  loginAdmin,
  loginFail,
} = loginSlice.actions;
export default loginSlice.reducer;
