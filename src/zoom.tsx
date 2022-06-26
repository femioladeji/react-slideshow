import React from 'react';
import { FadeZoom } from './fadezoom';
import { defaultProps } from './props';
import { ZoomProps } from './types';

export const Zoom = React.forwardRef((props: ZoomProps, ref) => {
    return <FadeZoom {...props} ref={ref} />;
});

Zoom.defaultProps = defaultProps;
