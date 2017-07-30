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
            console.log(index)
            const allImages = document.querySelectorAll('.slideshow-wrapper div');
            allImages[index%images.length].style.marginLeft = "-100%";
            index++;
        }, 5000)
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
Slideshow.PropTypes = {
    images: PropTypes.array.isRequired
}
export default Slideshow;