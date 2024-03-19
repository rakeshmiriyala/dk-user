import React, { useState } from "react";
import axios from "axios";
import backgroundImage from "../assets/fuck_suresh.jpg";

export default function Mailpage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRequestResetLink = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      // const mainUrl = window.location.origin;
      // console.log(mainUrl);

      const response = await axios.post(
        "https://defiant-cod-buckle.cyclic.app/api/send-reset-link",
        {
          email,
        }
      );

      if (response.status === 200) {
        setMessage("Password reset link sent to your email.");
      } else {
        setMessage("Request failed. Please try again.");
      }

      setLoading(false);
    } catch (error) {
      setMessage("Request failed. Please try again.");
      setLoading(false);
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
          Forgot Password
        </h2>
        {message ? (
          <p className="text-white mb-4">{message}</p>
        ) : (
          <form className="mt-4 w-full" onSubmit={handleRequestResetLink}>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 mb-4  text-black font-bold bg-white border rounded-md text-sm"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            {loading ? (
              <section className=" flex justify-center items-center">
                <div className="typing-indicator">
                  <div className="typing-circle"></div>
                  <div className="typing-circle"></div>
                  <div className="typing-circle"></div>
                  <div className="typing-shadow"></div>
                  <div className="typing-shadow"></div>
                  <div className="typing-shadow"></div>
                </div>
              </section>
            ) : (
              <button
                type="submit"
                className="mt-4 w-auto p-2 bg-purple-700 text-white rounded hover:bg-purple-600"
                disabled={loading}
              >
                Send Reset Link
              </button>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
