# React-Slideshow

[![CircleCI](https://circleci.com/gh/femioladeji/react-slideshow.svg?style=svg)](https://circleci.com/gh/femioladeji/react-slideshow)
[![codecov](https://codecov.io/gh/femioladeji/react-slideshow/branch/master/graph/badge.svg)](https://codecov.io/gh/femioladeji/react-slideshow)
[![Package Quality](http://npm.packagequality.com/shield/react-slideshow-image.svg)](http://packagequality.com/#?package=react-slideshow-image)
[![downloads](https://img.shields.io/npm/dm/react-slideshow-image.svg)](https://www.npmjs.com/package/react-slideshow-image)

A simple slideshow component built with react that supports slide, fade and zoom effects. For full documentation click [here](https://react-slideshow.herokuapp.com)

## Installation
```
npm install react-slideshow-image -S
```

```
yarn add react-slideshow-image
```

You need to import the css style, you can do that by adding to the js file
```js
import 'react-slideshow-image/dist/styles.css'

```
or to your css file
```css
@import "react-slideshow-image/dist/styles.css";

```

You can use three different effects of the slideshow. Check [examples](https://react-slideshow.herokuapp.com)

## Slide Effect
You can use this [playground](https://codesandbox.io/s/serene-lalande-yjmol) to tweak some values
```js
import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const slideImages = [
  'images/slide_2.jpg',
  'images/slide_3.jpg',
  'images/slide_4.jpg'
];

const Slideshow = () => {
    return (
      <div className="slide-container">
        <Slide>
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
      </div>
    )
}
```

## Fade Effect
You can use this [playground](https://codesandbox.io/s/admiring-wave-17e0j) to tweak some values
```js
import React from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const fadeImages = [
  'images/slide_5.jpg',
  'images/slide_6.jpg',
  'images/slide_7.jpg'
];

const Slideshow = () => {
  return (
    <div className="slide-container">
      <Fade>
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
```

## Zoom Effect
You can use this [playground](https://codesandbox.io/s/priceless-bohr-ggirf) to tweak some values
```js
import React from 'react';
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const images = [
  'images/slide_2.jpg',
  'images/slide_3.jpg',
  'images/slide_4.jpg',
  'images/slide_5.jpg',
  'images/slide_6.jpg',
  'images/slide_7.jpg'
];

const Slideshow = () => {
    return (
      <div className="slide-container">
        <Zoom scale={0.4}>
          {
            images.map((each, index) => <img key={index} style={{width: "100%"}} src={each} />)
          }
        </Zoom>
      </div>
    )
}
```

## Properties
Click [here](https://react-slideshow.herokuapp.com/api) for all the properties you can use to customize the behavior of the slideshow.

## methods
Click [here](https://react-slideshow.herokuapp.com/api#methods) for all the methods you can call on the slideshow


## Typescript
The type bindings have not been added yet to the types registry yet. It's a WIP. You can follow [this instruction](https://react-slideshow.herokuapp.com/typescript)
