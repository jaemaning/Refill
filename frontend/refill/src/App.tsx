import React from 'react';
import './App.css';
import Counter from './components/Counter';

function App() {
  return (
    <div className="App">
      <nav className="App-navbar">
        nav 바 임 tailwind css 로 grid 나 flex 박스 해볼 예정 &nbsp;
        <div className="App-nav-space"></div>
        <a href="">로그인</a> | &nbsp;
        <a href="">회원가입</a> | &nbsp;
        <a href="">상담</a>
      </nav>
      <div className="App-body">
        <h1>Hello Refill!</h1>

        <h3>test for redux ! </h3>
        <Counter />
      </div>
    </div>
  );
}

export default App;
