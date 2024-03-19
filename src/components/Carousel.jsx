import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

export default function Carouselll() {
  const [landingData, setLandingData] = useState({
    urls: [],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://enthusiastic-puce-tights.cyclic.app/admin/carousel-details"
        );
        if (response.status === 200) {
          setLandingData(response.data[0]);
        } else {
          console.error("Request failed with status: " + response.status);
        }
      } catch (error) {
        console.error("Error fetching carousel details:", error);
      }
    }

    fetchData();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {landingData.urls &&
          landingData.urls.map((url, index) => (
            <div key={index}>
              <img
                src={url}
                alt={`Image ${index + 1}`}
                className="mx-auto max-w-500 max-h-300"
              />
            </div>
          ))}
      </Slider>
    </div>
  );
}
