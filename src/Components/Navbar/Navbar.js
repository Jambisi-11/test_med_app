// import React from 'react';
// import { Link } from "react-router-dom";
// import "./Navbar.css";

// const Navbar = () => {
//   const handleClick = () => {
//     console.log("Navbar clicked");
//   };

//   return (
//     <div>
//       <nav>
//         <div className="nav__logo">
//           <Link to="/">
//             His Fullness 
//             <svg xmlns="http://www.w3.org/2000/svg" height="26" width="26" viewBox="0 0 1000 1000" style={{ fill: "#3685fb" }}>
//               <title>Doctor With Stethoscope SVG icon</title>
//               <g>
//                 <path d="M499.8,10c91.7,0,166,74.3,166,166c0,91.7-74.3,166-166,166c-91.7,0-166-74.3-166-166C333.8,84.3,408.1,10,499.8,10z"></path>
//                 <path d="M499.8,522.8c71.2,0,129.1-58.7,129.1-129.1H370.6C370.6,464.1,428.6,522.8,499.8,522.8z"></path>
//               </g>
//             </svg>
//           </Link>
//           <span>.</span>
//         </div>

//         <div className="nav__icon" onClick={handleClick}>
//           <i className="fa fa-bars"></i>
//         </div>

//         <ul className="nav__links active">
//           <li className="link">
//             <Link to="/">Home</Link>
//           </li>
//           <li className="link">
//             <Link to="/appointments">Appointments</Link>
//           </li>
//           <li className="link">
//             <Link to="/signup">
//               <button className="btn1">Sign Up</button>
//             </Link>
//           </li>
//           <li className="link">
//             <Link to="/login">
//               <button className="btn1">Login</button>
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;


import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in by checking sessionStorage
    const token = sessionStorage.getItem("auth-token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();  // Clear all stored session data
    setIsLoggedIn(false);
    navigate("/login");  // Redirect to login page
  };

  return (
    <div>
      <nav>
        <div className="nav__logo">
          <Link to="/">
            His Fullness 
            <svg xmlns="http://www.w3.org/2000/svg" height="26" width="26" viewBox="0 0 1000 1000" style={{ fill: "#3685fb" }}>
              <title>Doctor With Stethoscope SVG icon</title>
              <g>
                <path d="M499.8,10c91.7,0,166,74.3,166,166c0,91.7-74.3,166-166,166c-91.7,0-166-74.3-166-166C333.8,84.3,408.1,10,499.8,10z"></path>
                <path d="M499.8,522.8c71.2,0,129.1-58.7,129.1-129.1H370.6C370.6,464.1,428.6,522.8,499.8,522.8z"></path>
              </g>
            </svg>
          </Link>
          <span>.</span>
        </div>

        <ul className="nav__links active">
          <li className="link">
            <Link to="/">Home</Link>
          </li>
          <li className="link">
            <Link to="/appointments">Appointments</Link>
          </li>

          {isLoggedIn ? (
            // If user is logged in, show logout button
            <li className="link">
              <button className="btn1" onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            // If user is NOT logged in, show Sign Up & Login buttons
            <>
              <li className="link">
                <Link to="/signup">
                  <button className="btn1">Sign Up</button>
                </Link>
              </li>
              <li className="link">
                <Link to="/login">
                  <button className="btn1">Login</button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
