# React-Slideshow

A simple slideshow component built with react that supports slide, fade and zoom effects

Installation
```
npm install react-slideshow-image -S
```

```
yarn add react-slideshow-image
```

You can use three different effects of the slideshow. Check the [demo](https://react-slideshow.herokuapp.com)

## Slide Effect
```
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
  indicators: true
}

const Slideshow = () => {
    return (
      <Slide {...properties}>
        <div className="each-slide">
          <div style={{'backgroundImage': `url(${slideImages[0]})`}}>
            <span>Slide 1</span>
          </div>
        </div>
        <div className="each-slide">
          <div style={{'backgroundImage': `url(${slideImages[1]})`}}>
            <span>Slide 2</span>
          </div>
        </div>
        <div className="each-slide">
          <div style={{'backgroundImage': `url(${slideImages[2]})`}}>
            <span>Slide 3</span>
          </div>
        </div>
      </Slide>
    )
}
```
The default value for duration and transitionDuration is 5000 and 1000 milliseconds respectively

## Fade Effect
```
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
  infinite: true,
  indicators: true
}

const Slideshow = () => {
  return (
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
  )
}
```
The default value for duration and transitionDuration is 5000 and 1000 milliseconds respectively

## Zoom Effect
```
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
  scale: 0.4
}

const Slideshow = () => {
    return (
      <Zoom {...zoomOutProperties}>
        {
          images.map((each, index) => <img key={index} style={{width: "100%"}} src={each} />)
        }
      </Zoom>
    )
}
```
The `images` and `scale` props are compulsory. The `scale` prop determines if the images will be zoomed out or in. If a scale less than 1 was entered, then the image will be zoomed out but if it's greater than 1 then the image will be zoomed in. The `scale` property is numeric

# Webpack configuration
⚠️  If you bootstrapped the app without using create-react-app, you will need to add [css loader](https://github.com/webpack-contrib/css-loader) and [style loader](https://github.com/webpack-contrib/style-loader) to your webpack config

**webpack.config.js**
```js
{
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      }
    ]
  }
}
```