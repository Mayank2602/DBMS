import React from 'react';

class AddShoeForm extends React.Component {
    state = {
        isOpen: false,
    }
    handleFormOpen = () => {
        this.setState({ isOpen: true });
    };

    constructor(props) {
        super(props);
        this.nameRef = React.createRef();
        this.imageRef = React.createRef();
        this.brandRef = React.createRef();
        this.priceRef = React.createRef();
        this.statusRef = React.createRef();
    }

    createShoe = (e) => {
        // stop form from submitting
        e.preventDefault();
        const shoe = {
            name: this.nameRef.current.value,
            image: this.imageRef.current.value,
            brand: this.brandRef.current.value,
            price: parseFloat(this.priceRef.current.value),
            status: this.statusRef.current.value,
        };
        this.props.addShoe(shoe);
        e.currentTarget.reset();
        this.setState({ isOpen: false });
    };
    render() {
        if (this.state.isOpen) {
            return (
                <div className='AddShoeForm'>
                    <form className='shoe-edit' onSubmit={this.createShoe}>
                        <input name='name' ref={this.nameRef} type='text' placeholder='Name' />
                        <input name='image' ref={this.imageRef} type='text' placeholder='Image' />
                        <input name='brand' ref={this.brandRef} type='text' placeholder='Brand'></input>
                        <input name='price' ref={this.priceRef} type='text' placeholder='Price' />
                        <select name='status' ref={this.statusRef}>
                            <option value='available'>Fresh!</option>
                            <option value='unavailable'>Sold Out!</option>
                        </select>
                        <button type='submit'>Add Shoe</button>
                    </form>
                </div>
            );
        } else {
            return (
                <button className='add-btn' onClick={this.handleFormOpen}>
                    ➕
                </button>
            );
        }
    }
}

export default AddShoeForm;