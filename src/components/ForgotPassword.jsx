import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/fuck_suresh.jpg";
function ForgotPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      alert("Password doesn't match");
      return;
    }
    try {
      const currentURL = window.location.href;
      const url = new URL(currentURL);

      console.log(url);
      console.log(url.hash.slice(24));
      const emaill = url.hash.slice(24);

      const response = await axios.post(
        "https://defiant-cod-buckle.cyclic.app/api/reset-password",
        {
          emaill,
          password,
        }
      );

      if (response.status === 200) {
        navigate("/login");
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex justify-center font-sans items-center h-screen">
      <div
        className="bg-black p-6 rounded-md sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 h-3/4 flex flex-col justify-center items-center"
        style={{ width: "378px" }}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2 className="text-center text-3xl text-white font-semibold mb-6">
          Reset password
        </h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 rounded border  text-black font-bold bg-white border-gray-300"
          placeholder="New Password"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 mb-4 rounded border  text-black font-bold bg-white border-gray-300"
          placeholder="Confirm Password"
        />
        <button
          onClick={handleResetPassword}
          className="mt-4 w-auto p-2 bg-purple-700 text-white rounded hover:bg-purple-600"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
