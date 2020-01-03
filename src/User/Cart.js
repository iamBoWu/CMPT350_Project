
import React from 'react';
import Slider from "react-slick";
import store from 'storejs'
import {Link} from "react-router-dom"
class Cart extends React.Component {
    constructor(){
        super()
        this.state ={}
        this.onclick = this.handleDelete.bind(this)
    }

    handleChange = (e) => {
        alert(e.target.name)
        let temp = JSON.parse(store.get(e.target.name))
        console.log("temp"+typeof temp)
        temp.count = e.target.value
        store(e.target.name, JSON.stringify(temp))


        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleDelete  (e) {
        // alert(e)
        store.remove(e)
    }

    render(){
        return (
            <div className="Cart">
                {
                    this.props.items.map(item => {
                        // var settings = {
                        //   dots: true,s
                        //   infinite: true,
                        //   speed: 500,
                        //   slidesToShow: 1,
                        //   slidesToScroll: 1
                        // };
                        return (


                            <div className="Cartitem" key={item.ProductName}>
                                <h2>Product Name: {item.ProductName}</h2>
                                <br/>
                                <div >
                                    <div>Description: {item.description}</div>
                                    <div><button>-</button>
                                        <input type="text" name={item.ProductName} onChange={(e) => this.handleChange(e)}
                                            placeholder={item.count}/>
                                        <button>+</button>
                                        <h4>Price: {item.price}</h4>
                                        <button onClick={(e)=>this.onclick(item.ProductName)}>delete</button>
                                    </div>
                                </div>
                                <hr/>
                            </div>

                        )
                    })
                }
            </div>
        );}
};


export default Cart;