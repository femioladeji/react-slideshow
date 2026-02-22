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
    getStartingIndex,
    showIndicators,
    showNextArrow,
    showPreviousArrow,
} from './helpers';
import { ButtonClick, SlideshowRef, ZoomProps } from './types';

export const FadeZoom = React.forwardRef<SlideshowRef, ZoomProps>((props, ref) => {
    const {
        transitionDuration = 1000,
        defaultIndex = 0,
        autoplay = true,
        indicators = false,
        arrows = true,
        pauseOnHover = true,
        easing = 'linear',
        cssClass = '',
        ...others
    } = props;
    const [index, setIndex] = useState<number>(getStartingIndex(others.children, defaultIndex));
    const wrapperRef = useRef<HTMLDivElement>(null);
    const innerWrapperRef = useRef<any>(null);
    const tweenGroup = useRef(new Group());
    const timeout = useRef<NodeJS.Timeout>();
    const resizeObserver = useRef<any>();
    const childrenCount = useMemo(() => React.Children.count(others.children), [others.children]);

    const applyStyle = useCallback(() => {
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
    }, [wrapperRef, innerWrapperRef, childrenCount]);

    const initResizeObserver = useCallback(() => {
        if (wrapperRef.current) {
            resizeObserver.current = new ResizeObserver((entries) => {
                if (!entries) return;
                applyStyle();
            });
            resizeObserver.current.observe(wrapperRef.current);
        }
    }, [wrapperRef, applyStyle]);

    const play = useCallback(() => {
        const { autoplay, children, duration, infinite } = props;
        if (
            autoplay &&
            React.Children.count(children) > 1 &&
            (infinite || index < React.Children.count(children) - 1)
        ) {
            timeout.current = setTimeout(moveNext, duration);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props, index]);

    useEffect(() => {
        initResizeObserver();
        return () => {
            tweenGroup.current.removeAll();
            clearTimeout(timeout.current);
            removeResizeObserver();
        };
    }, [initResizeObserver, tweenGroup]);

    useEffect(() => {
        clearTimeout(timeout.current);
        play();
    }, [index, autoplay, play]);

    useEffect(() => {
        applyStyle();
    }, [childrenCount, applyStyle]);

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
        if (resizeObserver.current && wrapperRef.current) {
            resizeObserver.current.unobserve(wrapperRef.current);
        }
    };

    const pauseSlides = () => {
        if (pauseOnHover) {
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

    const animate = () => {
        requestAnimationFrame(animate);
        tweenGroup.current.update();
    };

    const transitionSlide = (newIndex: number) => {
        const existingTweens = tweenGroup.current.getAll();
        if (!existingTweens.length) {
            if (!innerWrapperRef.current?.children[newIndex]) {
                newIndex = 0;
            }
            clearTimeout(timeout.current);
            const value = { opacity: 0, scale: 1 };

            animate();

            const tween = new Tween(value, tweenGroup.current)
                .to({ opacity: 1, scale: others.scale }, transitionDuration)
                .onUpdate((value) => {
                    if (!innerWrapperRef.current) {
                        return;
                    }
                    innerWrapperRef.current.children[newIndex].style.opacity = value.opacity;
                    innerWrapperRef.current.children[index].style.opacity = 1 - value.opacity;
                    innerWrapperRef.current.children[
                        index
                    ].style.transform = `scale(${value.scale})`;
                });
            tween.easing(getEasing(easing));
            tween.onStart(() => {
                if (typeof others.onStartChange === 'function') {
                    others.onStartChange(index, newIndex);
                }
            });
            tween.onComplete(() => {
                if (innerWrapperRef.current) {
                    setIndex(newIndex);
                    innerWrapperRef.current.children[index].style.transform = `scale(1)`;
                }
                if (typeof others.onChange === 'function') {
                    others.onChange(index, newIndex);
                }
            });
            tween.start();
        }
    };

    const moveTo = (gotoIndex: number) => {
        if (gotoIndex !== index) {
            transitionSlide(gotoIndex);
        }
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
                className={`react-slideshow-container ${cssClass || ''}`}
                onMouseEnter={pauseSlides}
                onMouseOver={pauseSlides}
                onMouseLeave={startSlides}
            >
                {arrows && showPreviousArrow(props, index, preTransition)}
                <div className={`react-slideshow-fadezoom-wrapper ${cssClass}`} ref={wrapperRef}>
                    <div className="react-slideshow-fadezoom-images-wrap" ref={innerWrapperRef}>
                        {(React.Children.map(others.children, (thisArg) => thisArg) || []).map(
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
                {arrows && showNextArrow(props, index, preTransition)}
            </div>
            {indicators && showIndicators(props, index, navigate)}
        </div>
    );
});
