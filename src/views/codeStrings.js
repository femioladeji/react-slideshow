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

  const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true,
    pauseOnHover: true,
    onChange: (oldIndex, newIndex) => {
      console.log(\`slide transition from \${oldIndex} to \${newIndex}\`\);
    }
  }

  const Slideshow = () => {
      return (
        <div className="slide-container">
          <Slide {...properties}>
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
  }
`;

export const fadeEffectCodeString = `
import React from 'react';
import { Fade } from 'react-slideshow-image';

const fadeImages = [
  'images/slide_5.jpg',
  'images/slide_6.jpg',
  'images/slide_7.jpg'
];

const fadeProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: false,
  indicators: true,
  onChange: (oldIndex, newIndex) => {
    console.log(\`fade transition from \${oldIndex} to \${newIndex}\`\);
  }
}

const Slideshow = () => {
  return (
    <div className="slide-container">
      <Fade {...fadeProperties}>
        <div className="each-fade">
          <div className="image-container">
            <img src={fadeImages[0]} />
          </div>
          <h2>First Slide</h2>
        </div>
        <div className="each-fade">
          <div className="image-container">
            <img src={fadeImages[1]} />
          </div>
          <h2>Second Slide</h2>
        </div>
        <div className="each-fade">
          <div className="image-container">
            <img src={fadeImages[2]} />
          </div>
          <h2>Third Slide</h2>
        </div>
      </Fade>
    </div>
  )
}
`;

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
