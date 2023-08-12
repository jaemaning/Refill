import axios from "axios";
import { AxiosInstance, AxiosResponse } from "axios";

class DoctorService {
  private base: AxiosInstance;

  constructor() {
    this.base = axios.create({
      baseURL: "",
    });
  }

  // async DoctorRegister(data : ){

  // }
}

export default DoctorService;
