import React, { useState, useEffect, useRef } from "react";
import NavBar from "./nav";
import "./vid.css";
import axios from "axios";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [LandingData, setLandingData] = useState({
    videoUrl: "",
    heading: "",
    text: "",
    button: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://enthusiastic-puce-tights.cyclic.app/admin/landing-details"
        );
        if (response.status === 200) {
          setLandingData(response.data[0]);
        } else {
          setError("Request failed with status: " + response.status);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("An error occurred while fetching data.");
        setLoading(false);
      }
    }

    fetchData();
  }, []);
  const handleToggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };
  return (
    <div className="relative h-screen">
      <video
        src={LandingData.videoUrl}
        ref={videoRef}
        muted={isMuted}
        autoPlay
        controls={false}
        loop
        className="w-full h-screen object-cover"
        style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
      />
      <NavBar
        style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 20 }}
        navOpen={navOpen}
        setNavOpen={setNavOpen}
      />
      <button
        onClick={handleToggleMute}
        className="absolute bottom-4 font-serif left-4 bg-transparent cursor-pointer text-sm bg-black text-white px-2 py-0.5 rounded-md"
      >
        {isMuted ? "Unmute" : "Mute"}
      </button>
      {loading ? (
        <div className="text-white">Loading...</div>
      ) : error ? (
        <div className="text-white">Error: {error}</div>
      ) : (
        <div
          className={`relative top-1/2 sm:left-1/4 md:left-1/4 lg:left-1/3 transform -translate-y-1/2 text-center font-Merianda mt-12 ${
            navOpen ? "hide-text" : ""
          }`}
          style={{ width: "300px", margin: "0 auto" }}
        >
          <h1 className="text-5xl text-white lg:text-6xl text-right font-medium sm:w-[320px] ">
            {LandingData.heading}
          </h1>
          <br />
          <p className="text-2xl text-white lg:text-2xl text-right font-semibold ">
            {LandingData.text}
          </p>
          <br />
          <div className="mt-4 text-end">
            <Link
              to="/product"
              className="w-38 py-3 px-4 text-white transition-colors duration-200 font-sans font-medium text-xl transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              {LandingData.button}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
