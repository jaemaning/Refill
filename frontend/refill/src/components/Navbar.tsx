import React, { useState } from "react";
import "../styles/Navbar.css";
import nav_logo from "../assets/logo_final.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  const middle = "flex justify-between items-center";
  const [isMenuOpen, setMenuOpen] = useState(false);

  //. 이쪽에서 router 설정 해주시면 됩니다.
  const menuList = [
    ["예약", "#"],
    ["병원검색", "/search"],
    ["AI자가진단", "#"],
    ["로그인", "#"],
    ["회원가입", "#"],
  ];

  const handleMenuToggle = () => {
    setMenuOpen((prevMenuState) => !prevMenuState);
  };

  return (
    <div className="w-100">
      <nav className="bg-white border-gray-200 w-full mx-auto">
        <div className="flex flex-wrap items-center dark:bg-gray-900 justify-between p-6 w-full mx-auto">
          <Link to="/" className="flex items-center">
            <img src={nav_logo} alt="nav_log" className="w-22 h-14" />
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen}
            onClick={handleMenuToggle}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } w-full lg:block lg:w-auto`}
            id="navbar-default"
            style={{ zIndex: 5 }}
          >
            <ul className="font-medium flex flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
              {menuList.map((menu, i) => {
                return (
                  <li key={i} className="ml-0 lg:ml-20 text-center">
                    <Link
                      to={menu[1]}
                      className="text-sm block py-2 px-5 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                    >
                      {menu[0]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </div>
    // <div className="Nav-body">
    //   <nav className="flex justify-end">
    //     <img src={nav_logo} alt="nav_log" />
    //     <div className= {`${middle}`}>
    //       <a href="/">예약</a>
    //       <a href="/">서비스</a>
    //       <a href="/">로그인</a>
    //       <a href="/">회원가입</a>
    //     </div>
    //   </nav>
    // </div>
  );
}
