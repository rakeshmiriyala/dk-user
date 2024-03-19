import React, { useState, useEffect } from "react";
import axios from "axios";
import backgroundImage from "../assets/fuck_suresh.jpg";

const RatingForm = () => {
  const [selectedRating, setSelectedRating] = useState(1);
  const [experienceDescription, setExperienceDescription] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleRatingChange = (value) => {
    setSelectedRating(value);
  };

  const handleDescriptionChange = (e) => {
    setExperienceDescription(e.target.value);
  };

  useEffect(() => {
    const email = localStorage.getItem("userToken");

    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://defiant-cod-buckle.cyclic.app/api/user-detail?email=${email}`
        );
        const fetchedUserData = response.data;

        if (fetchedUserData) {
          setUserData(fetchedUserData);
        } else {
          setError("Email not found in the data");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("An error occurred while fetching user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const submitRating = () => {
    console.log(userData.name);
    axios
      .post("https://defiant-cod-buckle.cyclic.app/api/rate", {
        rate: selectedRating,
        description: experienceDescription,
        name: userData.name,
      })
      .then((response) => {
        alert("Rating submitted successfully!");
        window.location.reload();
      })
      .catch((error) => {
        alert("Error submitting rating. Please try again.");
      });
  };

  return (
    <div
      className="flex justify-center font-sans items-center h-screen"
      style={{ height: "400px" }}
    >
      <div
        className="bg-black sm:w-2/3 p-6 rounded-md md:w-1/2 lg:w-1/3 xl:w-1/4 h-auto flex flex-col justify-center items-center"
        style={{
          width: "378px",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-2xl text-white ">Rating</h1>

        {loading && <p className="text-white">Loading user data...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {submissionStatus && (
          <p className="text-green-500">{submissionStatus}</p>
        )}

        {!loading && !error && !submissionStatus && (
          <>
            <div className="rating rating-base rating-half flex justify-center">
              {[1, 2, 3, 4, 5].map((value, index) => (
                <input
                  key={index}
                  type="radio"
                  name="rating-10"
                  className={`bg-yellow-400 items-center mask mask-star-2 mask-half-${value}`}
                  checked={selectedRating === value}
                  onChange={() => handleRatingChange(value)}
                  style={{ width: "40px" }}
                />
              ))}
            </div>
            <br />
            <textarea
              className="w-64 h-36 p-2 border rounded-md placeholder-black"
              placeholder="Describe your experience..."
              onChange={handleDescriptionChange}
            />
            <button
              className="w-32 py-1.5 mt-4 text-white text-xl transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              onClick={submitRating}
            >
              Submit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RatingForm;
