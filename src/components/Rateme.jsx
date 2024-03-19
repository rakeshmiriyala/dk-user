import React, { useState, useEffect } from "react";
import axios from "axios";

const FemaleProfileSvg = (
  <svg
    height="20px"
    width="20px"
    version="1.1"
    id="_x32_"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    fill="#000000"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <g>
        <path
          class="st0"
          d="M308.753,328.173c-0.672-6.458-0.621-12.933-0.176-19.108c19.357,12.001,39.916,8.522,39.916,8.522 s-10.356-21.908-7.879-51.321c4.937-9.611,9.351-20.347,13.338-31.965c9.4-6.165,17.934-17.175,22.475-37.282 c1.773-7.846,0.383-15.297-3.008-21.789C411.447,51.846,331.886,0,283.921,0c-9.084,0-18.582,0.865-27.92,2.509 C246.653,0.865,237.157,0,228.073,0c-47.967,0-127.529,51.848-89.496,175.238c-3.389,6.49-4.776,13.938-3.004,21.781 c5.627,24.922,17.392,35.857,29.336,40.917c16.1,42.502-1.408,79.651-1.408,79.651s20.561,3.48,39.922-8.525 c0.445,6.176,0.496,12.652-0.176,19.112c-6.422,61.85-143.68,56.46-143.68,137.87c0,16.748,56.123,45.957,196.434,45.957 c140.309,0,196.432-29.209,196.432-45.957C452.433,384.633,315.177,390.023,308.753,328.173z"
        ></path>
      </g>
    </g>
  </svg>
);
const MaleProfileSvg = (
  <svg
    height="40px"
    width="40px"
    fill="#000000"
    viewBox="-1 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path d="m14.145 16.629c-.04-.527-.064-1.142-.064-1.762 0-.255.004-.51.012-.763l-.001.037c.731-.76 1.219-1.758 1.333-2.868l.002-.021c.339-.028.874-.358 1.03-1.666.016-.074.025-.16.025-.248 0-.396-.188-.747-.48-.97l-.003-.002c.552-1.66 1.698-6.796-2.121-7.326-.393-.69-1.399-1.04-2.707-1.04-5.233.096-5.864 3.951-4.72 8.366-.294.226-.482.577-.482.972 0 .088.009.174.027.257l-.001-.008c.16 1.306.691 1.638 1.03 1.666.127 1.134.628 2.133 1.374 2.888.007.214.011.466.011.718 0 .623-.023 1.24-.069 1.851l.005-.081c-1.038 2.784-8.026 2.002-8.346 7.371h22.458c-.322-5.369-7.278-4.587-8.314-7.371z"></path>
    </g>
  </svg>
);
const Rateme = () => {
  const [recentRatings, setRecentRatings] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://enthusiastic-puce-tights.cyclic.app/admin/latest-updated-reviews"
        );
        const allRatings = response.data;
        const sortedRatings = allRatings.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        const latestTimestamp =
          sortedRatings.length > 0 ? sortedRatings[0].createdAt : null;
        const latestRatings = sortedRatings.filter(
          (rating) => rating.createdAt === latestTimestamp
        );
        setRecentRatings(latestRatings);
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    };
    fetchData();
  }, []);

  const sortedRatings = recentRatings.sort((a, b) => b.rate - a.rate);

  const getGenderFromName = (name) => {
    return name.toLowerCase().endsWith("a") ? "female" : "male";
  };
  const getProfileSvg = (gender) => {
    return gender === "female" ? FemaleProfileSvg : MaleProfileSvg;
  };

  return (
    <div className="bg-black">
      <div
        className="container mx-auto p-4 bg-black rounded-lg shadow-md overflow-hidden"
        style={{ paddingBottom: "32px" }}
      >
        <h2 className="text-3xl text-center font-sans text-white font-bold mb-4">
          {" "}
          Reviews
        </h2>
        <div
          className="review-container scrollbar-hide"
          style={{
            maxHeight: "450px",
            overflowY: "scroll",
            scrollbarWidth: "thin",
          }}
        >
          {recentRatings.map((rating, index) => (
            <div key={index} className="bg-white p-6 rounded-lg mb-4 shadow-md">
              <div className="flex items-center">
                {getProfileSvg(getGenderFromName(rating.name))}
                <div className="ml-4">
                  <h3 className="text-2xl font-serif text-black font-semibold">
                    {rating.name}
                  </h3>
                  <div className="flex items-center">
                    <div className="text-yellow-500 text-xl">
                      {Array(
                        Math.max(0, Math.min(5, Math.round(rating.rate)))
                      ).fill("⭐")}
                    </div>
                    <span className="ml-2 text-xl text-black font-medium">
                      {rating.rate}
                    </span>
                  </div>
                  <p className="text-lg font-sans text-black mt-2">
                    {rating.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Rateme;
