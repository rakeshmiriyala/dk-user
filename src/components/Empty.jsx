import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Empty() {
  const navigate = useNavigate();

  useEffect(() => {
    const currentUrl = window.location.href;
    console.log(currentUrl);
    const index = currentUrl.indexOf("processing?payment_id=");

    if (index !== -1) {
      const paymentId = currentUrl.slice(
        index + "processing?payment_id=".length
      );
      console.log(paymentId);

      if (paymentId && paymentId.startsWith("pay_")) {
        ok();
      } else {
        console.error("Invalid payment ID");
        console.log(paymentId);
        navigate("/");
      }
    } else {
      console.error("Invalid URL structure");
    }
  }, []);

  const ok = async () => {
    try {
      const email = localStorage.getItem("userToken");
      let raw = JSON.parse(sessionStorage.getItem("raw"));
      raw = {
        ...raw,
        payment_method: "Prepaid",
      };
      const raww = JSON.stringify(raw);
      const orderResponse = await axios.post(
        "https://defiant-cod-buckle.cyclic.app/address",
        { email, raww }
      );
      console.log("Order placed successfully:", orderResponse.data);
      const imageUrl = sessionStorage.getItem("imageUrl");
      const videoUrl = sessionStorage.getItem("videoUrl");
      const colourAndSizeString = sessionStorage.getItem("productThings");
      const colourAndSize = JSON.parse(colourAndSizeString);
      if (imageUrl) {
        const imageResponse = await axios.post(
          "https://defiant-cod-buckle.cyclic.app/api/upload-image",
          { email, imageUrl }
        );
        console.log("Image uploaded successfully:", imageResponse.data);
      }
      if (videoUrl) {
        const videoResponse = await axios.post(
          "https://defiant-cod-buckle.cyclic.app/api/upload-video",
          { email, videoUrl }
        );
        console.log("Video uploaded successfully:", videoResponse.data);
      }

      if (colourAndSize) {
        const colourr = colourAndSize.colour;
        const size = colourAndSize.size;

        const productresponse = await axios.post(
          "https://defiant-cod-buckle.cyclic.app/api/cosi",
          { email: email, colour: colourr, size: size }
        );
        console.log("Product uploaded successfully:", productresponse.data);
      }

      navigate("/order");
    } catch (error) {
      console.error("Error processing order:", error);
      navigate("/");
    }
  };

  return (
    <div className="bg-white h-[400px] w-[400px] flex justify-center items-center">
      Chill bro order is placing
    </div>
  );
}

export default Empty;
