import React, { useEffect, useState } from "react";
import axios from "axios";

export default function License() {
  const [licenseDetails, setLicenseDetails] = useState([]);

  useEffect(() => {
    axios
      .get("https://enthusiastic-puce-tights.cyclic.app/admin/license-details")
      .then((response) => {
        setLicenseDetails(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full sm:w-1/2 md:w-1/2 bg-black p-6 rounded-md">
        <h1 className="text-2xl font-semibold mb-4 text-white">
          License & Agreement
        </h1>
        <br />
        {licenseDetails.map((license) => (
          <p key={license._id} className="text-white mb-4">
            {license.licenseText}
          </p>
        ))}
      </div>
    </div>
  );
}
