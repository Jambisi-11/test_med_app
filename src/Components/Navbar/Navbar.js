// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import ReviewTable from "../Review Table/ReviewTable"; // Import the ReviewTable component
// import "./Navbar.css";
// // import ReportsLayout from "../ReportsLayout/ReportsLayout";
// // import InstantConsultation from "../InstantConsultationBooking/InstantConsultation";


// const Navbar = () => {
//   const navigate = useNavigate();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userName, setUserName] = useState(""); // Store logged-in user's name
//   const [showReviewTable, setShowReviewTable] = useState(false); // State to control ReviewTable visibility
//   const [showProfileMenu, setShowProfileMenu] = useState(false); // State to control profile menu visibility

//   useEffect(() => {
//     // Check if user is logged in by checking sessionStorage
//     const token = sessionStorage.getItem("auth-token");
//     const storedName = sessionStorage.getItem("name"); // Get name from sessionStorage

//     if (token) {
//       setIsLoggedIn(true);
//       setUserName(storedName);
//     } else {
//       setIsLoggedIn(false);
//       setUserName("");
//     }
//   }, []);

//   const handleLogout = () => {
//     sessionStorage.clear(); // Clear all stored session data
//     setIsLoggedIn(false);
//     setUserName("");
//     navigate("/login"); // Redirect to login page
//   };

//   const toggleReviewTable = () => {
//     setShowReviewTable((prev) => !prev); // Toggle ReviewTable visibility
//   };

//   const toggleProfileMenu = (e) => {
//     e.stopPropagation(); // Prevent click from affecting other elements
//     setShowProfileMenu((prev) => !prev);
//   };
  
//   // Close menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (!event.target.closest(".user-name")) {
//         setShowProfileMenu(false);
//       }
//     };
  
//     document.addEventListener("click", handleClickOutside);
//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, []);
  
//   return (
//     <div>
//       <nav>
//         <div className="nav__logo">
//           <Link to="/">
//             His Fullness
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               height="26"
//               width="26"
//               viewBox="0 0 1000 1000"
//               style={{ fill: "#3685fb" }}
//             >
//               <title>Doctor With Stethoscope SVG icon</title>
//               <g>
//                 <path d="M499.8,10c91.7,0,166,74.3,166,166c0,91.7-74.3,166-166,166c-91.7,0-166-74.3-166-166C333.8,84.3,408.1,10,499.8,10z"></path>
//                 <path d="M499.8,522.8c71.2,0,129.1-58.7,129.1-129.1H370.6C370.6,464.1,428.6,522.8,499.8,522.8z"></path>
//               </g>
//             </svg>
//           </Link>
//           <span>.</span>
//         </div>

//         <ul className="nav__links active">
//           <li className="link">
//             <Link to="/">Home</Link>
//           </li>
//           <li className="link">
//             <Link to="/instant-consultation">Appointments</Link>
//           </li>

//           {/* Add ReviewTable toggle link */}
//           {isLoggedIn && (
//             <li className="link">
//               {/* <a href="#" onClick={toggleReviewTable}>
//                 {showReviewTable ? "Close Review" : "Review"}
//               </a> */}
//               {/* <button onClick={toggleReviewTable} className="review-toggle-btn">
//                 {showReviewTable ? "Close Review" : "Review"}
//               </button> */}
//               <span onClick={toggleReviewTable} className="review-toggle-btn" style={{ cursor: "pointer", hover:"blue" }}>
//                 {showReviewTable ? "Close Review" : "Review"}
//               </span>

//             </li>
//           )} 

//           {isLoggedIn ? (
//             <>
//               {/* Show username with a nested profile menu */}
//               <li 
//                 className={`link user-name ${showProfileMenu ? "active" : ""}`} 
//                 onClick={toggleProfileMenu}
//               >
//                 <span>Welcome, {userName}!</span>
//                 <ul className="profile-menu">
//                   <li><Link to="/profile">Your Profile</Link></li>
//                   <li><Link to="/reports">Your Reports</Link></li>

                  
//                 </ul>
//               </li>

//               <li className="link">
//                 <button className="btn1 logout-btn" onClick={handleLogout}>
//                   Logout
//                 </button>
//               </li>
//             </>
//           ) : (
//             <>
//               <li className="link">
//                 <Link to="/signup">
//                   <button className="btn1">Sign Up</button>
//                 </Link>
//               </li>
//               <li className="link">
//                 <Link to="/login">
//                   <button className="btn1">Login</button>
//                 </Link>
//               </li>
//             </>
//           )}
//         </ul>
//       </nav>

//       {/* Conditionally render the ReviewTable */}
//       {isLoggedIn && showReviewTable && (
//         <div className="review-table-modal">
//           <ReviewTable />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;




import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReviewTable from "../Review Table/ReviewTable"; // Import the ReviewTable component
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(""); // Store logged-in user's name
  const [showReviewTable, setShowReviewTable] = useState(false); // State to control ReviewTable visibility
  const [showProfileMenu, setShowProfileMenu] = useState(false); // State to control profile menu visibility

  // Ref for the ReviewTable container
  const reviewTableRef = useRef(null);

  useEffect(() => {
    // Check if user is logged in by checking sessionStorage
    const token = sessionStorage.getItem("auth-token");
    const storedName = sessionStorage.getItem("name"); // Get name from sessionStorage

    if (token) {
      setIsLoggedIn(true);
      setUserName(storedName);
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.clear(); // Clear all stored session data
    setIsLoggedIn(false);
    setUserName("");
    navigate("/login"); // Redirect to login page
  };

  const toggleReviewTable = (e) => {
    e.stopPropagation(); // Prevent event propagation
    console.log("Toggling Review Table. Current State:", showReviewTable);
    setShowReviewTable((prev) => !prev); // Toggle ReviewTable visibility
  };

  const toggleProfileMenu = (e) => {
    e.stopPropagation(); // Prevent click from affecting other elements
    setShowProfileMenu((prev) => !prev);
  };

  // Close ReviewTable when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close ReviewTable if clicked outside
      if (reviewTableRef.current && !reviewTableRef.current.contains(event.target)) {
        setShowReviewTable(false);
      }

      // Close profile menu if clicked outside
      if (!event.target.closest(".user-name")) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Close ReviewTable when clicking on other menu items
  const handleMenuClick = () => {
    setShowReviewTable(false);
  };

  return (
    <div>
      <nav>
        <div className="nav__logo">
          <Link to="/" onClick={handleMenuClick}>
            His Fullness
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="26"
              width="26"
              viewBox="0 0 1000 1000"
              style={{ fill: "#3685fb" }}
            >
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
            <Link to="/" onClick={handleMenuClick}>
              Home
            </Link>
          </li>
          <li className="link">
            <Link to="/instant-consultation" onClick={handleMenuClick}>
              Appointments
            </Link>
          </li>

          {/* Add ReviewTable toggle link */}
          {isLoggedIn && (
            <li className="link">
              <span
                onClick={(e) => toggleReviewTable(e)}
                className="review-toggle-btn"
                style={{ cursor: "pointer" }}
              >
                {showReviewTable ? "Close Review" : "Review"}
              </span>
            </li>
          )}

          {isLoggedIn ? (
            <>
              {/* Show username with a nested profile menu */}
              <li
                className={`link user-name ${showProfileMenu ? "active" : ""}`}
                onClick={toggleProfileMenu}
              >
                <span>Welcome, {userName}!</span>
                <ul className="profile-menu">
                  <li>
                    <Link to="/profile" onClick={handleMenuClick}>
                      Your Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/reports" onClick={handleMenuClick}>
                      Your Reports
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="link">
                <button className="btn1 logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="link">
                <Link to="/signup" onClick={handleMenuClick}>
                  <button className="btn1">Sign Up</button>
                </Link>
              </li>
              <li className="link">
                <Link to="/login" onClick={handleMenuClick}>
                  <button className="btn1">Login</button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Conditionally render the ReviewTable */}
      {isLoggedIn && showReviewTable && (
        console.log("Rendering ReviewTable"),
        <div className="review-table-modal" ref={reviewTableRef}>
          <ReviewTable />
        </div>
      )}
    </div>
  );
};

export default Navbar;