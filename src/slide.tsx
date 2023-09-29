import React, {
    useState,
    useRef,
    useEffect,
    useMemo,
    useImperativeHandle,
    useCallback,
} from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { Group, Tween } from '@tweenjs/tween.js';
import {
    getEasing,
    getResponsiveSettings,
    getStartingIndex,
    showIndicators,
    showNextArrow,
    showPreviousArrow,
} from './helpers';
import { ButtonClick, SlideshowRef, SlideProps } from './types';
import { defaultProps } from './props';

export const Slide = React.forwardRef<SlideshowRef, SlideProps>((props, ref) => {
    const [index, setIndex] = useState(getStartingIndex(props.children, props.defaultIndex));
    const [wrapperSize, setWrapperSize] = useState<number>(0);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const innerWrapperRef = useRef<any>(null);
    const tweenGroup = useRef(new Group());
    const responsiveSettings = useMemo(
        () => getResponsiveSettings(wrapperSize, props.responsive),
        [wrapperSize, props.responsive]
    );
    const slidesToScroll = useMemo(() => {
        if (responsiveSettings) {
            return responsiveSettings.settings.slidesToScroll;
        }
        return props.slidesToScroll || 1;
    }, [responsiveSettings, props.slidesToScroll]);
    const slidesToShow = useMemo(() => {
        if (responsiveSettings) {
            return responsiveSettings.settings.slidesToShow;
        }
        return props.slidesToShow || 1;
    }, [responsiveSettings, props.slidesToShow]);
    const childrenCount = useMemo(() => React.Children.count(props.children), [props.children]);
    const eachChildSize = useMemo(() => wrapperSize / slidesToShow, [wrapperSize, slidesToShow]);
    const timeout = useRef<NodeJS.Timeout>();
    const resizeObserver = useRef<any>();
    let startingSwipePosition: number;
    let dragging: boolean = false;
    let distanceSwiped: number = 0;
    const translateType = props.vertical ? 'translateY' : 'translateX';
    const swipeAttributeType = props.vertical ? 'clientY' : 'clientX';
    const swipePageAttributeType = props.vertical ? 'pageY' : 'pageX';
    
    const applyStyle = useCallback(() => {
        if (innerWrapperRef.current) {
            const fullSize = wrapperSize * innerWrapperRef.current.children.length;
            const attribute = props.vertical ? 'height' : 'width';
            innerWrapperRef.current.style[attribute] = `${fullSize}px`;
            if (props.vertical && wrapperRef.current) {
                wrapperRef.current.style[attribute] = `${wrapperSize}px`;
            }
            for (let index = 0; index < innerWrapperRef.current.children.length; index++) {
                const eachDiv = innerWrapperRef.current.children[index];
                if (eachDiv) {
                    if (!props.vertical) {
                        eachDiv.style[attribute] = `${eachChildSize}px`;
                    }
                    eachDiv.style.display = `block`;
                }
            }
        }
    }, [wrapperSize, eachChildSize]);

    const initResizeObserver = useCallback(() => {
        if (wrapperRef.current) {
            resizeObserver.current = new ResizeObserver((entries) => {
                if (!entries) return;
                setSize();
            });
            resizeObserver.current.observe(wrapperRef.current);
        }
    }, [wrapperRef]);

    const play = useCallback(() => {
        const { autoplay, infinite, duration } = props;
        if (autoplay && (infinite || index < childrenCount - 1)) {
            timeout.current = setTimeout(moveNext, duration);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props, childrenCount, index]);

    useEffect(() => {
        applyStyle();
    }, [wrapperSize, applyStyle]);

    useEffect(() => {
        initResizeObserver();
        return () => {
            tweenGroup.current.removeAll();
            clearTimeout(timeout.current);
            removeResizeObserver();
        };
    }, [wrapperRef, initResizeObserver, tweenGroup]);

    useEffect(() => {
        clearTimeout(timeout.current);
        play();
    }, [index, wrapperSize, props.autoplay, play]);

    useImperativeHandle(ref, () => ({
        goNext: () => {
            moveNext();
        },
        goBack: () => {
            moveBack();
        },
        goTo: (index: number, options?: { skipTransition?: boolean }) => {
            if (options?.skipTransition) {
                setIndex(index);
            } else {
                moveTo(index);
            }
        },
    }));

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
        if (props.canSwipe && dragging) {
            let position;
            if (window.TouchEvent && event.nativeEvent instanceof TouchEvent) {
                position = event.nativeEvent.touches[0][swipePageAttributeType];
            } else if (event.nativeEvent instanceof MouseEvent) {
                position = event.nativeEvent[swipeAttributeType];
            }
            if (position && startingSwipePosition) {
                let translateValue = eachChildSize * (index + getOffset());
                const distance = position - startingSwipePosition;
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
                innerWrapperRef.current.style.transform = `${translateType}(-${translateValue}px)`;
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

    const setSize = () => {
        const attribute = props.vertical ? 'clientHeight' : 'clientWidth';
        if (props.vertical) {
            if (innerWrapperRef.current) {
                setWrapperSize(innerWrapperRef.current.children[0][attribute]);
            }
        } else {
            if (wrapperRef.current) {
                setWrapperSize(wrapperRef.current[attribute]);
            }
        }
    };

    const startSwipe = (event: React.MouseEvent | React.TouchEvent) => {
        if (props.canSwipe) {
            if (window.TouchEvent && event.nativeEvent instanceof TouchEvent) {
                startingSwipePosition = event.nativeEvent.touches[0][swipePageAttributeType];
            } else if (event.nativeEvent instanceof MouseEvent) {
                startingSwipePosition = event.nativeEvent[swipeAttributeType];
            }
            clearTimeout(timeout.current);
            dragging = true;
        }
    };

    const endSwipe = () => {
        if (props.canSwipe) {
            dragging = false;
            if (Math.abs(distanceSwiped) / wrapperSize > 0.2) {
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

    const animate = () => {
        requestAnimationFrame(animate);
        tweenGroup.current.update();
    };

    const transitionSlide = (toIndex: number, animationDuration?: number) => {
        const transitionDuration = animationDuration || props.transitionDuration;
        const currentIndex = index;
        const existingTweens = tweenGroup.current.getAll();
        if (!wrapperRef.current) {
            return;
        }
        const attribute = props.vertical ? 'clientHeight' : 'clientWidth'
        const childSize = wrapperRef.current[attribute] / slidesToShow;
        if (!existingTweens.length) {
            clearTimeout(timeout.current);
            const value = {
                margin: -childSize * (currentIndex + getOffset()) + distanceSwiped,
            };
            const tween = new Tween(value, tweenGroup.current)
                .to({ margin: -childSize * (toIndex + getOffset()) }, transitionDuration)
                .onUpdate((value) => {
                    if (innerWrapperRef.current) {
                        innerWrapperRef.current.style.transform = `${translateType}(${value.margin}px)`;
                    }
                });
            tween.easing(getEasing(props.easing));

            animate();

            let newIndex = toIndex;
            if (newIndex < 0) {
                newIndex = childrenCount - slidesToScroll;
            } else if (newIndex >= childrenCount) {
                newIndex = 0;
            }

            tween.onStart(() => {
                if (typeof props.onStartChange === 'function') {
                    props.onStartChange(index, newIndex);
                }
            });

            tween.onComplete(() => {
                distanceSwiped = 0;
                if (typeof props.onChange === 'function') {
                    props.onChange(index, newIndex);
                }
                setIndex(newIndex);
            });

            tween.start();
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
        transform: `${translateType}(-${(index + getOffset()) * eachChildSize}px)`,
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
                    <div className={`images-wrap ${props.vertical ? 'vertical' : 'horizontal'}`} style={style} ref={innerWrapperRef}>
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
            {props.indicators && showIndicators(props, index, goToSlide, responsiveSettings)}
        </div>
    );
});

Slide.defaultProps = defaultProps;
