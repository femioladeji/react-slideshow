import React from "react";
import { Slide } from "../../../../src";
import "../../../app.css";

const SlideExample = () => {
  const slideImages = [
    "assets/images/slide_2.jpg",
    "assets/images/slide_3.jpg",
    "assets/images/slide_4.jpg"
  ];

  const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    pauseOnHover: true,
    onChange: (oldIndex, newIndex) => {
      console.log(`Slide transition finished from ${oldIndex} to ${newIndex}`);
    }
  };

  return (
    <div>
      <h3>Slide Effect</h3>
      <div className="slide-container">
        <Slide {...properties}>
          {slideImages.map((each, index) => (
            <div key={index} className="each-slide">
              <div style={{ backgroundImage: `url(${each})` }}>
                <span>Slide {index + 1}</span>
              </div>
            </div>
          ))}
        </Slide>
      </div>
    </div>
  );
};

export default SlideExample;
