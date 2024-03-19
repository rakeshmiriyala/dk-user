import React, { useState, useEffect } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/fuck_suresh.jpg";

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userData, setUserData] = useState("");
  const [oldPass, setOldPass] = useState("");

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

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleOldPassChange = (event) => {
    setOldPass(event.target.value);
  };

  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("New Password and Confirm Password do not match");
      return;
    } else {
      try {
        const passwordMatch = await bcrypt.compare(oldPass, userData.password);

        if (passwordMatch) {
          try {
            const emaill = userData.email;
            const password = newPassword;

            const response = await axios.post(
              "https://reserve--arw2.repl.co/api/change-password",
              {
                emaill,
                password,
              }
            );

            if (response.status === 200) {
              alert("Password updated");
              window.location.href = "/";
            }
          } catch (error) {
            console.error(error);
          }
        } else {
          alert("Old password does not match");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex justify-center font-sans items-center h-screen">
      <div
        className="bg-black p-6 rounded-md sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 h-3/4 flex flex-col justify-center items-center"
        style={{
          width: "378px",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2 className="text-center text-3xl text-white font-semibold mb-6">
          Change Password
        </h2>
        <input
          type="password"
          placeholder="Old Password"
          className="w-full p-2 mb-4 text-black font-bold bg-white border rounded-md text-sm"
          value={oldPass}
          onChange={handleOldPassChange}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          className="w-full p-2 mb-4 text-black font-bold bg-white border rounded-md text-sm"
          value={newPassword}
          onChange={handleNewPasswordChange}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-2 mb-4 text-black font-bold bg-white border rounded-md text-sm"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
        />
        <button
          onClick={changePassword}
          className="mt-4 w-auto p-2 bg-purple-700 text-white rounded hover:bg-purple-600"
        >
          Change Password
        </button>
        <br />
        <Link
          to="/mailpage"
          className="flex justify-start text-purple-700 hover:underline"
        >
          Forgot Password
        </Link>
      </div>
    </div>
  );
}
