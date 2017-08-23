# React-Slideshow

A simple image slideshow component built with react that supports slide, fade and zoom effects

Installation
```
npm install react-slideshow-image
```

You can use three different effects of the slideshow. Check the [demo](https://react-slideshow.herokuapp.com)

## Slide Effect
```
import React from 'react';
import { Slide } from 'react-slideshow-image';

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
        <Slide
          images={images}
          duration="5000"
          transitionDuration="1000"
        />
    )
}
```
The `images` props should be an array of image path. It's also the only required prop. The default value for duration and transitionDuration is 5000 and 1000 milliseconds respectively

## Fade Effect
```
import React from 'react';
import { Fade } from 'react-slideshow-image';

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
        <Fade
          images={images}
          duration="5000"
          transitionDuration="1000"
        />
    )
}
```
The `images` props should be an array of image path. It's also the only required prop. The default value for duration and transitionDuration is 5000 and 1000 milliseconds respectively

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

const Slideshow = () => {
    return (
        <Zoom
          images={images}
          scale="0.4"
          duration="5000"
          transitionDuration="1000"
        />
    )
}
```
The `images` and `scale` props are compulsory. The `scale` prop determines if the images will be zoomed out or in. If a scale less than 1 was entered, then the image will be zoomed out but if it's greater than 1 then the image will be zoomed in