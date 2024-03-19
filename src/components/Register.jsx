import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import backgroundImage from "../assets/fuck_suresh.jpg";
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const imageUrl = "";
  const videoUrl = "";
  const orderStatus = "";
  const LicenseAndAgreement = false;
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      localStorage.setItem(
        "components",
        name,
        email,
        phoneNumber,
        hashedPassword,
        imageUrl,
        videoUrl,
        LicenseAndAgreement
      );
      const response = await axios.post(
        "https://defiant-cod-buckle.cyclic.app/api/register",
        {
          name: name,
          email: email,
          phoneNumber: phoneNumber,
          password: hashedPassword,
          imageUrl: imageUrl,
          videoUrl: videoUrl,
          orderStatus: orderStatus,
          LicenseAndAgreement: LicenseAndAgreement,
        }
      );
      if (response.data.error === "existing_email") {
        setError("Email already exists. Please use a different email.");
      } else {
        localStorage.setItem("userToken", email);
        navigate("/otp");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("Registration failed. Please try again.");
        console.log(err);
      }
    }
  };
  return (
    <div className="flex justify-center font-sans items-center h-screen">
      <div
        className="bg-black sm:w-2/3 p-6 rounded-md  md:w-1/2 lg:w-1/3 xl:w-1/4 h-3/4 flex flex-col justify-center items-center"
        style={{ width: "378px" }}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2 className="text-center text-3xl text-white font-semibold mb-6">
          Create an Account
        </h2>
        <form className="mt-4 w-full" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 mb-4 text-black font-bold bg-white border rounded-md text-sm"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-4  text-black font-bold bg-white border rounded-md text-sm"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full p-2 mb-4  text-black font-bold bg-white border rounded-md text-sm"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4  text-black font-bold bg-white border rounded-md text-sm"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-2 mb-4  text-black font-bold bg-white border rounded-md text-sm"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="w-full flex flex-col items-center">
            <button
              type="submit"
              className="w-40 py-2 text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Register
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </form>
        <div className="login mt-6 text-center">
          <Link to="/login" className="text-purple-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
