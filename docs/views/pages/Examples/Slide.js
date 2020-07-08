import React, { Component } from "react";
import { Slide } from "../../../../src";
import "../../../app.css";

class SlideExample extends Component {
  constructor() {
    super();
    this.state = {
      slideImages: [
        "assets/images/slide_2.jpg",
        "assets/images/slide_3.jpg",
        "assets/images/slide_4.jpg"
      ]
    };
  }

  render() {
    const properties = {
      duration: 5000,
      transitionDuration: 500,
      infinite: true,
      indicators: true,
      pauseOnHover: true,
      onChange: (oldIndex, newIndex) => {
        console.log(
          `Slide transition finished from ${oldIndex} to ${newIndex}`
        );
      }
    };

    const { slideImages } = this.state;
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
  }
}

export default SlideExample;
