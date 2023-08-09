import * as React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WaitingHospitalList from 'components/admin/WaitingHospitalList';
import ReportReviewList from 'components/admin/ReportReviewList';

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
    <div className="flex flex-col h-full">
      <Navbar />
      <main className="flex-grow flex justify-center mt-8 px-4 lg:px-0">
        <div className="flex-shrink-0 mr-1000px"> 
          <WaitingHospitalList />
        </div>
        <div className="flex-shrink-0">
          <ReportReviewList />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Admin;