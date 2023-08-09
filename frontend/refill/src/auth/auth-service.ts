import axios from "axios";
import { AxiosInstance, AxiosResponse } from "axios";
import { LoginRequest, LoginResult } from "./types";
import { FindIdRequest, FindPasswordRequest, FindResult } from "./types";

class AuthService {
  private base: AxiosInstance;

  constructor() {
    this.base = axios.create({
      baseURL: "",
    });
  }

  async memberlogin(data: LoginRequest) {
    const memberlogin = "/api/v1/account/member/login";

    const headers = {
      "Content-Type": "application/json",
    };
    const response: AxiosResponse<LoginResult> = await axios.post(
      memberlogin,
      data,
      { headers },
    );
    return response;
  }

  async hospitallogin(data: LoginRequest) {
    const hospitallogin = "/api/v1/account/hospital/login";

    const headers = {
      "Content-Type": "application/json",
    };
    const response: AxiosResponse<LoginResult> = await axios.post(
      hospitallogin,
      data,
      { headers },
    );
    return response;
  }
  async memberFindId(data: FindIdRequest) {
    const memberFindId = "/api/v1/account/member/find/id";

    const headers = {
      "Content-Type": "application/json",
    };
    const response: AxiosResponse<FindResult> = await axios.post(
      memberFindId,
      data,
      { headers },
    );
    return response;
  }

  async memberFindPassword(data: FindPasswordRequest) {
    const hospitallogin = "/api/v1/account/member/find/password";

    const headers = {
      "Content-Type": "application/json",
    };
    const response: AxiosResponse<FindResult> = await axios.post(
      hospitallogin,
      data,
      { headers },
    );
    return response;
  }

  async hospitalFindId(data: FindIdRequest) {
    const hospitalFindId = "/api/v1/account/hospital/find/id";

    const headers = {
      "Content-Type": "application/json",
    };
    const response: AxiosResponse<FindResult> = await axios.post(
      hospitalFindId,
      data,
      { headers },
    );
    return response;
  }

  async hospitalFindPassword(data: FindPasswordRequest) {
    const hospitalFindPassword = "/api/v1/account/hospital/password";

    const headers = {
      "Content-Type": "application/json",
    };
    const response: AxiosResponse<FindResult> = await axios.post(
      hospitalFindPassword,
      data,
      { headers },
    );
    return response;
  }
}

export default AuthService;
