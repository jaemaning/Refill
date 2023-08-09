import * as React from 'react';
import axios from 'axios';
import { RootState } from "store/reducers";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface WaitingHospitalResponse {
  id: number;
  loginId: string;
  name: string;
  address: string;
  tel: string;
  email: string;
  hospitalProfileImg: string;
  registrationImg: string;
}

const WaitingHospitalList: React.FC = () => {
  const token: string = useSelector((state: RootState) => state.login.token);
  const islogin: boolean = useSelector((state: RootState) => state.login.islogin);
  const navigate = useNavigate();

  const [hospitals, setHospitals] = React.useState<WaitingHospitalResponse[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchHospitals = async () => {
    try {
      if (islogin) {
        const response = await axios.get<WaitingHospitalResponse[]>("api/v1/admin/hospitals", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        });
        setHospitals(response.data);
      } else {
        navigate("/");
        alert("접근 권한이 없습니다.");
      }
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchHospitals();
  }, []);

  const handleAccept = async (id: number) => {
    try {
      const response = await axios.get<string>(`api/v1/admin/hospitals/accept/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });
      alert(response.data);
      // 병원 목록을 다시 가져옵니다.
      fetchHospitals();
    } catch (error) {
      console.error("Error accepting hospital:", error);
    }
  }

  const handleReject = async (id: number) => {
    try {
      const response = await axios.get<string>(`api/v1/admin/hospitals/reject/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });
      alert(response.data);
      // 병원 목록을 다시 가져옵니다.
      fetchHospitals();
    } catch (error) {
      console.error("Error rejecting hospital:", error);
    }
  }

  


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* 간단한 테이블 출력 */}
      <table style={{ margin: 'auto' }}>       
       <thead>
          <tr>
            <th>ID</th>
            <th>Login ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Tel</th>
            <th>Email</th>
            <th>Profile Image</th>
            <th>Registration Image</th>
          </tr>
        </thead>
        <tbody>
          {hospitals.map(hospital => (
            <tr key={hospital.id}>
              <td>{hospital.id}</td>
              <td>{hospital.loginId}</td>
              <td>{hospital.name}</td>
              <td>{hospital.address}</td>
              <td>{hospital.tel}</td>
              <td>{hospital.email}</td>
              <td><img src={hospital.hospitalProfileImg} alt="Profile" width="50" /></td>
              <td><img src={hospital.registrationImg} alt="Registration" width="50" /></td>
              <td>
                <button onClick={() => handleAccept(hospital.id)}>승인</button>
                <button onClick={() => handleReject(hospital.id)}>거절</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default WaitingHospitalList;