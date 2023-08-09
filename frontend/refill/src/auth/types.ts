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

export type FindIdRequest = {
  email: string;
};

export type FindPasswordRequest = {
  loginId: string;
  email: string;
};

export type FindResult = {
  message: string;
};
