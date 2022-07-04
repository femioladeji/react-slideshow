import React from 'react';
import { FadeZoom } from './fadezoom';
import { defaultProps } from './props';
import { SlideshowRef, ZoomProps } from './types';

export const Zoom =  React.forwardRef<SlideshowRef, ZoomProps>((props, ref) => {
    return <FadeZoom {...props} ref={ref} />;
});

Zoom.defaultProps = defaultProps;
