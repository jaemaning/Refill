import React, {useState} from "react";
import axios from "axios";
// 토큰가져오기
import { RootState } from "store/reducers";
import { useSelector } from "react-redux";

type Doctor = {
    doctorId: number;
    name: string;
    profileImg: string;
    licenseNumber: string;
    licenseImg: string;
    // 필요한 경우 여기에 추가적인 필드를 추가하세요
  };

const DetailReservation: React.FC = () => {
  const token = useSelector((state: RootState) => state.login.token);
  
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  
  // axios로 detail hospital 호출
  const requestDoctors = () => {
    axios.get(`/api/v1/reservation/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
        console.log(response.data);
        setDoctors(response.data)
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  // 의사 Id로 reservation List 호출
  const clickDoctor = (doctorId: number) => {
    
    return 
  }

  // 호출된 내용을 바탕으로 날짜별 시간 만들고

  // 날짜랑 시간 클릭하면 환자 정보가 나옴

  /*
  상담 내역 받아오기
  @GetMapping("/{memberId}")

  상담리스트 받아오기
  @GetMapping("/")
  */

  return <div></div>;
};
export default DetailReservation;
