import React from 'react';
import EditShoeForm from './EditShoeForm';
import Product from './Product';

export default class EditableProduct extends React.Component {
    state = {
        editFormOpen: false,
    }
    handleFormOpen = () => {
        this.setState({ editFormOpen: true });
    }
    handleFormClose = () => {
        this.setState({ editFormOpen: false });
    }
    render() {
        if (this.state.editFormOpen) {
            return (<EditShoeForm key={this.props.index} index={this.props.index} shoes={this.props.shoes} shoe={this.props.shoes[this.props.index]} updateShoe={this.props.updateShoe} deleteShoe={this.props.deleteShoe} editFormOpen={this.state.editFormOpen} handleFormClose={this.handleFormClose} />);
        } else {
            return (
                <Product key={this.props.index} index={this.props.index} shoes={this.props.shoes} addToOrder={this.props.addToOrder} addShoe={this.props.addShoe} updateShoe={this.props.updateShoe} deleteShoe={this.props.deleteShoe} details={this.props.details} editFormOpen={this.state.editFormOpen} handleFormOpen={this.handleFormOpen} />
            );
        }
    }
};