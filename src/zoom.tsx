import React from 'react';
import { FadeZoom } from './fadezoom';
import { SlideshowRef, ZoomProps } from './types';

export const Zoom = React.forwardRef<SlideshowRef, ZoomProps>((props, ref) => {    const {
        duration=5000,
        transitionDuration=1000,
        defaultIndex=0,
        infinite=true,
        autoplay=true,
        indicators=false,
        arrows=true,
        pauseOnHover=true,
        easing='linear',
        canSwipe=true,
        cssClass='',
        ...others
    } = props;

    const props2:ZoomProps = {
        duration,
        transitionDuration,
        defaultIndex,
        infinite,
        autoplay,
        indicators,
        arrows,
        pauseOnHover,
        easing,
        canSwipe,
        cssClass,
        ...others
    };
    return <FadeZoom {...props2} ref={ref} />;
});
