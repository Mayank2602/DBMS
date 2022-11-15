import React, { Component } from 'react';
import EditableProduct from './EditableProduct';

export default class EditableProductList extends Component {
    render() {
        return (
            <>
                <ul className="shoes">
                    {Object.keys(this.props.shoes).map(key => <EditableProduct key={key} index={key} details={this.props.shoes[key]} shoes={this.props.shoes} addToOrder={this.props.addToOrder} addShoe={this.props.addShoe} updateShoe={this.props.updateShoe} deleteShoe={this.props.deleteShoe} />)}
                </ul>
            </>
        );
    };
};