import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

function Slider() {
    return (
        <Carousel>
            <Carousel.Item interval={1500}>
                <img
                    className="d-block w-100 slide"
                    src="slide-1.png"
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={1500}>
                <img
                    className="d-block w-100 slide"
                    src="slide-2.png"
                    alt="Second slide"
                />
            </Carousel.Item>
        </Carousel>
    );
}

export default Slider;