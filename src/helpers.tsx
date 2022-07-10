import React, { ReactNode } from 'react';
import {
    ButtonClick,
    FadeProps,
    IndicatorPropsType,
    SlideProps,
    TweenEasingFn,
    ZoomProps,
} from './types';
import TWEEN from '@tweenjs/tween.js';

export const getStartingIndex = (children: ReactNode, defaultIndex?: number): number => {
    if (defaultIndex && defaultIndex < React.Children.count(children)) {
        return defaultIndex;
    }
    return 0;
};

const EASING_METHODS: { [key: string]: TweenEasingFn } = {
    linear: TWEEN.Easing.Linear.None,
    ease: TWEEN.Easing.Quadratic.InOut,
    'ease-in': TWEEN.Easing.Quadratic.In,
    'ease-out': TWEEN.Easing.Quadratic.Out,
    cubic: TWEEN.Easing.Cubic.InOut,
    'cubic-in': TWEEN.Easing.Cubic.In,
    'cubic-out': TWEEN.Easing.Cubic.Out,
};

export const getEasing = (easeMethod?: string): TweenEasingFn => {
    if (easeMethod) {
        return EASING_METHODS[easeMethod];
    }
    return EASING_METHODS.linear;
};

export const showPreviousArrow = (
    { prevArrow, infinite }: FadeProps | SlideProps | ZoomProps,
    currentIndex: number,
    moveSlides: ButtonClick
): ReactNode => {
    const isDisabled = currentIndex <= 0 && !infinite;
    const props = {
        'data-type': 'prev',
        'aria-label': 'Previous Slide',
        disabled: isDisabled,
        onClick: moveSlides,
    };
    if (prevArrow) {
        return React.cloneElement(prevArrow, {
            className: `${prevArrow.props.className || ''} nav ${isDisabled ? 'disabled' : ''}`,
            ...props,
        });
    }
    const className = `nav default-nav ${isDisabled ? 'disabled' : ''}`;
    return (
        <button type="button" className={className} {...props}>
            <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
            </svg>
        </button>
    );
};

export const showNextArrow = (
    properties: FadeProps | SlideProps | ZoomProps,
    currentIndex: number,
    moveSlides: ButtonClick
) => {
    const { nextArrow, infinite, children } = properties;
    let slidesToScroll = 1;
    if ('slidesToScroll' in properties) {
        slidesToScroll = properties.slidesToScroll || 1;
    }
    const isDisabled = currentIndex >= React.Children.count(children) - slidesToScroll && !infinite;
    const props = {
        'data-type': 'next',
        'aria-label': 'Next Slide',
        disabled: isDisabled,
        onClick: moveSlides,
    };
    if (nextArrow) {
        return React.cloneElement(nextArrow, {
            className: `${nextArrow.props.className || ''} nav ${isDisabled ? 'disabled' : ''}`,
            ...props,
        });
    }
    const className = `nav default-nav ${isDisabled ? 'disabled' : ''}`;
    return (
        <button type="button" className={className} {...props}>
            <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
            </svg>
        </button>
    );
};

const showDefaultIndicator = (
    isCurrentPageActive: boolean,
    key: number,
    indicatorProps: IndicatorPropsType
) => {
    return (
        <li key={key}>
            <button
                type="button"
                className={`each-slideshow-indicator ${isCurrentPageActive ? 'active' : ''}`}
                {...indicatorProps}
            />
        </li>
    );
};

const showCustomIndicator = (
    isCurrentPageActive: boolean,
    key: number,
    indicatorProps: any,
    eachIndicator: any
) => {
    return React.cloneElement(eachIndicator, {
        className: `${eachIndicator.props.className} ${isCurrentPageActive ? 'active' : ''}`,
        key,
        ...indicatorProps,
    });
};

export const showIndicators = (
    props: FadeProps | SlideProps | ZoomProps,
    currentIndex: number,
    navigate: ButtonClick
): ReactNode => {
    const { children, indicators } = props;
    let slidesToScroll = 1;
    if ('slidesToScroll' in props) {
        slidesToScroll = props.slidesToScroll || 1;
    }
    const pages = Math.ceil(React.Children.count(children) / slidesToScroll);
    return (
        <ul className="indicators">
            {Array.from({ length: pages }, (_, key) => {
                const indicatorProps: IndicatorPropsType = {
                    'data-key': key,
                    'aria-label': `Go to slide ${key + 1}`,
                    onClick: navigate,
                };
                const isCurrentPageActive =
                    Math.floor((currentIndex + slidesToScroll - 1) / slidesToScroll) === key;
                if (typeof indicators === 'function') {
                    return showCustomIndicator(
                        isCurrentPageActive,
                        key,
                        indicatorProps,
                        indicators(key)
                    );
                }
                return showDefaultIndicator(isCurrentPageActive, key, indicatorProps);
            })}
        </ul>
    );
};
