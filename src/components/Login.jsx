import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import bcrypt from "bcryptjs";
import backgroundImage from "../assets/fuck_suresh.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    function prevent() {
      window.history.forward();
    }

    setTimeout(prevent, 0);

    // You can use window.onload in useEffect
    window.onload = function () {
      // Your window.onload code here
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://defiant-cod-buckle.cyclic.app/api/login",
        {
          email,
          password,
        }
      );
      const users = response.data;
      const user = users.find((user) => user.email === email);
      if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          localStorage.setItem("userToken", email);
          sessionStorage.setItem("license", "agreed");
          window.location = "/";
        } else {
          setError("Invalid credentials. Please try again.");
        }
      } else {
        setError("User not found.");
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
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
          Login
        </h2>
        <form className="mt-4 w-full" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-4 text-black font-bold bg-white border rounded-md text-sm"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 text-black font-bold bg-white border rounded-md text-sm"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="w-full flex flex-col items-center">
            <Link
              to="/mailpage"
              className="text-purple-700 hover:underline mb-2"
            >
              Forgot Password?
            </Link>
            <br />
            <button
              type="submit"
              className="w-24 py-2 text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Login
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </form>
        <div className="create-account mt-6  cursor-pointer text-center">
          <Link to="/register" className="text-purple-700 hover:underline">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
