import React from 'react';
import { FadeZoom } from './fadezoom';
import { defaultProps } from './props';
import { FadeProps } from './types';

export const Fade = React.forwardRef((props: FadeProps, ref) => {
    return <FadeZoom {...props} scale={1} ref={ref} />;
});

Fade.defaultProps = defaultProps;
