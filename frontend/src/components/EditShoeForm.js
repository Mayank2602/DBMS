import React from 'react';

class EditShoeForm extends React.Component {
    handleChange = (event) => {
        const updatedShoe = {
            ...this.props.shoe,
            [event.currentTarget.name]: event.currentTarget.value
        };
        this.props.updateShoe(this.props.index, updatedShoe);
    }
    render() {
        return (
            <div className='shoe-edit'>
                <input type="text" name="name" onChange={this.handleChange} value={this.props.shoes[this.props.index].name} />
                <input type="text" name="price" onChange={this.handleChange} value={this.props.shoes[this.props.index].price} />
                <input type="text" name="brand" onChange={this.handleChange} value={this.props.shoes[this.props.index].brand} />
                <select type="text" name="status" onChange={this.handleChange} value={this.props.shoes[this.props.index].status}>
                    <option value='available'>Fresh!</option>
                    <option value='unavailable'>Sold Out!</option>
                </select>
                <input type="text" name="image" onChange={this.handleChange} value={this.props.shoes[this.props.index].image} />
                <div className='btns'>
                    <button onClick={this.props.handleFormClose}>Close form</button>
                    <button onClick={() => this.props.deleteShoe(this.props.index)}>Remove Shoe</button>
                </div>
            </div>
        );
    }
}

export default EditShoeForm;