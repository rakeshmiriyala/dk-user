/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import "./Product.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Product() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    images: [],
    productDescription: "",
    productName: "",
    price: 0,
    colors: "",
    sizes: "",
  });

  const usertoken = localStorage.getItem("userToken");
  const [showLoginScreen, setShowLoginScreen] = useState(!usertoken);

  useEffect(() => {
    if (!usertoken) {
      setShowLoginScreen(true);
    }
  }, [usertoken]);

  const imagess = userData.images;
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://enthusiastic-puce-tights.cyclic.app/admin/product-details"
        );
        if (response.status === 200) {
          setUserData(response.data[0]);
          setSelectedImage(response.data[0].images[0]);
        } else {
          console.log("Request failed with status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
    fetchData();
  }, []);

  const [selectedImage, setSelectedImage] = useState(userData.images[0]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const handleProceed = () => {
    if (selectedColor && selectedSize) {
      const selectedDetails = {
        order_items: [
          {
            name: userData.productName,
            sku: "Augmentedreality",
            units: 1,
            selling_price: userData.price,
            hsn: 441122,
          },
        ],
        pickup_location: "Primary",
        channel_id: 4440220,
        length: 10,
        breadth: 15,
        height: 20,
        weight: 2.5,
        sub_total: userData.price,
        billing_customer_name: "Deepak",
        billing_last_name: "Balaboina",
        billing_address: "Bahadurpally",
        billing_city: "hyderabad",
        billing_pincode: "400043",
        billing_state: "telangana",
        billing_country: "India",
        billing_phone: "7036205915",
        billing_email: "balabonadeepak@gmail.com",
      };
      const selectedDetailsString = JSON.stringify(selectedDetails);
      sessionStorage.setItem("SelectedThings", selectedDetailsString);
      sessionStorage.setItem(
        "productThings",
        JSON.stringify({ colour: selectedColor, size: selectedSize })
      );
      navigate("/fileupload");
    } else {
      alert("Please select both color and size before proceeding.");
    }
  };

  return (
    <div className="relative">
      {showLoginScreen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            zIndex: 9999,
            display: "block",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              zIndex: 10000,
            }}
          >
            <h1 style={{ color: "#000" }}>Please login</h1>
            <br />
            <br />
            <Link
              to="/login"
              style={{
                backgroundColor: "#000",
                color: "#fff",
                padding: "10px 20px",
                border: "none",
                cursor: "pointer",
                zIndex: 10001,
              }}
            >
              Login
            </Link>
          </div>
        </div>
      )}

      <div className="min-h-screen flex flex-col items-center bg-black justify-center bg-cover bg-center kkl overflow-x-hidden">
        <ul className="steps font-sans text-white mt-4">
          <li className="step step-primary">Product</li>
          <li className="step">File Upload</li>
          <li className="step">Checkout</li>
          <li className="step">Payment</li>
          <li className="step">Thanking You</li>
        </ul>

        <br />
        <div className="bg-white rounded-lg p-4 w-4/5 h-auto flex flex-col md:flex-row">
          <div
            className="md:w-1/3 p-4 custom-scrollbar"
            style={{ width: "240px" }}
          >
            <div className="custom-scroll-content">
              {userData.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Image ${index}`}
                  className={`w-20 h-14 object-contain pt-2 pb-2 object-top-right m-2 cursor-pointer transform ${
                    selectedImage === image ? "scale-125" : "scale-100"
                  } transition-transform`}
                  onClick={() => handleImageClick(image)}
                />
              ))}
            </div>
          </div>
          <div className="w-full md:w-2/3 p-4">
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Selected Image"
                className="mx-auto md:w-full md:h-[345px] object-cover py-2"
              />
            )}
            <h2 className="text-2xl font-bold mt-4 p-2 text-slate-950">
              {userData.productName}
            </h2>
            <p className="text-slate-800 font-semibold mb-4 p-2">
              {userData.productDescription}
            </p>
          </div>
          <div className="w-full md:w-1/4 p-4 flex flex-col items-center justify-center">
            <div className="text-black">
              <p className="text-black mb-4 p-2 font-bold">
                Price: ₹{userData.price}
              </p>
            </div>
            <div className="relative">
              <label className="block text-m font-bold text-gray-700">
                Color
              </label>
              <div className="relative">
                <select
                  value={selectedColor}
                  onChange={handleColorChange}
                  className="block w-full appearance-none font-bold bg-white border border-gray-400 text-black py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring focus:border-indigo-500"
                  style={{ width: "136px" }}
                >
                  <option value="" className="font-bold">
                    Select Color
                  </option>
                  {userData.colors
                    ? userData.colors.split(",").map((color) => (
                        <option key={color} value={color} className="font-bold">
                          {color}
                        </option>
                      ))
                    : null}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12l-4-4h8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="relative mt-4">
              <label className="block text-m font-bold text-gray-700 ">
                Size
              </label>
              <div className="relative">
                <select
                  value={selectedSize}
                  onChange={handleSizeChange}
                  className="block w-full appearance-none font-bold bg-white border border-gray-400 text-gray-700 py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring focus:border-indigo-500"
                  style={{ width: "136px" }}
                >
                  <option value="" className="font-bold">
                    Select Size
                  </option>
                  {userData.sizes
                    ? userData.sizes.split(",").map((size) => (
                        <option key={size} value={size} className="font-bold">
                          {size}
                        </option>
                      ))
                    : null}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12l-4-4h8z" />
                  </svg>
                </div>
              </div>
            </div>
            <button
              onClick={handleProceed}
              className="button bg-purple-700 w-36 h-10 hover:bg-purple-600 text-white rounded-lg text-lg font-bold mt-4"
            >
              <span>Proceed</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
