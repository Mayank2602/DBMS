import React, { Component } from 'react';
import ErrorBoundary from './ErrorBoundary';
import EditableProductList from './EditableProductList';
import ToggleableAddForm from './ToggleableAddForm';

export default class CatFilter extends Component {
    // filter based on color, brand
    render() {
        return (
            <ErrorBoundary>
                <EditableProductList shoes={this.props.shoes} addToOrder={this.props.addToOrder} addShoe={this.props.addShoe} updateShoe={this.props.updateShoe} deleteShoe={this.props.deleteShoe} />
                <ToggleableAddForm shoes={this.props.shoes} addShoe={this.props.addShoe} />
            </ErrorBoundary>
        );
    }
};