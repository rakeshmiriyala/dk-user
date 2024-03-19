import React from 'react';
import Carousel from "./Carousel";
import VideoOverlayPage from "./vid";
import FakeText from "./FakeText";
import FakeText1 from "./FakeText1";
import Footer from "./Footer";
import Rateme from "./Rateme";
// import AdsComponent from './AdsComponent';

export default function Home() {
  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "relative", zIndex: 1 }}>
        <VideoOverlayPage />
        <br />
        <Carousel />
        <br />
        <FakeText />
        <br />
        <FakeText1 />
        <br />
        <Rateme />
        {/* <AdsComponent dataAdSlot='9007562256' /> */}
        <Footer />
      </div>
    </div>
  );
}
