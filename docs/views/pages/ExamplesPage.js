import React, { Component } from 'react';
import { Slide, Fade, Zoom } from '../../../src';

class Examples extends Component {
  constructor() {
    super();
    this.state = {
      zoomOutImages: [
        'assets/images/slide_2.jpg',
        'assets/images/slide_7.jpg',
        'assets/images/slide_5.jpg'
      ],
      slideImages: [
        'assets/images/slide_2.jpg',
        'assets/images/slide_3.jpg',
        'assets/images/slide_4.jpg'
      ],
      fadeImages: [
        'assets/images/slide_5.jpg',
        'assets/images/slide_6.jpg',
        'assets/images/slide_7.jpg'
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
      dir: 'ltr',
      onChange: (oldIndex, newIndex) => {
        console.log(
          `Slide transition finished from ${oldIndex} to ${newIndex}`
        );
      }
    };

    const fadeProperties = {
      duration: 5000,
      transitionDuration: 500,
      indicators: true,
      infinite: false,
      pauseOnHover: true,
      onChange: (oldIndex, newIndex) => {
        console.log(`Fade transition finished from ${oldIndex} to ${newIndex}`);
      }
    };

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
    const { slideImages, zoomOutImages, fadeImages } = this.state;
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
        <br />

        <h3>Fade Effect</h3>
        <div className="slide-container">
          <Fade {...fadeProperties}>
            <div className="each-fade">
              <div className="image-container">
                <img src={fadeImages[0]} />
              </div>
              <h2>First Slide</h2>
            </div>
            <div className="each-fade">
              <h2>Second Slide</h2>
              <div className="image-container">
                <img src={fadeImages[1]} />
              </div>
            </div>
            <div className="each-fade">
              <div className="image-container">
                <img src={fadeImages[2]} />
              </div>
              <h2>Third Slide</h2>
            </div>
          </Fade>
        </div>

        <br />
        <h3>Zoom out Effect</h3>
        <div className="slide-container">
          <Zoom {...zoomOutProperties}>
            {zoomOutImages.map((each, index) => (
              <img key={index} style={{ width: '100%' }} src={each} />
            ))}
          </Zoom>
        </div>
        <br />
        <h3>Zoom in Effect</h3>
        <div className="slide-container">
          <Zoom {...zoomInProperties}>
            {fadeImages.map((each, index) => (
              <img key={index} style={{ width: '100%' }} src={each} />
            ))}
          </Zoom>
        </div>
        <br />
      </div>
    );
  }
}

export default Examples;
