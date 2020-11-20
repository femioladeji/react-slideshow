export const tsConfigCodeString = `
  "typeRoots": [
    "./types",
    "./node_modules/@types"
  ]
`;

export const forTS = `
  declare module 'react-slideshow-image' {
    export class Zoom extends React.Component<ZoomProps & any, any> {
        goBack(): void;
        goNext(): void;
        goTo(index: number): void;
    }
    export class Fade extends React.Component<SlideshowProps & any, any> {
        goBack(): void;
        goNext(): void;
        goTo(index: number): void;
    }
    export class Slide extends React.Component<SlideshowProps & any, any> {
        goBack(): void;
        goNext(): void;
        goTo(index: number): void;
    }
    export interface SlideshowProps {
        duration?: number,
        transitionDuration?: number,
        defaultIndex?: number,
        indicators?: boolean | function,
        prevArrow?: object | function,
        nextArrow?: object | function,
        arrows?: boolean,
        autoplay?: boolean,
        infinite?: boolean,
        onChange?(oldIndex: number, newIndex: number): void,
        pauseOnHover?: boolean
    }
    export interface ZoomProps extends SlideshowProps {
        scale: number
    }
  }
`;

export const slideEffectCodeString = `
import React from 'react';
import { Slide } from 'react-slideshow-image';

const slideImages = [
  'images/slide_2.jpg',
  'images/slide_3.jpg',
  'images/slide_4.jpg'
];

const Slideshow = () => {
    return (
      <div>
        <Slide easing="ease">
          <div className="each-slide">
            <div style={{'backgroundImage': \`url(\${slideImages[0]})\`\}}>
              <span>Slide 1</span>
            </div>
          </div>
          <div className="each-slide">
            <div style={{'backgroundImage': \`url(\${slideImages[1]})\`\}}>
              <span>Slide 2</span>
            </div>
          </div>
          <div className="each-slide">
            <div style={{'backgroundImage': \`url(\${slideImages[2]})\`\}}>
              <span>Slide 3</span>
            </div>
          </div>
        </Slide>
      </div>
    )
};

export default Slideshow;
`;

export const SlideEffectCSSString = `
.each-slide > div {
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  height: 350px;
}

.each-slide span {
  padding: 20px;
  font-size: 20px;
  background: #efefef;
  text-align: center;
}
`;

export const fadeEffectCodeString = `
import React from 'react';
import { Fade } from 'react-slideshow-image';

const FadeExample = () => {
  const fadeImages = [
    "assets/images/slide_5.jpg",
    "assets/images/slide_6.jpg",
    "assets/images/slide_7.jpg"
  ];

  return (
    <div>
      <h2>Fade Effect</h2>
      <div className="slide-container">
        <Fade>
          <div className="each-fade">
            <div>
              <img src={fadeImages[0]} />
            </div>
            <p>First Slide</p>
          </div>
          <div className="each-fade">
            <p>Second Slide</p>
            <div>
              <img src={fadeImages[1]} />
            </div>
          </div>
          <div className="each-fade">
            <div>
              <img src={fadeImages[2]} />
            </div>
            <p>Third Slide</p>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default FadeExample;
`;

export const fadeEffectCSS = `
.each-fade {
  display: flex;
  width: 100%;
}

.each-fade > div {
  width: 75%;
}

.each-fade > div img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.each-fade p {
  width: 25%;
  font-size: 1em;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin: 0;
  background: #adceed;
}
`;

export const zoomInEffectCodeString = `
import React from 'react';
import { Zoom } from 'react-slideshow-image';

const Slideshow = () => {
  const images = [
    'images/slide_2.jpg',
    'images/slide_3.jpg',
    'images/slide_4.jpg'
  ];

  const zoomInProperties = {
    indicators: true,
    scale: 1.4
  }
  return (
    <div>
      <Zoom {...zoomInProperties}>
        {images.map((each, index) => (
          <div key={index} style={{width: "100%"}}>
            <img style={{ objectFit: "cover", width: "100%" }} src={each} />
          </div>
        ))}
      </Zoom>
    </div>
  )
}

export default Slideshow;
`;

export const zoomOutEffectCodeString = `
import React from 'react';
import { Zoom } from 'react-slideshow-image';

const Slideshow = () => {
  const images = [
    'images/slide_2.jpg',
    'images/slide_3.jpg',
    'images/slide_4.jpg'
  ];

  const zoomOutProperties = {
    indicators: true,
    scale: 0.4
  }
  return (
    <div>
      <Zoom {...zoomOutProperties}>
        {images.map((each, index) => (
          <div key={index} style={{width: "100%"}}>
            <img style={{ objectFit: "cover", width: "100%" }} src={each} />
          </div>
        ))}
      </Zoom>
    </div>
  )
}

export default Slideshow;
`;

export const customizingIndicatorCodeString = `
  {
    indicators: i => (
      <div
        style={{
          width: '30px',
          color: 'blue',
          textAlign: 'center',
          cursor: 'pointer',
          border: '1px blue solid'
        }}
      >
        {i + 1}
      </div>
    )
  ),
`;

export const cssCodeString = `
  .slide-container {
    width: 70%;
    margin: auto; }

  h3 {
    text-align: center; }

  .each-slide > div {
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
    height: 300px;
  }

  .each-slide span {
    padding: 20px;
    font-size: 20px;
    background: #efefef;
    text-align: center;
  }

  .each-fade {
    display: flex;
  }

  .each-fade .image-container {
    width: 75%;
    overflow: hidden;
  }

  .each-fade .image-container img {
    width: 100%;
  }

  .each-fade h2 {
    width: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    background: #adceed;
  }
`;

export const nextCodeString = `
  import dynamic from 'next/dynamic';
  const Fade = dynamic(() =>
    import('react-slideshow-image').then((slideshow) => slideshow.Fade),
    { ssr: false }
  )
`;

export const customArrow = `
import React from "react";
import { Slide } from 'react-slideshow-image';

const CustomArrowExample = () => {
  const slideImages = [
    "assets/images/slide_2.jpg",
    "assets/images/slide_3.jpg",
    "assets/images/slide_4.jpg"
  ];

  const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    prevArrow: <div style={{width: "30px", marginRight: "-30px"}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff"><path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z"/></svg></div>,
    nextArrow: <div style={{width: "30px", marginLeft: "-30px"}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff"><path d="M512 256L270 42.6v138.2H0v150.6h270v138z"/></svg></div>
  };

  return (
    <div>
      <h2>Customizing Arrows</h2>
      <p>You can customize the previous and next arrow by setting the property as shown below</p>
      <SyntaxHighlighter language="react" style={dark}>
        {customArrow}
      </SyntaxHighlighter>
      <br />
      <div>
        <Slide {...properties}>
          {slideImages.map((each, index) => (
            <div key={index} className="each-slide">
              <div style={{ backgroundImage: \`url(\${each})\` }}>
                <span>Slide {index + 1}</span>
              </div>
            </div>
          ))}
        </Slide>
      </div>
    </div>
  );
};

export default CustomArrowExample;
`;

export const customIndicators = `
import React from 'react';
import { Zoom } from 'react-slideshow-image';

const Slideshow = () => {
  const images = [
    'images/slide_2.jpg',
    'images/slide_3.jpg',
    'images/slide_4.jpg'
  ];

  const zoomOutProperties = {
    indicators: true,
    scale: 0.4,
    indicators: i => (<div className="indicator">{i + 1}</div>)
  }
  return (
    <div>
      <Zoom {...zoomOutProperties}>
        { images.map((each, index) => <img key={index} style={{width: "100%"}} src={each} />) }
      </Zoom>
    </div>
  )
}

export default Slideshow;
`;

export const customIndicatorCSS = `
.indicator {
  cursor: pointer;
  padding: 10px;
  text-align: center;
  border: 1px #666 solid
}

.indicator.active {
  color: #fff;
  background: #666;
}
`;
export const pauseOnHover = `
import React from 'react';
import { Slide } from 'react-slideshow-image';

const PauseHoverExample = () => {
  const images = [
    "assets/images/slide_5.jpg",
    "assets/images/slide_6.jpg",
    "assets/images/slide_7.jpg"
  ];

  const fadeProperties = {
    duration: 3000,
    pauseOnHover: true
  };

  return (
    <div>
      <h2>Fade Effect</h2>
      <div className="slide-container">
        <Slide {...fadeProperties}>
          <div className="each-fade">
            <div>
              <img src={fadeImages[0]} />
            </div>
            <p>First Slide</p>
          </div>
          <div className="each-fade">
            <p>Second Slide</p>
            <div>
              <img src={fadeImages[1]} />
            </div>
          </div>
          <div className="each-fade">
            <div>
              <img src={fadeImages[2]} />
            </div>
            <p>Third Slide</p>
          </div>
        </Slide>
      </div>
    </div>
  );
};

export default PauseHoverExample;
`;

export const canSwipe = `
import React from 'react';
import { Slide } from 'react-slideshow-image';

const canSwipeExample = () => {
  const images = [
    "assets/images/slide_5.jpg",
    "assets/images/slide_6.jpg",
    "assets/images/slide_7.jpg"
  ];

  const fadeProperties = {
    duration: 3000,
    canSwipe: false,
  };

  return (
    <div>
      <h2>Fade Effect</h2>
      <div className="slide-container">
        <Slide {...fadeProperties}>
          <div className="each-fade">
            <div>
              <img src={fadeImages[0]} />
            </div>
            <p>First Slide</p>
          </div>
          <div className="each-fade">
            <p>Second Slide</p>
            <div>
              <img src={fadeImages[1]} />
            </div>
          </div>
          <div className="each-fade">
            <div>
              <img src={fadeImages[2]} />
            </div>
            <p>Third Slide</p>
          </div>
        </Slide>
      </div>
    </div>
  );
};

export default CanSwipeExample;
`;

export const autoplayCode = `
import React, { useState } from "react";
import { Slide } from "react-slideshow-image";

const AutoplayExample = () => {
  const [autoplay, setAutoplay] = useState(true);

  const style = {
    textAlign: "center",
    background: "teal",
    padding: "200px 0",
    fontSize: "30px"
  }

  return (
    <div>
      <div>
        <Slide autoplay={autoplay}>
          <div style={style}>
            First Slide
          </div>
          <div style={style}>
            Second Slide
          </div>
          <div style={style}>
            Third Slide
          </div>
        </Slide>
      </div>

      <div className="autoplay-buttons">
        Autplay is {autoplay ? 'on' : 'off'}
      </div>
      <div className="autoplay-buttons">
        <button type="button" onClick={() => setAutoplay(false)}>Pause</button>
        <button type="button" onClick={() => setAutoplay(true)}>Play</button>
      </div>
    </div>
  );
};

export default AutoplayExample;
`;

export const methodCode = `
import React, { useRef } from "react";
import { Slide } from "react-slideshow-image";

const MethodsExample = () => {
  const slideRef = useRef();

  const style = {
    textAlign: "center",
    background: "teal",
    padding: "200px 0",
    fontSize: "30px"
  };

  const properties = {
    autoplay: false,
    arrows: false
  };

  const back = () => {
    slideRef.current.goBack();
  }

  const next = () => {
    slideRef.current.goNext();
  }

  const goto = ({ target }) => {
    slideRef.current.goTo(parseInt(target.value, 10));
  }

  return (
    <div>
      <div>
        <Slide ref={slideRef} {...properties}>
          <div style={style}>
            First Slide
          </div>
          <div style={style}>
            Second Slide
          </div>
          <div style={style}>
            Third Slide
          </div>
        </Slide>
      </div>

      <div className="autoplay-buttons">
        <button type="button" onClick={back}>Back</button>
        <button type="button" onClick={next}>Next</button>
        <select onChange={goto}>
          <option>--Select--</option>
          <option value="0">First</option>
          <option value="1">Second</option>
          <option value="2">Third</option>
        </select>
      </div>
    </div>
  );
};

export default MethodsExample;
`;

export const callbackCode = `
import React, { useState } from "react";
import { Fade } from "react-slideshow-image";

const CallbackExample = () => {
  const [previousIndex, setPreviousIndex] = useState(null);
  const [nextIndex, setNextIndex] = useState(null);

  const style = {
    textAlign: "center",
    padding: "200px 0",
    fontSize: "30px"
  };

  const properties = {
    autoplay: true,
    indicators: true,
    onChange: (previous, next) => {
      setPreviousIndex(previous);
      setNextIndex(next);
    }
  };

  return (
    <div>
      <div>
        <Fade {...properties}>
          <div style={{...style, background: 'teal'}}>
            First Slide
          </div>
          <div style={{...style, background: '#6c6ce3'}}>
            Second Slide
          </div>
          <div style={{...style, background: '#8fe78f'}}>
            Third Slide
          </div>
          <div style={{...style, background: '#ccc'}}>
            Fourth Slide
          </div>
        </Fade>
      </div>
      <p style={{fontSize: "20px", textAlign: "center"}}>Transitioned from {previousIndex} to {nextIndex}</p>
    </div>
  );
};

export default CallbackExample;

`;
