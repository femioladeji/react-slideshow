import React, { FC } from 'react';
import { FadeZoom } from './fadezoom';
import { defaultProps } from './props';
import { FadeProps } from './types';

export const Fade: FC<FadeProps> = props => {
    return <FadeZoom {...props} scale={1} />;
};

Fade.defaultProps = defaultProps;
