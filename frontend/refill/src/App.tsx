import React from "react";
import "./App.css";
import MainApp from "./pages/MainPage";
import { Routes, Route } from "react-router-dom";
import { HospitalSearch } from "./pages/HospitalSearchPage";
import LoginForm from "pages/user/LoginForm";
import HLoginForm from "components/loginsignup/HospitalLogin";
import SignUp from "components/loginsignup/MemberSignup";
import { useKakaoMapScript } from "./hooks/UseKakaoMap";
import Mypage from "pages/Mypage";
import DetailHospital from "pages/hospital/DetailHospital";
import AIDiagnosis from "pages/aidiagnosis/AIDiagnosis";
import AIDiagnosisSecond from "pages/aidiagnosis/AIDiagnosisSecond";
import AIDiagnosisResult from "pages/aidiagnosis/AIDiagnosisResult";
import Logout from "pages/user/Logout";
import FindIdPassword from "pages/user/FindIdPassword";
import RegisterDoctor from "pages/hospital/RegisterDoctor";
// import WebRTC from "pages/WebRTC";
import VideoChatPage from "pages/openvidu/VideoChatPage";
import JoinPage from "pages/openvidu/joinpage";
import BEVideoChatPage from "pages/openvidu/VideoChatPage";
// import { OpenVidu } from "openvidu-browser";

const App: React.FC = () => {
  useKakaoMapScript();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/search" element={<HospitalSearch />} />
        <Route path="/loginsignup" element={<LoginForm />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route
          path="/DetailHospital/:hospitalId"
          element={<DetailHospital />}
        />
        <Route path="/diagnosis" element={<AIDiagnosis />} />
        <Route path="/diagnosisSecond" element={<AIDiagnosisSecond />} />
        <Route path="/diagnosisResult" element={<AIDiagnosisResult />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/find" element={<FindIdPassword />} />
        {/* <Route path="/RegisterDoctor" element={<RegisterDoctor />} /> */}
        {/* <Route path="/webrtc" element={<WebRTC />} /> */}
        <Route path="/video" element={<VideoChatPage />} />
        {/* <Route path="/video" element={<BEVideoChatPage />} /> */}
        <Route path="/join" element={<JoinPage />} />

        <Route
          path="*"
          element={
            <div>
              404
              <br />
              NOT FOUND
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
