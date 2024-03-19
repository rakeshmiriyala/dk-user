import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ProfilePage() {
  const usertoken = localStorage.getItem("userToken");
  const [showLoginScreen, setShowLoginScreen] = useState(!usertoken);

  useEffect(() => {
    if (!usertoken) {
      setShowLoginScreen(true);
    }
  }, [usertoken]);
  const [userData, setUserData] = useState(null);
  const handleLoginRedirect = () => {
    window.location.href = "/login";
  };

  useEffect(() => {
    const email = localStorage.getItem("userToken");

    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://defiant-cod-buckle.cyclic.app/api/user-detail?email=${email}`
        );
        const userData = response.data;

        if (userData) {
          setUserData(userData);
        } else {
          console.log("Email not found in the data");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (email) {
      fetchUserData();
    }
  }, []);

  const handleLogoutClick = () => {
    localStorage.clear();
    sessionStorage.removeItem("license");
    window.location.href = "/";
  };

  if (!localStorage.getItem("userToken")) {
    return showLoginScreen ? (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white background
          zIndex: 9999, // Set a high z-index for the overlay
          display: "block",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            zIndex: 10000,
          }}
        >
          <h1 style={{ color: "#000" }}>Please login</h1>
          <br />
          <br />
          <Link
            to="/login"
            style={{
              backgroundColor: "#000",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              cursor: "pointer",
              zIndex: 10001,
            }}
          >
            Login
          </Link>
        </div>
      </div>
    ) : null;
  }

  return (
    <div className="relative">
      <div className="hero min-h-screen bg-white">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Profile Details</h1>
            <br />
            <br />
            {userData && (
              <div className="mb-4 text-xl font-sans justify-start text-left font-thin">
                <p className="font-bold sm:text-xl  ">Name: {userData.name}</p>
                <br />
                <p className="font-bold text-xl">Email: {userData.email}</p>
                <br />
                <p className="font-bold text-xl">
                  Phone Number: {userData.phoneNumber}
                </p>
              </div>
            )}
            <br />
            <hr />
            <br />
            <Link
              to="/changepassword"
              className="bg-purple-600 text-white font-sans px-4 py-2 rounded mb-4 hover:bg-purple-700 mx-2 h-auto"
            >
              Change Password
            </Link>

            <button
              onClick={handleLogoutClick}
              className="bg-red-600 text-white font-sans px-4 py-2 rounded hover-bg-red-700 mb-4 mx-2 h-auto"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
