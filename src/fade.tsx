import React from 'react';
import { FadeZoom } from './fadezoom';
import { FadeProps, SlideshowRef } from './types';

export const Fade = React.forwardRef<SlideshowRef, FadeProps>((props, ref) => {
    const {
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

    const props2:FadeProps = {
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
    return <FadeZoom {...props2} scale={1} ref={ref} />;
});
