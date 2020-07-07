import React, { Component } from 'react';
import { Fade } from '../../../lib';
import '../../../app.css';

class FadeExample extends Component {
  constructor() {
    super();
    this.state = {
      fadeImages: [
        'assets/images/slide_5.jpg',
        'assets/images/slide_6.jpg',
        'assets/images/slide_7.jpg'
      ]
    };
  }

  render() {
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
    const { fadeImages } = this.state;
    return (
      <div>
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
      </div>
    );
  }
}

export default FadeExample;
