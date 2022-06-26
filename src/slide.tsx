import React, { useState, useRef, useEffect, useMemo, useImperativeHandle } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import TWEEN from '@tweenjs/tween.js';
import {
    getEasing,
    getStartingIndex,
    showIndicators,
    showNextArrow,
    showPreviousArrow,
} from './helpers';
import { ButtonClick, SlideProps } from './types';
import { defaultProps } from './props';

export const Slide = React.forwardRef((props: SlideProps, ref) => {
    const [index, setIndex] = useState(getStartingIndex(props.children, props.defaultIndex));
    const [wrapperWidth, setWrapperWidth] = useState<number>(0);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const innerWrapperRef = useRef<any>(null);
    const tweenGroup = new TWEEN.Group();
    const slidesToScroll = useMemo(() => props.slidesToScroll || 1, [props.slidesToScroll]);
    const slidesToShow = useMemo(() => props.slidesToShow || 1, [props.slidesToShow]);
    const childrenCount = useMemo(() => React.Children.count(props.children), [props.children]);
    const eachChildWidth = useMemo(() => wrapperWidth / slidesToShow, [wrapperWidth, slidesToShow]);
    const timeout = useRef<NodeJS.Timeout>();
    const resizeObserver = useRef<any>();
    let startingClientX: number;
    let dragging: boolean = false;
    let distanceSwiped: number = 0;

    const applyStyle = () => {
        if (innerWrapperRef.current) {
            const fullwidth = wrapperWidth * innerWrapperRef.current.children.length;
            innerWrapperRef.current.style.width = `${fullwidth}px`;
            for (let index = 0; index < innerWrapperRef.current.children.length; index++) {
                const eachDiv = innerWrapperRef.current.children[index];
                if (eachDiv) {
                    eachDiv.style.width = `${eachChildWidth}px`;
                    eachDiv.style.display = `block`;
                }
            }
        }
    };

    useEffect(() => {
        applyStyle();
    }, [wrapperWidth]);

    useEffect(() => {
        initResizeObserver();
        return () => {
            tweenGroup.removeAll();
            clearTimeout(timeout.current);
            removeResizeObserver();
        };
    }, [wrapperRef]);

    useEffect(() => {
        clearTimeout(timeout.current);
        play();
    }, [index, props.autoplay]);

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

    const play = () => {
        const { autoplay, infinite, duration } = props;
        if (autoplay && (infinite || index < childrenCount - 1)) {
            timeout.current = setTimeout(moveNext, duration);
        }
    };

    const removeResizeObserver = () => {
        if (resizeObserver && wrapperRef.current) {
            resizeObserver.current.unobserve(wrapperRef.current);
        }
    };

    const pauseSlides = () => {
        if (props.pauseOnHover) {
            clearTimeout(timeout.current);
        }
    };

    const swipe = (event: React.MouseEvent | React.TouchEvent) => {
        if (props.canSwipe) {
            const clientX =
                event.nativeEvent instanceof TouchEvent
                    ? event.nativeEvent.touches[0].pageX
                    : event.nativeEvent.clientX;
            if (dragging) {
                let translateValue = wrapperWidth * (index + getOffset());
                const distance = clientX - startingClientX;
                if (!props.infinite && index === childrenCount - slidesToScroll && distance < 0) {
                    // if it is the last and infinite is false and you're swiping left
                    // then nothing happens
                    return;
                }
                if (!props.infinite && index === 0 && distance > 0) {
                    // if it is the first and infinite is false and you're swiping right
                    // then nothing happens
                    return;
                }
                distanceSwiped = distance;
                translateValue -= distanceSwiped;
                innerWrapperRef.current.style.transform = `translate(-${translateValue}px)`;
            }
        }
    };

    const moveNext = () => {
        if (!props.infinite && index === childrenCount - slidesToScroll) {
            return;
        }
        const nextIndex = calculateIndex(index + slidesToScroll);
        transitionSlide(nextIndex);
    };

    const moveBack = () => {
        if (!props.infinite && index === 0) {
            return;
        }
        let previousIndex = index - slidesToScroll;
        if (previousIndex % slidesToScroll) {
            previousIndex = Math.ceil(previousIndex / slidesToScroll) * slidesToScroll;
        }
        transitionSlide(previousIndex);
    };

    const goToSlide: ButtonClick = ({ currentTarget }) => {
        if (!currentTarget.dataset.key) {
            return;
        }
        const datasetKey = parseInt(currentTarget.dataset.key);
        moveTo(datasetKey * slidesToScroll);
    };

    const moveTo = (index: number) => {
        transitionSlide(calculateIndex(index));
    };

    const calculateIndex = (nextIndex: number): number => {
        if (nextIndex < childrenCount && nextIndex + slidesToScroll > childrenCount) {
            if ((childrenCount - slidesToScroll) % slidesToScroll) {
                return childrenCount - slidesToScroll;
            }
            return nextIndex;
        }
        return nextIndex;
    };

    const startSlides = () => {
        if (dragging) {
            endSwipe();
        } else if (props.pauseOnHover && props.autoplay) {
            timeout.current = setTimeout(moveNext, props.duration);
        }
    };

    const moveSlides: ButtonClick = ({ currentTarget: { dataset } }) => {
        if (dataset.type === 'next') {
            moveNext();
        } else {
            moveBack();
        }
    };

    const renderPreceedingSlides = () => {
        return React.Children.toArray(props.children)
            .slice(-slidesToShow)
            .map((each, index) => (
                <div
                    data-index={index - slidesToShow}
                    aria-roledescription="slide"
                    aria-hidden="true"
                    key={index - slidesToShow}
                >
                    {each}
                </div>
            ));
    };

    const renderTrailingSlides = () => {
        if (!props.infinite && slidesToShow === slidesToScroll) {
            return;
        }
        return React.Children.toArray(props.children)
            .slice(0, slidesToShow)
            .map((each, index) => (
                <div
                    data-index={childrenCount + index}
                    aria-roledescription="slide"
                    aria-hidden="true"
                    key={childrenCount + index}
                >
                    {each}
                </div>
            ));
    };

    const setWidth = () => {
        if (wrapperRef.current) {
            setWrapperWidth(wrapperRef.current.clientWidth);
        }
    };

    const initResizeObserver = () => {
        if (wrapperRef.current) {
            resizeObserver.current = new ResizeObserver((entries) => {
                if (!entries) return;
                setWidth();
            });
            resizeObserver.current.observe(wrapperRef.current);
        }
    };

    const startSwipe = (event: React.MouseEvent | React.TouchEvent) => {
        if (props.canSwipe) {
            startingClientX =
                event.nativeEvent instanceof TouchEvent
                    ? event.nativeEvent.touches[0].pageX
                    : event.nativeEvent.clientX;
            clearTimeout(timeout.current);
            dragging = true;
        }
    };

    const endSwipe = () => {
        if (props.canSwipe) {
            dragging = false;
            if (Math.abs(distanceSwiped) / wrapperWidth > 0.2) {
                if (distanceSwiped < 0) {
                    moveNext();
                } else {
                    moveBack();
                }
            } else {
                if (Math.abs(distanceSwiped) > 0) {
                    transitionSlide(index, 300);
                }
            }
        }
    };

    const transitionSlide = (toIndex: number, animationDuration?: number) => {
        const transitionDuration = animationDuration || props.transitionDuration;
        const currentIndex = index;
        const existingTweens = tweenGroup.getAll();
        if (!wrapperRef.current) {
            return;
        }
        const childWidth = wrapperRef.current.clientWidth / slidesToShow;
        if (!existingTweens.length) {
            clearTimeout(timeout.current);
            const value = {
                margin: -childWidth * (currentIndex + getOffset()) + distanceSwiped,
            };
            const tween = new TWEEN.Tween(value, tweenGroup)
                .to({ margin: -childWidth * (toIndex + getOffset()) }, transitionDuration)
                .onUpdate((value) => {
                    if (innerWrapperRef.current) {
                        innerWrapperRef.current.style.transform = `translate(${value.margin}px)`;
                    }
                })
                .start();
            tween.easing(getEasing(props.easing));
            const animate = () => {
                requestAnimationFrame(animate);
                tweenGroup.update();
            };

            animate();

            tween.onComplete(() => {
                distanceSwiped = 0;
                let newIndex = toIndex;
                if (newIndex < 0) {
                    newIndex = childrenCount - slidesToScroll;
                } else if (newIndex >= childrenCount) {
                    newIndex = 0;
                }

                if (typeof props.onChange === 'function') {
                    props.onChange(index, newIndex);
                }
                setIndex(newIndex);
            });
        }
    };

    const isSlideActive = (key: number) => {
        return key < index + slidesToShow && key >= index;
    };

    const getOffset = (): number => {
        if (!props.infinite) {
            return 0;
        }
        return slidesToShow;
    };

    const style = {
        transform: `translate(-${(index + getOffset()) * eachChildWidth}px)`,
    };
    return (
        <div dir="ltr" aria-roledescription="carousel">
            <div
                className="react-slideshow-container"
                onMouseEnter={pauseSlides}
                onMouseOver={pauseSlides}
                onMouseLeave={startSlides}
                onMouseDown={startSwipe}
                onMouseUp={endSwipe}
                onMouseMove={swipe}
                onTouchStart={startSwipe}
                onTouchEnd={endSwipe}
                onTouchCancel={endSwipe}
                onTouchMove={swipe}
            >
                {props.arrows && showPreviousArrow(props, index, moveSlides)}
                <div
                    className={`react-slideshow-wrapper slide ${props.cssClass || ''}`}
                    ref={wrapperRef}
                >
                    <div className="images-wrap" style={style} ref={innerWrapperRef}>
                        {props.infinite && renderPreceedingSlides()}
                        {(React.Children.map(props.children, (thisArg) => thisArg) || []).map(
                            (each, key) => {
                                const isThisSlideActive = isSlideActive(key);
                                return (
                                    <div
                                        data-index={key}
                                        key={key}
                                        className={isThisSlideActive ? 'active' : ''}
                                        aria-roledescription="slide"
                                        aria-hidden={isThisSlideActive ? 'false' : 'true'}
                                    >
                                        {each}
                                    </div>
                                );
                            }
                        )}
                        {renderTrailingSlides()}
                    </div>
                </div>
                {props.arrows && showNextArrow(props, index, moveSlides)}
            </div>
            {props.indicators && showIndicators(props, index, goToSlide)}
        </div>
    );
});

Slide.defaultProps = defaultProps;
