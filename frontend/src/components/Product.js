import React from 'react';

export default class Product extends React.Component {
    render() {
        const { name, image, brand, price, status } = this.props.details;
        const isAvailable = status === 'available';
        return (
            <li className='menu-shoe'>
                <img src={image} alt={name} />
                <h3 className='shoe-name'>{name}
                    <span className='price'>&#8377; {price}
                    </span>
                </h3>
                <p>{brand}</p>
                <div>
                    <button className='cart-btn' disabled={!isAvailable} onClick={() => this.props.addToOrder(this.props.index)}>{isAvailable ? 'Add to Cart' : 'Sold Out'}</button>
                    <button className='edit-delete e-btn' onClick={this.props.handleFormOpen}> <img src='/edit_FILL0_wght400_GRAD0_opsz48.svg'></img></button>
                    <button className='edit-delete d-btn' onClick={() => this.props.deleteShoe(this.props.index)}><img src='/delete_FILL0_wght400_GRAD0_opsz48.svg'></img></button>
                </div>
            </li >
        );
    }
};
