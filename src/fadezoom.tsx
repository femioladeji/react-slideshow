import React, { useState, useRef, useEffect, useMemo, useImperativeHandle } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import TWEEN from '@tweenjs/tween.js';
import {
    getEasing,
    getStartingIndex,
    showIndicators,
    showNextArrow,
    showPreviousArrow,
    getOtherProps,
} from './helpers';
import { ButtonClick, ZoomProps } from './types';
import { defaultProps } from './props';

export const FadeZoom = React.forwardRef((props: ZoomProps, ref) => {
    const [index, setIndex] = useState<number>(
        getStartingIndex(props.children, props.defaultIndex)
    );
    const wrapperRef = useRef<HTMLDivElement>(null);
    const innerWrapperRef = useRef<any>(null);
    const tweenGroup = new TWEEN.Group();
    const timeout = useRef<NodeJS.Timeout>();
    const resizeObserver = useRef<any>();
    const childrenCount = useMemo(() => React.Children.count(props.children), [props.children]);
    const otherProps = useMemo(() => getOtherProps(props), [props]);

    const applyStyle = () => {
        if (innerWrapperRef.current && wrapperRef.current) {
            const wrapperWidth = wrapperRef.current.clientWidth;
            const fullwidth = wrapperWidth * childrenCount;
            innerWrapperRef.current.style.width = `${fullwidth}px`;
            for (let index = 0; index < innerWrapperRef.current.children.length; index++) {
                const eachDiv = innerWrapperRef.current.children[index];
                if (eachDiv) {
                    eachDiv.style.width = `${wrapperWidth}px`;
                    eachDiv.style.left = `${index * -wrapperWidth}px`;
                    eachDiv.style.display = `block`;
                }
            }
        }
    };

    useEffect(() => {
        initResizeObserver();
        return () => {
            tweenGroup.removeAll();
            clearTimeout(timeout.current);
            removeResizeObserver();
        };
    }, []);

    useEffect(() => {
        clearTimeout(timeout.current);
        play();
    }, [index, props.autoplay]);

    useEffect(() => {
        applyStyle();
    }, [childrenCount]);

    useImperativeHandle(ref, () => ({
        goNext: () => {
            moveNext();
        },
        goBack: () => {
            moveBack();
        },
        goTo: (index: number) => {
            moveTo(index);
        },
    }));

    const removeResizeObserver = () => {
        if (resizeObserver.current && wrapperRef.current) {
            resizeObserver.current.unobserve(wrapperRef.current);
        }
    };

    const pauseSlides = () => {
        if (props.pauseOnHover) {
            clearTimeout(timeout.current);
        }
    };

    const startSlides = () => {
        const { pauseOnHover, autoplay, duration } = props;
        if (pauseOnHover && autoplay) {
            timeout.current = setTimeout(() => moveNext(), duration);
        }
    };

    const moveNext = () => {
        const { children, infinite } = props;
        if (!infinite && index === React.Children.count(children) - 1) {
            return;
        }
        transitionSlide((index + 1) % React.Children.count(children));
    };

    const moveBack = () => {
        const { children, infinite } = props;
        if (!infinite && index === 0) {
            return;
        }
        transitionSlide(index === 0 ? React.Children.count(children) - 1 : index - 1);
    };

    const preTransition: ButtonClick = (event) => {
        const { currentTarget } = event;
        if (currentTarget.dataset.type === 'prev') {
            moveBack();
        } else {
            moveNext();
        }
    };

    const initResizeObserver = () => {
        if (wrapperRef.current) {
            resizeObserver.current = new ResizeObserver((entries) => {
                if (!entries) return;
                applyStyle();
            });
            resizeObserver.current.observe(wrapperRef.current);
        }
    };

    const play = () => {
        const { autoplay, children, duration, infinite } = props;
        if (
            autoplay &&
            React.Children.count(children) > 1 &&
            (infinite || index < React.Children.count(children) - 1)
        ) {
            timeout.current = setTimeout(moveNext, duration);
        }
    };

    const transitionSlide = (newIndex: number) => {
        const existingTweens = tweenGroup.getAll();
        if (!existingTweens.length) {
            if (!innerWrapperRef.current?.children[newIndex]) {
                newIndex = 0;
            }
            clearTimeout(timeout.current);
            const value = { opacity: 0, scale: 1 };

            const animate = () => {
                requestAnimationFrame(animate);
                tweenGroup.update();
            };

            animate();

            const tween = new TWEEN.Tween(value, tweenGroup)
                .to({ opacity: 1, scale: props.scale }, props.transitionDuration)
                .onUpdate((value) => {
                    if (!innerWrapperRef.current) {
                        return;
                    }
                    innerWrapperRef.current.children[newIndex].style.opacity = value.opacity;
                    innerWrapperRef.current.children[index].style.opacity = 1 - value.opacity;
                    innerWrapperRef.current.children[
                        index
                    ].style.transform = `scale(${value.scale})`;
                })
                .start();
            tween.easing(getEasing(props.easing));
            tween.onComplete(() => {
                setIndex(newIndex);
                if (innerWrapperRef.current) {
                    innerWrapperRef.current.children[index].style.transform = `scale(1)`;
                }
                if (typeof props.onChange === 'function') {
                    props.onChange(index, newIndex);
                }
            });
        }
    };

    const moveTo = (index: number) => {
        transitionSlide(index);
    };

    const navigate: ButtonClick = (event) => {
        const { currentTarget } = event;
        if (!currentTarget.dataset.key) {
            return;
        }
        if (parseInt(currentTarget.dataset.key) !== index) {
            moveTo(parseInt(currentTarget.dataset.key));
        }
    };

    return (
        <div dir="ltr" aria-roledescription="carousel">
            <div
                className={`react-slideshow-container ${props.className || ''}`}
                onMouseEnter={pauseSlides}
                onMouseOver={pauseSlides}
                onMouseLeave={startSlides}
                ref={props.ref}
                {...otherProps}
            >
                {props.arrows && showPreviousArrow(props, index, preTransition)}
                <div
                    className={`react-slideshow-fadezoom-wrapper ${props.cssClass}`}
                    ref={wrapperRef}
                >
                    <div className="react-slideshow-fadezoom-images-wrap" ref={innerWrapperRef}>
                        {(React.Children.map(props.children, (thisArg) => thisArg) || []).map(
                            (each, key) => (
                                <div
                                    style={{
                                        opacity: key === index ? '1' : '0',
                                        zIndex: key === index ? '1' : '0',
                                    }}
                                    data-index={key}
                                    key={key}
                                    aria-roledescription="slide"
                                    aria-hidden={key === index ? 'false' : 'true'}
                                >
                                    {each}
                                </div>
                            )
                        )}
                    </div>
                </div>
                {props.arrows && showNextArrow(props, index, preTransition)}
            </div>
            {props.indicators && showIndicators(props, index, navigate)}
        </div>
    );
});

FadeZoom.defaultProps = defaultProps;
