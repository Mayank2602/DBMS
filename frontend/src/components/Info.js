import React from 'react';
import { Link } from 'react-router-dom';

const Info = props => {
    return (
        <React.Fragment>
            <div className='info'>
                <h1>Give Your Workout <br /><span> A New Style </span></h1>
                <p>Success isn't always about greatness. It's about consistency.
                    Consistent work gains success. <br />Greatness will come
                </p >
                <Link to="/shop" className="home-btn">Explore Now &#8594;</Link>
            </div >
        </React.Fragment >
    );
}

export default Info;