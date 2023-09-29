import React, { ReactElement, ReactNode } from 'react';

export interface Responsive {
  breakpoint: number;
  settings: {
    slidesToShow: number;
    slidesToScroll: number;
  };
}

export interface BaseProps {
  /** the content of the component */
  children: ReactNode;
  /** The time it takes (milliseconds) before next transition starts */
  duration?: number;
  /** Determines how long the transition takes */
  transitionDuration?: number;
  /** Specifies the first slide to display */
  defaultIndex?: number;
  /** For specifying if there should be dots below the slideshow. If function; it will render the returned element */
  indicators?: boolean | ((index?: number) => ReactNode);
  /** A custom element to serve as previous arrow */
  prevArrow?: ReactElement;
  /** A custom element to serve as next arrow */
  nextArrow?: ReactElement;
  /** Determines if there should be a navigational arrow for going to the next or previous slide */
  arrows?: boolean;
  /** Responsible for determining if the slideshow should start automatically */
  autoplay?: boolean;
  /** Specifies if the transition should loop infinitely */
  infinite?: boolean;
  /** Determines whether the transition effect applies when the mouse hovers the slider */
  pauseOnHover?: boolean;
  /** Determines whether the user can go to next or previous slide by the mouse or by touching */
  canSwipe?: boolean;
  /** The timing transition function to use. You can use one of linear, ease, ease-in, ease-out, cubic, cubic-in, cubic-out */
  easing?: string;
  /** Use this prop to add your custom css to the wrapper containing the sliders. Pass your css className as value for the cssClass prop */
  cssClass?: string;
  /** Callback that gets triggered at the start of every transition. The oldIndex and newIndex are passed as arguments */
  onStartChange?: (from: number, to: number) => void;
  /** Callback that gets triggered at the end of every transition. The oldIndex and newIndex are passed as arguments */
  onChange?: (from: number, to: number) => void;
  /** Ref for the slideshow (carousel). This is useful for executing methods like goBack, goNext and goTo on the slideshow */
  ref?: any;
}

export interface FadeProps extends BaseProps {}
export interface ZoomProps extends BaseProps {
  /** Required when using zoom to specify the scale the current slide should be zoomed to. A number greater than 1 indicates zoom in. A number less than 1, indicates zoom out */
  scale: number;
}
export interface SlideProps extends BaseProps {
  /** Set slidesToShow & slidesToScroll based on screen size. */
  responsive?: Array<Responsive>;
  /** The number of slides to show on each page */
  slidesToShow?: number;
  /** The number of slides to scroll */
  slidesToScroll?: number;
  /** If slide should scroll vertically */
  vertical?: boolean;
}

export type ButtonClick = (event: React.SyntheticEvent<HTMLButtonElement>) => void;

export type IndicatorPropsType = {
  'data-key': number;
  'aria-label': string;
  onClick: ButtonClick;
};

export type TweenEasingFn = (amount: number) => number;

export type SlideshowRef = {
  goNext: () => void;
  goBack: () => void;
  goTo: (index: number, options?: { skipTransition?: boolean }) => void;
};
