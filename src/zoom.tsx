import React, { FC } from 'react';
import { FadeZoom } from './fadezoom';
import { defaultProps } from './props';
import { ZoomProps } from './types';

export const Zoom: FC<ZoomProps> = props => {
    return <FadeZoom {...props} />;
};

Zoom.defaultProps = defaultProps;
