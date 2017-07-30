import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.css';

class Slideshow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { images } = this.props
        let index = 0;
        setInterval(() => {
            const slideShow = document.querySelector('.slideshow-wrapper');            
            const allImages = document.querySelectorAll('.slideshow-wrapper div');
            allImages[0].style.marginLeft = "-100%";
            setTimeout(() =>{
                allImages[0].style.marginLeft = "0%";                
                slideShow.appendChild(allImages[0]);
            }, 1000)
            // index++;
        }, this.props.duration)
        return (
            <div className="slideshow-wrapper">
                {
                    images.map((each, key) => (
                        <div data-index={key} key={key}><img src={each} /></div>
                        )
                    )
                }
            </div>
        );
    }
}

Slideshow.defaultProps = {
    duration: 5000,
    transitionDuration: 1000
}

Slideshow.PropTypes = {
    images: PropTypes.array.isRequired,
    duration: PropTypes.number,
    transitionDuration: PropTypes.transitionDuration
}
export default Slideshow;