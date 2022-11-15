import React from 'react';

class Order extends React.Component {
    renderOrder = key => {
        const shoe = this.props.shoes[key];
        const count = this.props.order[key];
        const isAvailable = shoe && shoe.status === 'available';
        if (!shoe) {
            return null;
        }
        if (!isAvailable) {
            return (
                <li key={key}>Sorry! {shoe ? shoe.name : 'shoe'} is no longer available.</li>
            )
        }
        return (
            <li className='order' key={key}>
                <span className='count'> {count} </span> {shoe.name}
                <span className='sum-total'> &#8377; {count * shoe.price} </span>
                <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
            </li>
        );
    }
    render() {
        const orderIDs = Object.keys(this.props.order);
        const total = orderIDs.reduce((prevTotal, key) => {
            const shoe = this.props.shoes[key];
            const count = this.props.order[key];
            const isAvailable = shoe && shoe.status === 'available';
            if (isAvailable) {
                return prevTotal + (count * shoe.price);
            }
            return prevTotal;
        }, 0);
        if (this.props.isMinimized) {
            return (
                <div className='order-wrap'>
                    <h1>ORDER</h1>
                    {orderIDs.map(this.renderOrder)}
                    <div className='total'>
                        Total:
                        <strong>&#8377; {total}</strong>
                    </div>
                </div>
            );
        } else {
            return (null);
        }
    }
}

export default Order;