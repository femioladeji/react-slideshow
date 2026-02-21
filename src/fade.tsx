import React from 'react';
import { FadeZoom } from './fadezoom';
import { FadeProps, SlideshowRef } from './types';

export const Fade = React.forwardRef<SlideshowRef, FadeProps>((props, ref) => {
    return <FadeZoom {...props} scale={1} ref={ref} />;
});
