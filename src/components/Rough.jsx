import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentPage = () => {
  const [basePrice, setBasePrice] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
 

  useEffect(() => {
    const fetchBasePrice = async () => {
      try {
        const response = await axios.get('https://admin.arw2.repl.co/admin/product-details');
        const data = response.data;
        
        setBasePrice(data[0].price);
        console.log(data[0].price);
  
        const response2 = await axios.get('https://admin.arw2.repl.co/admin/cod-details');
        const data2 = response2.data;
        setDeliveryCharges(data2[0].price)
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchBasePrice();
  }, []);


  useEffect(() => {
    setTotalPrice(basePrice + deliveryCharges);
  }, [basePrice, deliveryCharges]);

  const handlePlaceOrder = () => {
    // You can perform additional actions before redirecting
    window.location.href = '/order-confirmation'; // Redirect using window.location.href
  };

  return (
    <div className="h-screen">
      <div className="ck w-full h-full flex flex-col bg-black">
        <div className="flex justify-center items-center m-[30px]">
          <ul className="steps text-white">
            <li className="step step-primary">Product</li>
            <li className="step step-primary">Upload file</li>
            <li className="step step-primary">Address</li>
            <li className="step step-primary">Payment</li>
          </ul>
        </div>
        <div className="container mx-auto p-4 text-black bg-white border font-sans border-gray-300 rounded-md" style={{ width: "300px" }}>
          <h1 className="text-3xl text-center font-bold mb-4">Payment</h1>
          <div className="mt-4">
            <p className="font-semibold text-red-500">Note: No cancellation of the order.</p>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">COD</h2>
            <div className="flex justify-between items-center">
              <p> Price:</p>
              <p>{basePrice}</p>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p>Delivery Charges:</p>
              <p> {deliveryCharges}</p>
            </div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="font-semibold">Total:</p>
            <p className="font-semibold">{totalPrice}</p>
          </div>
          <div className="mt-4 text-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handlePlaceOrder}
            >
              Place Your Order
            </button>
          </div>
          <div className="mt-4">
        <p className="text-center text-black">or</p>
      </div>
      <div className="mt-4 text-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-center justify-center text-white font-bold py-2 px-4 rounded">
          Choose Online payment
        </button>
      </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;




import React, { useState, useEffect, useRef } from 'react';
import NavBar from './nav';
import './vid.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [LandingData, setLandingData] = useState({
    videoUrl: '',
    heading: '',
    text: '',
    button: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://admin.arw2.repl.co/admin/landing-details');
        if (response.status === 200) {
          setLandingData(response.data[0]);
        } else {
          setError('Request failed with status: ' + response.status);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('An error occurred while fetching data.');
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
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
      />
      <NavBar
        style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20 }}
        navOpen={navOpen}
        setNavOpen={setNavOpen}
      />
      <button
      onClick={handleToggleMute}
      className="absolute bottom-4 font-serif left-4 bg-transperent cursor-pointer text-sm bg-black text-white px-2 py-0.5 rounded-md"
    >
      {isMuted ? 'Unmute' : 'Mute'}
    </button>
      {loading ? (
        <div className="text-white">Loading...</div>
      ) : error ? (
        <div className="text-white">Error: {error}</div>
      ) : (
        <div className={`relative top-1/2  sm:left-1/4  md:left-1/4 lg:left-1/3 transform -translate-y-1/2 text-center font-Merianda mt-12 ${navOpen ? 'hide-text' : ''}`} style={{ width: "300px", margin: "0 auto" }}>
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
              to='/product'
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


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  useEffect(() => {
  
    function prevent() {
      window.history.forward();
    }

    setTimeout(prevent, 0);
    window.onload = function() {
    };
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/payment-button.js";
    script.async = true;
    script.dataset.payment_button_id = "pl_NJ0b4XDIM23Exr";

    const form = document.getElementById("razorpay-form");
    form.appendChild(script);

    return () => {
      form.removeChild(script);
    };
  }, []);
  
  // useEffect(() => {
   
  // }, []);

  const navigate=useNavigate();
  const [basePrice, setBasePrice] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchBasePrice = async () => {
      try {
        const response = await axios.get(
          "https://62f19b3b-513b-49b0-bae8-89a1f70135df-00-241rgyx89j4re.pike.replit.dev/admin/product-details"
        );
        const data = response.data;
        setBasePrice(data[0].price);

        const response2 = await axios.get(
          "https://62f19b3b-513b-49b0-bae8-89a1f70135df-00-241rgyx89j4re.pike.replit.dev/admin/cod-details"
        );
        const data2 = response2.data;
        setDeliveryCharges(data2[0].price);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBasePrice();
  }, []);

  useEffect(() => {
    setTotalPrice(basePrice + deliveryCharges);
  }, [basePrice, deliveryCharges]);

  const ok = async () => {
    try {
      const email = localStorage.getItem("userToken");
      let raw = JSON.parse(sessionStorage.getItem("raw"));
      raw = {
        ...raw,
        sub_total: basePrice + deliveryCharges,
        payment_method: "COD",
      };
      const raww = JSON.stringify(raw);
      const orderResponse = await axios.post(
        "https://1ed90b89-6fa7-4143-88b7-0a318fef8649-00-35krq2zwg2q0g.pike.replit.dev/address",
        { email, raww }
      );
      console.log("Order placed successfully:", orderResponse.data);
      const imageUrl = sessionStorage.getItem("imageUrl");
      const videoUrl = sessionStorage.getItem("videoUrl");
      const colourAndSizeString = sessionStorage.getItem("productThings");
      const colourAndSize = JSON.parse(colourAndSizeString);
      if (imageUrl) {
        const imageResponse = await axios.post(
          "https://1ed90b89-6fa7-4143-88b7-0a318fef8649-00-35krq2zwg2q0g.pike.replit.dev/api/upload-image",
          { email, imageUrl }
        );
        console.log("Image uploaded successfully:", imageResponse.data);
      }
      if (videoUrl) {
        const videoResponse = await axios.post(
          "https://1ed90b89-6fa7-4143-88b7-0a318fef8649-00-35krq2zwg2q0g.pike.replit.dev/api/upload-video",
          { email, videoUrl }
        );
        console.log("Video uploaded successfully:", videoResponse.data);
      }

      if (colourAndSize) {
        const colourr = colourAndSize.colour;
        const size = colourAndSize.size;

        const productresponse = await axios.post(
          "https://1ed90b89-6fa7-4143-88b7-0a318fef8649-00-35krq2zwg2q0g.pike.replit.dev/api/cosi",
          { email: email, colour: colourr, size: size }
        );
        console.log("Product uploaded successfully:", productresponse.data);
      }
      alert('ordermplaced successfully')
      navigate('/order');
    } catch (error) {
      console.error("Error processing order:", error);
    }
  };

  return (
    <div className="h-screen">
      <div className="flex justify-center items-center m-[30px]">
        <ul className="steps font-sans text-white mt-4">
          <li className="step step-primary">Product</li>
          <li className="step step-primary">File Upload</li>
          <li className="step step-primary">Checkout</li>
          <li className="step step-primary">Payment</li>
          <li className="step">Thanking You</li>
        </ul>
      </div>
    <div
      className="container mx-auto p-4 border font-sans border-gray-300 rounded-md"
      style={{ width: "300px", marginTop: "150px" }}
    >
      <h1 className="text-3xl font-bold mb-4">Payment</h1>
      <div className="mt-4">
        <p className="font-semibold text-red-500">
          Note: No cancellation of the order.
        </p>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">COD</h2>
        <div className="flex justify-between items-center">
          <p>Base Price:</p>
          <p>{basePrice}</p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <p>Delivery Charges:</p>
          <p>+ {deliveryCharges}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <p className="font-semibold">Total:</p>
        <p className="font-semibold">{totalPrice}</p>
      </div>
      <div className="mt-4 text-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={ok}
        >
          Place order
        </button>
      </div>
      <div className="mt-2">
        <p className="text-center text-gray-500">or</p>
      </div>
      <h2 className="text-xl font-semibold mb-2">Online Payment</h2>
      <div className="mt-2 text-center">
        <div className="flex justify-between items-center gap-3 mb-3">
          <p>Product Price:</p>
          <p>{basePrice}</p>
        </div>
      <form id="razorpay-form">
        
      </form>

      </div>
    </div>
    </div>
  );
};

export default PaymentPage;