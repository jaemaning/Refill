export type LoginRequest = {
  loginId: string;
  loginPassword: string;
};

export type LoginResult = {
  refreshToken: string;
  accessToken: string;
};

export type Loginstate = {
  islogin: boolean;
  token: string;
};
