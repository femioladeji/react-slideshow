// import React from 'react';
// import { BaseProps, FadeProps, Props, Responsive, SlideProps, ZoomProps } from './types';

export const defaultProps = {
  duration: 5000,
  transitionDuration: 1000,
  defaultIndex: 0,
  infinite: true,
  autoplay: true,
  indicators: false,
  arrows: true,
  pauseOnHover: true,
  easing: 'linear',
  canSwipe: true,
  cssClass: '',
  responsive: [],
};
// const defaultProps: Required<FadeProps> = {
//     duration: 5000,
//     transitionDuration: 1000,
//     defaultIndex: 0,
//     infinite: true,
//     autoplay: true,
//     indicators: false,
//     arrows: true,
//     pauseOnHover: true,
//     easing: 'linear',
//     canSwipe: true,
//     // slidesToShow: 1,
//     // slidesToScroll: 1,
//     cssClass: '',
//     // responsive: [],
//     children: [],
//     // scale: 1,
// };

// const getResponsiveSettings = (windowWidth: number, responsive: Array<Responsive>): Responsive | undefined => {
//   return responsive.find(each => each.breakpoint <= windowWidth);
// };

// export const getProps = (componentProps: FadeProps | SlideProps | ZoomProps): Props => {
//     let children = React.Children.map(componentProps.children, each => each);
//     let settings = {};
//     // if (typeof window !== 'undefined' && Array.isArray(componentProps.responsive)) {
//     //     const windowWidth = window.innerWidth;
//     //     const responsiveSettings = getResponsiveSettings(
//     //         windowWidth,
//     //         componentProps.responsive
//     //     );
//     //     if (responsiveSettings) {
//     //         ({ settings } = responsiveSettings);
//     //     }
//     // }
//     return {
//         ...defaultProps,
//         ...componentProps,
//         ...settings,
//         children
//     };
// };

// export const validatePropTypes = (props: Props) => {
//     for (const key in props) {
//         const propValueType = typeof props[key];
//         if (propTypes[key]) {
//             if (
//                 Array.isArray(propTypes[key]) &&
//                 !propTypes[key].includes(propValueType)
//             ) {
//                 console.warn(
//                     `${key} must be of one of type ${propTypes[key].join(', ')}`
//                 );
//             } else if (propTypes[key] === 'array' && !Array.isArray(props[key])) {
//                 console.warn(`${key} must be of type ${propTypes[key]}`);
//             } else if (
//                 propTypes[key] !== 'array' &&
//                 !Array.isArray(propTypes[key]) &&
//                 propValueType !== propTypes[key]
//             ) {
//                 console.warn(`${key} must be of type ${propTypes[key]}`);
//             }
//         }
//     }
// };
