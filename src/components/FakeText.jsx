import React, { useEffect, useState } from "react";
import AOS from "aos"; // Import AOS;
import "aos/dist/aos.css"; // Import AOS CSS;
import axios from "axios";

const FakeText = () => {
  const [videoURL, setVideoURL] = useState("");
  const [textContent, setTextContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://enthusiastic-puce-tights.cyclic.app/admin/vidtext-details"
        );
        if (response.status === 200) {
          setTextContent(response.data[0].text);
          setVideoURL(response.data[0].videoUrl);
          setIsLoading(false);
        } else {
          console.log("Request failed with status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }

    fetchData();
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
    });
  }, []);
  return (
    <div className="container mx-auto p-4" style={{ paddingTop: "0px" }}>
      <div className="flex flex-col md:flex-row h-full sm:flex-row">
        <div
          className="md:flex-1"
          data-aos="fade-up"
          data-aos-easing="ease-out-sine"
          data-aos-duration="2000"
        >
          <div className="h-full flex items-center justify-center">
            {isLoading ? (
              <div>Loading video...</div>
            ) : (
              <video
                src={videoURL}
                className="w-full max-h-screen"
                autoPlay
                loop
                muted
                controls={false}
              ></video>
            )}
          </div>
        </div>
        <div
          className="md-flex-1 p-4"
          data-aos="fade-up"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          <div className=" rounded-md">
            {isLoading ? (
              <div>Loading text content...</div>
            ) : (
              <h2 className="text-xl font-semibold w-full sm:w-[500px]">
                {textContent}
              </h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FakeText;
