import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReviewTable from "../Review Table/ReviewTable"; // Import the ReviewTable component
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(""); // Store logged-in user's name
  const [showReviewTable, setShowReviewTable] = useState(false); // State to control ReviewTable visibility
  const [showProfileMenu, setShowProfileMenu] = useState(false); // State to control profile menu visibility

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

  const toggleReviewTable = () => {
    setShowReviewTable((prev) => !prev); // Toggle ReviewTable visibility
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu((prev) => !prev); // Toggle profile menu visibility
  };

  return (
    <div>
      <nav>
        <div className="nav__logo">
          <Link to="/">
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
            <Link to="/">Home</Link>
          </li>
          <li className="link">
            <Link to="/appointments">Appointments</Link>
          </li>

          {/* Add ReviewTable toggle link */}
          {isLoggedIn && (
            <li className="link">
              <a href="#" onClick={toggleReviewTable}>
                {showReviewTable ? "Close Review" : "Review"}
              </a>
            </li>
          )}

          {isLoggedIn ? (
            <>
              {/* Show username with a nested profile menu */}
              <li className="link user-name" onClick={toggleProfileMenu}>
                <span>Welcome, {userName}!</span>
                {showProfileMenu && (
                  <ul className="profile-menu">
                    <li>
                      <Link to="/profile">Your Profile</Link>
                    </li>
                  </ul>
                )}
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

      {/* Conditionally render the ReviewTable */}
      {isLoggedIn && showReviewTable && (
        <div className="review-table-modal">
          <ReviewTable />
        </div>
      )}
    </div>
  );
};

export default Navbar;