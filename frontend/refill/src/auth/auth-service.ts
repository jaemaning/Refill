import axios from "axios";
import { AxiosInstance, AxiosResponse } from "axios";
import { LoginRequest, LoginResult } from "./types";

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
}

export default AuthService;
