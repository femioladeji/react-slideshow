# React-Slideshow

[![CircleCI](https://circleci.com/gh/femioladeji/react-slideshow.svg?style=svg)](https://circleci.com/gh/femioladeji/react-slideshow)
[![codecov](https://codecov.io/gh/femioladeji/react-slideshow/branch/master/graph/badge.svg)](https://codecov.io/gh/femioladeji/react-slideshow)
[![Package Quality](http://npm.packagequality.com/shield/react-slideshow-image.svg)](http://packagequality.com/#?package=react-slideshow-image)

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
```js
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
  arrows: true
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
```js
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
```js
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
      <Zoom {...zoomOutProperties}>
        {
          images.map((each, index) => <img key={index} style={{width: "100%"}} src={each} />)
        }
      </Zoom>
    )
}
```

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
HTML properties like className, data-* attributes and others will be applied to the parent div

## Properties
| Properties          | Type        | DefaultValue  | Description                                                                                |
| ------------------- |:-----------:| ------------- | ------------------------------------------------------------------------------------------ |
| duration            | integer     | 5000          | Time it takes (milliseconds) before next transition starts                                 |
| transitionDuration  | integer     | 1000          | Determines how long the transition takes                                                   |
| infinite            | boolean     | true          | Specifies if the transition should loop throughout      |
| indicators          | boolean     | false         | For specifying if there should be dots below the slideshow                                 |
| scale               | number      |               | *Required* when using zoom to specify the scale the current slide should be zoomed to      |
| arrows              | boolean     | true          | Determines if there should be a navigational arrow for going to the next or previous slide |
| autoplay            | boolean     | true          | Responsible for determining if the slideshow should start automatically                    |