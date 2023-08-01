import React from "react";
import "./App.css";
import MainApp from "./pages/MainPage";
import { Routes, Route } from "react-router-dom";
import { HospitalSearch } from "./pages/HospitalSearchPage";
import LoginForm from "pages/LoginForm";


const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/search" element={<HospitalSearch />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/hos_login" />
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
