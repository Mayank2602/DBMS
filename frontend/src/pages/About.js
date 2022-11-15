import React, { Component } from 'react';
import Navbar from '../components/Navbar';

export default class About extends Component {
    render() {
        return (
            <>
                <Navbar />
                <div className='row'>
                    <div className='col-2'>
                        <h1>SoleFul<br /></h1>
                        <h2><i>Your sole searching ends here!</i></h2><br />
                        <p>Bringing together india's leading footwear brands under one roof to provide a unique shopping experience for all the sneakerheads out there.
                            <br /><br />While there has been many ecommerce websites focused on a wide area of products, a website like soleful where we focus sole-ly on footwear has been long due.
                            <br /><br /> We are here to fulfill that void and we bring with us the promise of finding your perfect sole-mate!
                        </p>
                        <p><b><br /> So from one sneakerhead to another- <i><span><br />Welcome to the family!</span></i></b>
                        </p>

                    </div>
                </div>

                <div className='row'>
                    <div className='col-2'>
                        <h1>Our Values<br /></h1>
                        <h3><i>Count On Us</i></h3><br />
                        <p>We understand that it is difficult to find a perfect pair of footwear on the first try. Which is why, we have a 30 days no-questions-asked return policy.
                            <br /><br />
                        </p>
                        <h3><i>Help Us Improve</i></h3><br />
                        <p>We are here to help you find your perfect sole-mate, help us out by letting us know if there are any discrepencies in shoe size, product descriptions and what you receive etc.
                            If you see something, say something and we promise to try our best to ensure that any and all issues are resolved at the earliest.
                            <br /><br />
                        </p>
                        <h3><i>Exceed Customer Expectations</i></h3><br />
                        <p>We strive to serve you better and are willing to go above and beyond to exceed customer expectations.
                            <br /><br />
                        </p>

                    </div>
                </div>
            </>
        );
    }
};