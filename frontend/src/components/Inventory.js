import React from 'react';
import ToggleableAddForm from './ToggleableAddForm';
import EditShoeForm from './EditShoeForm';
import shoes from '../sample-shoes';

export default class Inventory extends React.Component {
    state = {
        shoes,
        uid: null,
        owner: null
    }

    addShoe = shoe => {
        const shoes = { ...this.state.shoes };
        shoes[`shoe${Date.now()}`] = shoe;
        this.setState({ shoes: shoes });
    };

    updateShoe = (key, updatedShoe) => {
        const shoes = { ...this.state.shoes };
        shoes[key] = updatedShoe;
        this.setState({ shoes: shoes });
    };

    deleteShoe = (key) => {
        const shoes = { ...this.state.shoes };
        delete shoes[key];
        this.setState({ shoes: shoes });
    };

    render() {
        return (
            <React.Fragment>
                <div className='Inventory'>
                    <h1 className='header'>INVENTORY</h1>
                    {Object.keys(this.state.shoes).map(key => <EditShoeForm key={key} index={key} shoe={this.state.shoes[key]} shoes={this.state.shoes} updateShoe={this.updateShoe} deleteShoe={this.deleteShoe} />)}
                    <ToggleableAddForm addShoe={this.addshoe} />
                </div>
            </React.Fragment>
        );
    }
}