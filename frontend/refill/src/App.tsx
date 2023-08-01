import React from "react";
import "./App.css";
import MainApp from "./pages/MainPage";
import { Routes, Route } from "react-router-dom";
import LoginForm from "pages/LoginForm";
import HLoginForm from "pages/HLoginForm";
import SignUp from "pages/SignUp";

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/hos_login" element={<HLoginForm />}/>
        <Route path="/signup" element={<SignUp />}/>
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
