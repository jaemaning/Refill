export type LoginRequest = {
  loginId: string;
  loginPassword: string;
};

export type LoginResult = {
  refreshToken: string;
  accessToken: string;
};

export type HLoginResult = {
  refreshToken: string;
  accessToekn: string;
  id: number;
};

export type Loginstate = {
  islogin: boolean;
  token: string;
};

export type Hosstate = {
  hosid: number;
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
