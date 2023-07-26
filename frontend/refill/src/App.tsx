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
      
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-indigo-600">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
            <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back home
              </a>
              <a href="#" className="text-sm font-semibold text-gray-900">
                Contact support <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </main>
    </div>
  );
}

export default App;
