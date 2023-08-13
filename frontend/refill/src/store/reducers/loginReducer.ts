import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Loginstate } from "auth/types";

interface LoginState {
  token: string;
  islogin: boolean;
  ismember: boolean;
  ishospital: boolean;
  isadmin: boolean;
}

const initialState: LoginState = {
  token: "",
  islogin: false,
  ismember: false,
  ishospital: false,
  isadmin: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<Loginstate>) => {
      const { islogin, token } = action.payload;
      state.islogin = islogin;
      state.token = token;
      console.log(state.islogin);
      console.log(state.token);
    },
    loginMember: (state) => {
      state.ismember = true;
      state.ishospital = false;
      state.isadmin = false;
    },
    loginHospital: (state) => {
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
