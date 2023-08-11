import React from "react";
import "./App.css";
import MainApp from "./pages/MainPage";
import { Routes, Route } from "react-router-dom";
import { HospitalSearch } from "./pages/HospitalSearchPage";
import LoginForm from "pages/LoginForm";
import HLoginForm from "pages/HLoginForm";
import SignUp from "pages/SignUp";
import { useKakaoMapScript } from "./hooks/UseKakaoMap";
import HSingUp from "pages/HSignUp";
import Mypage from "pages/Mypage";
import DetailHospital from "pages/DetailHospital";
import AIDiagnosis from "pages/aidiagnosis/AIDiagnosis";
import AIDiagnosisSecond from "pages/aidiagnosis/AIDiagnosisSecond";
import AIDiagnosisResult from "pages/aidiagnosis/AIDiagnosisResult";
import Logout from "pages/user/Logout";
import FindIdPassword from "pages/user/FindIdPassword";
// import WebRTC from "pages/WebRTC";

const App: React.FC = () => {
  useKakaoMapScript();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/search" element={<HospitalSearch />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/hos_login" element={<HLoginForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/hos_signup" element={<HSingUp />} />
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
        {/* <Route path="/webrtc" element={<WebRTC />} /> */}

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
