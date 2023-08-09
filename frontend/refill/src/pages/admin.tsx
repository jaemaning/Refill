import * as React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WaitingHospitalList from 'components/admin/WaitingHospitalList';

// react hooks 3대장
// useSelector
// emotion styles를 써서 components
// typescript

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


const Admin: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Navbar />

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '0 10%' }}>
        <WaitingHospitalList />
        {/* 여기에 '신고 내역 관리' 컴포넌트를 배치할 예정입니다. */}
      </div>

      <Footer />
    </div>
  );
}

export default Admin;