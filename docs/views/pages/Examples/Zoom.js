import React, { Component } from "react";
import { Zoom } from "../../../../src";
import "../../../app.css";

class ZoomExample extends Component {
  constructor() {
    super();
    this.state = {
      zoomOutImages: [
        "assets/images/slide_2.jpg",
        "assets/images/slide_7.jpg",
        "assets/images/slide_5.jpg"
      ],
      fadeImages: [
        "assets/images/slide_5.jpg",
        "assets/images/slide_6.jpg",
        "assets/images/slide_7.jpg"
      ]
    };
  }

  render() {
    const zoomOutProperties = {
      duration: 5000,
      transitionDuration: 500,
      indicators: true,
      scale: 0.4,
      pauseOnHover: true,
      onChange: (oldIndex, newIndex) => {
        console.log(`zoom transition finished from ${oldIndex} to ${newIndex}`);
      }
    };

    const zoomInProperties = {
      duration: 5000,
      transitionDuration: 500,
      indicators: true,
      scale: 1.4,
      pauseOnHover: true
    };
    const { zoomOutImages, fadeImages } = this.state;
    return (
      <div>
        <h3>Zoom out Effect</h3>
        <div className="slide-container">
          <Zoom {...zoomOutProperties}>
            {zoomOutImages.map((each, index) => (
              <img key={index} style={{ width: "100%" }} src={each} />
            ))}
          </Zoom>
        </div>
        <br />
        <h3>Zoom in Effect</h3>
        <div className="slide-container">
          <Zoom {...zoomInProperties}>
            {fadeImages.map((each, index) => (
              <img key={index} style={{ width: "100%" }} src={each} />
            ))}
          </Zoom>
        </div>
        <br />
      </div>
    );
  }
}

export default ZoomExample;
