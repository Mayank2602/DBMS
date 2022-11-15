import React from 'react';
import Navbar from '../components/Navbar';
import Order from '../components/Order';
import CatFilter from '../components/CatFilter';
import shoes from '../sample-shoes';
import axios from 'axios';
class Shop extends React.Component {
    state = {
        shoes,
        order: {},
        temp:[],
        isMinimized: false,
        // filteredShoes: {},
    };

    constructor(props) {
        super(props);
        this.selectedBrandRef = React.createRef();
        this.selectedColorRef = React.createRef();
    }

    createFilter = (e) => {
        e.preventDefault();
        const brand = this.selectedBrandRef.current.value;
        const color = this.selectedColorRef.current.value;
        // this.filterShoes(brand, color);
        e.currentTarget.reset();
    }

    handleMinimizeToggle = () => {
        this.setState(prevState => ({
            isMinimized: !prevState.isMinimized,
        }));
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
    addToOrder = (key) => {
        const order = { ...this.state.order };
        order[key] = order[key] + 1 || 1;
        this.setState({ order: order });
    }
    removeFromOrder = (key) => {
        const order = { ...this.state.order };
        delete order[key];
        this.setState({ order: order });
    }
    
async handleFile(e){
            const res=await axios.get('http://localhost:4000/api/v1/products');      
            const arr=res.data.products;
            console.log(arr);
            arr.map((p)=>{

                    const shoe =  {
                        name: p.name,
                    image: p.images[0].url,
                    brand: p.category,
                    price: p.price,
                    status: "available",
                    color: p.color} 
        
                    const shoes = { ...this.state.shoes };
                shoes[`shoe${Date.now()}`] = shoe;
                this.setState({ shoes: shoes }); 
            });
           
                console.log(shoes);
    }
    async pushFile(e){
        const res= await axios.post("http://localhost:4000/api/v1/admin/product/new",{
            "name" : "Product name",
            "price" : 100,
            "description" : "Product is good",
            "category" : "Laptop",
            "image" : {
                "public_id" : "sample",
                "url" : "sample" 
            }
        
        });
        console.log(res);
    }
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <button onClick={(e)=>this.handleFile(e)}>Help</button>
                <button onClick={(e)=>this.pushFile(e)}>New</button>
                
                <h1 className='header'>SHOP</h1>
                <form className='category-filter' onSubmit={this.createFilter}>
                    <select name='selectedColor' ref={this.selectedColorRef}>
                        <option value='pink'>Pink</option>
                         <option value='blue'>Blue</option>
                        <option value='black'>Black</option>
                        <option value='yellow'>Yellow</option>
                        <option value='white'>White</option>
                    </select>
                    <select name='selectedBrand' ref={this.selectedBrandRef}>
                        <option value='adidas'>Adidas</option>
                        <option value='puma'>Puma</option>
                        <option value='h&m'>H&M</option>
                        <option value='nike'>Nike</option>
                    </select>
                    <button type='submit'>Apply Filters</button>
                </form>
                <div className='view'>
                    <div className="shop">
                        <CatFilter shoes={this.state.shoes} order={this.state.order} addToOrder={this.addToOrder} addShoe={this.addShoe} updateShoe={this.updateShoe} deleteShoe={this.deleteShoe} />
                    </div>
                    <div className="cart">
                        <button className='toggle-btn' onClick={this.handleMinimizeToggle}>{!this.state.isMinimized ? 'Show Cart' : 'X'}</button>
                        <Order shoes={this.state.shoes} order={this.state.order} removeFromOrder={this.removeFromOrder} addToOrder={this.addToOrder} isMinimized={this.state.isMinimized} handleMinimizeToggle={this.handleMinimizeToggle} />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Shop;