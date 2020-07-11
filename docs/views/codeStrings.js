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
        <Slide>
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
            <img src={fadeImages[0]} />
            <h2>First Slide</h2>
          </div>
          <div className="each-fade">
            <h2>Second Slide</h2>
            <img src={fadeImages[1]} />
          </div>
          <div className="each-fade">
            <img src={fadeImages[2]} />
            <h2>Third Slide</h2>
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
}

.each-fade  img {
  width: 75%;
}

.each-fade h2 {
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  background: #adceed;
}
`

export const zoomEffectCodeString = `
  import React from 'react';
  import { Zoom } from 'react-slideshow-image';

  const images = [
    'images/slide_2.jpg',
    'images/slide_3.jpg',
    'images/slide_4.jpg',
    'images/slide_5.jpg',
    'images/slide_6.jpg',
    'images/slide_7.jpg'
  ];

  const zoomOutProperties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    scale: 0.4,
    arrows: true
  }

  const Slideshow = () => {
      return (
        <div className="slide-container">
          <Zoom {...zoomOutProperties}>
            {
              images.map((each, index) => <img key={index} style={{width: "100%"}} src={each} />)
            }
          </Zoom>
        </div>
      )
  }
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
