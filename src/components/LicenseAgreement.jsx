import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LicenseAgreement = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken"));
  const [licenseDetails, setLicenseDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setUserToken(localStorage.getItem("userToken"));
    axios
      .get("https://enthusiastic-puce-tights.cyclic.app/admin/license-details")
      .then((response) => {
        setLicenseDetails(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleContinue = () => {
    const email = userToken;
    const LicenseAndAgreement = isChecked;

    axios
      .post("https://defiant-cod-buckle.cyclic.app/update-license-agreement", {
        email,
        LicenseAndAgreement,
      })
      .then((response) => {
        console.log("agreed");
        sessionStorage.setItem("license", "agreed");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full sm:w-1/2 md:w-1/2 bg-black p-6 rounded-md">
        <h1 className="text-2xl font-semibold mb-4 text-white">
          License Agreement
        </h1>
        <p className="text-white mb-4">{licenseDetails.licenseText}</p>

        <>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="form-checkbox text-indigo-600"
            />
            <span className="text-white">
              I accept the terms and conditions.
            </span>
          </label>
          <div className="mt-4 flex justify-center">
            <button
              disabled={!isChecked}
              onClick={handleContinue}
              className={`${
                isChecked
                  ? "bg-purple-700 hover:bg-purple-600"
                  : "bg-gray-400 cursor-not-allowed"
              } text-white font-semibold py-2 px-4 rounded-xl`}
            >
              Continue
            </button>
          </div>
        </>
      </div>
    </div>
  );
};

export default LicenseAgreement;
