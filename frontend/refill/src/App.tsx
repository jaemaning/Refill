import React from 'react';
import './App.css';
import Counter from './components/Counter';
import nav_logo from './assets/logo_final.png';
import LoginForm from './LoginForm'

const App: React.FC = () => {
  return (
    <div className="App">
      <nav className="App-navbar flex">
        <img src={nav_logo} alt="nav_log" />
        <div className="flex align-items-center">
          <a href="">예약</a>
          <a href="">서비스</a>
          <a href="">로그인</a>
          <a href="">회원가입</a>
        </div>
      </nav>
      <div className="App-body">
        <h1>Hello Refill!</h1>
        <h3>test for redux ! </h3>
        <LoginForm />
        <Counter />
      </div>
    </div>
  );
}

export default App;
